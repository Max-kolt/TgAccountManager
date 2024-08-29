from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from database import get_db, get_session_db
from sqlalchemy.orm import Session

from repository import TelegramAccountsRepository, everyone_dep
from schemas import AddTelegramAccount, ConfirmTelegramAccount, MessageTelegram
from services import TelegramService
from aiopg.sa import Engine


tg_router = APIRouter(prefix='/tg', tags=["Telegram"])


@tg_router.get("/get_all")
async def get_all(user_deps: everyone_dep, db: Session = Depends(get_db)):
    accounts = TelegramAccountsRepository.get_all(db)
    return accounts


@tg_router.get("/get_count")
async def get_count(user_deps: everyone_dep, db: Session = Depends(get_db)):
    accounts = TelegramAccountsRepository.get_all(db)
    return len(accounts)


@tg_router.get("/get_by_login/{login}")
async def get_by_login(user_deps: everyone_dep, login: str, db: Session = Depends(get_db)):
    account = await TelegramService.get_account_info(db, login)
    return account


@tg_router.post("/add_account")
async def add_account(
        user_deps: everyone_dep, request_body: AddTelegramAccount,
        session_db: Annotated[Engine, Depends(get_session_db)],
        db: Session = Depends(get_db)
):
    await TelegramService.add_account(db, session_db, request_body)
    return {"ok": True}


@tg_router.put("/confirm_account")
async def confirm_account(user_deps: everyone_dep, request_body: ConfirmTelegramAccount, db: Session = Depends(get_db)):
    await TelegramService.confirm_account(db, request_body)
    return {"ok": True}


@tg_router.put('/change_settings')
async def change_settings(user_deps: everyone_dep, request_body, db: Session = Depends(get_db)):
    pass


@tg_router.post("/send_message")
async def send_message(user_deps: everyone_dep, request_body: MessageTelegram):
    await TelegramService.send_message(request_body)
    return {"ok": True}


@tg_router.delete("/delete_account")
async def delete_account(user_deps: everyone_dep, login: str, db: Session = Depends(get_db)):
    await TelegramService.logout(db, login)
    return {"ok": True}


