import copy

from database import get_session_engine

from pyrogram import Client
from functools import wraps
from config import SESSIONS_DIR
from fastapi import HTTPException
from pyrogram_aiopg_storage import PostgreSQLStorage
from schemas import TelegramSessionSchema


def pyrogram_client(func):
    @wraps(func)
    async def wrapper(tg_user: TelegramSessionSchema, *args, **kwargs):
        new_db_con = copy.deepcopy(get_session_engine)
        try:
            tg_client = await Client(
                tg_user.login, workdir=SESSIONS_DIR,
                session_string=PostgreSQLStorage(db_pool=(await new_db_con), user_id=tg_user.user_id, phone=tg_user.phone)
            ).start()
        except Exception as e:
            print(e)
            raise HTTPException(status_code=500)
        result = await func(tg_session=tg_client, *args, **kwargs)
        await tg_client.terminate()
        return result

    return wrapper

