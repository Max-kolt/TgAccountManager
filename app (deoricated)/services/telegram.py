from passlib.context import CryptContext
from sqlite3 import OperationalError
from schemas import AddTelegramAccount, ConfirmTelegramAccount, AuthTelegramAccount, MessageTelegram
from repository import TelegramAccountsRepository
from sqlalchemy.orm import Session
from fastapi import HTTPException
from pyrogram import Client
from pyrogram.raw import functions, types
from pyrogram.raw.types import InputUserSelf, UserFull, User
from pyrogram.errors import SessionPasswordNeeded
from loguru import logger
import asyncio
import aiopg.sa
import sqlalchemy
from pyrogram_aiopg_storage import PostgreSQLStorage
from schemas.telegram import TelegramAccountSchema
from config import SESSIONS_DIR
from utils import pyrogram_client
from database import get_session_engine
from aiopg.sa import Engine

CONFIRM_WAITING_ACCOUNTS: list[dict[str, list[Client | str]]] = list()

bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated="auto")


class TelegramService:
    @staticmethod
    async def add_account(db: Session, session_db: Engine, data: AddTelegramAccount):
        # Проверка сущестования акаунта в бд
        verify = TelegramAccountsRepository.get_by_login(db, data.login)
        if verify:
            raise HTTPException(status_code=400, detail="This api_id already used")

        # Создание и подключение клиента телеграм
        try:
            new_account = Client(
                api_id=data.api_id, api_hash=data.api_hash, password=data.password, workdir=SESSIONS_DIR,
                session_name=PostgreSQLStorage(db_pool=session_db, user_id=data.user_id, phone=data.phone)
            )
            await new_account.connect()
        except Exception as e:
            logger.exception(e)
            raise HTTPException(status_code=400, detail="Account values not valid")

        # Отправка кода аутентификации в тг пользователя
        sent_code = await new_account.send_code(data.phone)
        CONFIRM_WAITING_ACCOUNTS.append({data.login: [new_account, sent_code.phone_code_hash]})

    @staticmethod
    async def confirm_account(db: Session, data: ConfirmTelegramAccount):
        global CONFIRM_WAITING_ACCOUNTS

        try:
            account_data = \
                list(filter(lambda a: list(a.keys())[0] == data.login, CONFIRM_WAITING_ACCOUNTS))
        except Exception as e:

            raise HTTPException(status_code=404, detail='Not added account')

        account: Client = account_data[-1][data.login][0]
        phone_hash: str = account_data[-1][data.login][1]

        try:
            await account.sign_in(data.phone, phone_hash, data.confirmation_code)
        except Exception as ex:
            if data.password:
                try:
                    await account.check_password(data.password)
                except Exception:
                    raise HTTPException(status_code=400, detail="Invalid password")
            else:
                raise HTTPException(status_code=400, detail="Password Needed")

        try:
            await account.stop()
        except Exception:
            pass
        # Сохранение акаунта в бд
        TelegramAccountsRepository.create(db, login=data.login, phone=data.phone, api_id=data.api_id,
                                          api_hash=data.api_hash, password=data.password, is_active=True)

        CONFIRM_WAITING_ACCOUNTS = list(filter(lambda a: list(a.keys())[0] != data.login, CONFIRM_WAITING_ACCOUNTS))

    @staticmethod
    @pyrogram_client
    async def get_account_info(db: Session, login: str, tg_client: Client) -> TelegramAccountSchema:
        db_info = TelegramAccountsRepository.get_by_login(db, login)
        tg_info = await tg_client.get_me()
        tg_raw_info: UserFull = (await tg_client.invoke(functions.users.GetFullUser(id=InputUserSelf()))).full_user

        return TelegramAccountSchema(
            login=login,
            phone=tg_info.phone_number,
            fname=tg_info.first_name,
            lname=tg_info.last_name,
            description=tg_raw_info.about,
            gender=db_info.gender,
        )

    @staticmethod
    async def send_message(data: MessageTelegram):
        async with Client(data.login) as user:
            await user.send_message(chat_id=data.message_to_user, text=data.text)

    @staticmethod
    async def logout(db: Session, login: str):
        async with Client(login) as user:
            await user.log_out()
            TelegramAccountsRepository.delete_by_login(db, login)

