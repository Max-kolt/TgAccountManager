from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from schemas.telegram import SubProcessFunctionSchema
from services.telegram_actions import TelegramActionsService

tg_actions_router = APIRouter(prefix='/tg_actions', tags=['Telegram actions'])


@tg_actions_router.post('/sub_process')
async def sub_process(data: SubProcessFunctionSchema, db: Session = Depends(get_db)):
    await TelegramActionsService.subscription(db, data)
    return {"ok": True}

