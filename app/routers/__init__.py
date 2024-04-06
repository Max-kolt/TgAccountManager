from .auth import auth_router
from .users import users_router
from .tg import tg_router


all_routers = [auth_router, users_router, tg_router]

