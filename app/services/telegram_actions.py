from pyrogram import Client
from sqlalchemy.orm import Session
from fastapi import HTTPException
from loguru import logger

from asyncio import sleep

from repository import TelegramAccountsRepository
from schemas import SubProcessFunctionSchema

default_modes = {
    "Сразу": 2,
    "В течении часа": 3600,
    "в течении дня": 86400
}


class TelegramActionsService:
    @staticmethod
    async def subscription(db: Session, data: SubProcessFunctionSchema):
        accounts = TelegramAccountsRepository.get_last_range(db, data.count)
        if len(accounts) < data.count:
            raise HTTPException(status_code=400, detail=f"Maximum users count equals {len(accounts)}")
        logger.info(f"Start subscription process on {data.tg_link} with {len(accounts)} accounts")
        for ac in accounts:
            await sleep(default_modes["Сразу"]/data.count)
            async with Client(ac.login) as user:
                await user.join_chat(data.tg_link.split("/")[-1])
        logger.info(f"Finish subscription process on {data.tg_link} with {len(accounts)} accounts")