from schemas import AddTelegramAccount, ConfirmTelegramAccount, AuthTelegramAccount, MessageTelegram
from repository import TelegramAccountsRepository
from sqlalchemy.orm import Session
from fastapi import HTTPException
from pyrogram import Client
from pyrogram.errors import SessionPasswordNeeded

CONFIRM_WAITING_ACCOUNTS: list[dict[str, list[Client | str]]] = list()


class TelegramService:
    @staticmethod
    async def add_account(db: Session, data: AddTelegramAccount):
        # Проверка сущестования акаунта в бд
        verify = TelegramAccountsRepository.get_by_login(db, data.login)
        if verify:
            raise HTTPException(status_code=400, detail="This api_id already used")

        # Создание и подключение клиента телеграм
        try:
            new_account = Client(
                data.login, api_id=data.api_id, api_hash=data.api_hash, password=data.password
            )
            await new_account.connect()
        except Exception:
            raise HTTPException(status_code=400, detail="Account values not valid")

        # Отправка кода аутентификации в тг пользователя
        sent_code = await new_account.send_code(data.phone)
        CONFIRM_WAITING_ACCOUNTS.append({data.login: [new_account, sent_code.phone_code_hash]})

    @staticmethod
    async def confirm_account(db: Session, data: ConfirmTelegramAccount):
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

        # TelegramAccountsRepository.update_by_login(db, login=data.login, is_active=True, password=data.password)


    @staticmethod
    async def send_message(data: MessageTelegram):
        async with Client(data.login) as user:
            await user.send_message(chat_id=data.message_to_user, text=data.text)

    @staticmethod
    async def logout(db: Session, login: str):
        async with Client(login) as user:
            await user.log_out()
            TelegramAccountsRepository.delete_by_login(db, login)
