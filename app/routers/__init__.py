from .auth import auth_router
from .users import users_router
from .telegram import tg_router
from .telegram_actions import tg_actions_router


all_routers = [auth_router, users_router, tg_router, tg_actions_router]

