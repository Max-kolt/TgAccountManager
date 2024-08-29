from fastapi import APIRouter
from .user import users_router
from .auth import auth_router

v1_router = APIRouter(prefix='/v1')

v1_router.include_router(auth_router)
v1_router.include_router(users_router)


