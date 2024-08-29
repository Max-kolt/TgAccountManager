from .auth import auth_router
from fastapi import APIRouter
from .users import users_router
from .telegram import tg_router
from .telegram_actions import tg_actions_router

v1_router = APIRouter(prefix="/v1")

v1_router.include_router(auth_router)
v1_router.include_router(users_router)
v1_router.include_router(tg_router)
v1_router.include_router(tg_actions_router)

all_routers = [auth_router, users_router, tg_router, tg_actions_router]
