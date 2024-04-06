from fastapi import APIRouter

tg_router = APIRouter(prefix='/tg', tags=["Telegram"])


@tg_router.post("/create_account")
async def create_account():
    return



