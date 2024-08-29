from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from repository import everyone_dep
from schemas import ActionStartSchema
from services.telegram_actions import TelegramActionsService

tg_actions_router = APIRouter(prefix='/tg_actions', tags=['Telegram actions'])


@tg_actions_router.post('/sub_process')
async def sub_process(user_deps: everyone_dep, data: ActionStartSchema, db: Session = Depends(get_db)):
    await TelegramActionsService.subscription(db, data)
    return {"ok": True}

