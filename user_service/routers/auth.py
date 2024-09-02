from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_async_session
from services import UserService, LoginSchema


auth_router = APIRouter(prefix='/auth', tags=['Auth'])


@auth_router.post('/login')
async def login(login_info: LoginSchema, db: AsyncSession = Depends(get_async_session)):
    token, user_info = await UserService.login(db, login_info)
    return {"access_token": token, "token_type": "bearer", "user": user_info}
