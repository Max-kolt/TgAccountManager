from fastapi import APIRouter


tg_actions_router = APIRouter(prefix='/tg_actions', tags=['Telegram actions'])


@tg_actions_router.post('/sub_process')
async def sub_process():
    pass


