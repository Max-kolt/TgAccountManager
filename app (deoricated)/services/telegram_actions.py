from pyrogram import Client
from sqlalchemy.orm import Session
from fastapi import HTTPException
from loguru import logger
from asyncio import sleep

from repository import TelegramAccountsRepository
from schemas import ActionStartSchema
from services import TelegramService

default_modes = {
    "Сразу": 2,
    "В течении часа": 3600,
    "в течении дня": 86400
}


class TelegramActionsService:
    @staticmethod
    async def subscription(db: Session, data: ActionStartSchema):
        accounts = TelegramAccountsRepository.get_last_range(db, data.count)
        if len(accounts) < data.count:
            raise HTTPException(status_code=400, detail=f"Maximum users count equals {len(accounts)}")
        logger.info(f"Start subscription process on {data.tg_link} with {len(accounts)} accounts")
        for ac in accounts:
            await sleep(default_modes[data.mode]/data.count)
            user = await Client(ac.login).start()
            await user.join_chat(data.tg_link.split("/")[-1])
            await user.terminate()
        logger.info(f"Finish subscription process on {data.tg_link} with {len(accounts)} accounts")

