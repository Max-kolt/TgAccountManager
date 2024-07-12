from fastapi import APIRouter, Depends, HTTPException
from database import get_db
from sqlalchemy.orm import Session

from repository import TelegramAccountsRepository
from schemas import AddTelegramAccount, ConfirmTelegramAccount, MessageTelegram
from services import TelegramService

tg_router = APIRouter(prefix='/tg', tags=["Telegram"])


@tg_router.get("/get_all")
async def get_all(db: Session = Depends(get_db)):
    accounts = TelegramAccountsRepository.get_all(db)
    return accounts


@tg_router.get("/get_count")
async def get_count(db: Session = Depends(get_db)):
    accounts = TelegramAccountsRepository.get_all(db)
    return len(accounts)


@tg_router.get("/get_by_login/{login}")
async def get_count(login: str, db: Session = Depends(get_db)):
    account = TelegramAccountsRepository.get_by_login(db, login)
    return account


@tg_router.post("/add_account")
async def add_account(request_body: AddTelegramAccount, db: Session = Depends(get_db)):
    await TelegramService.add_account(db, request_body)
    return {"ok": True}


@tg_router.put("/confirm_account")
async def confirm_account(request_body: ConfirmTelegramAccount, db: Session = Depends(get_db)):
    await TelegramService.confirm_account(db, request_body)
    return {"ok": True}


@tg_router.put('/change_settings')
async def change_settings(request_body, db: Session = Depends(get_db)):
    pass


@tg_router.post("/send_message")
async def send_message(request_body: MessageTelegram):
    await TelegramService.send_message(request_body)
    return {"ok": True}


@tg_router.delete("/delete_account")
async def delete_account(login: str, db: Session = Depends(get_db)):
    await TelegramService.logout(db, login)
    return {"ok": True}


