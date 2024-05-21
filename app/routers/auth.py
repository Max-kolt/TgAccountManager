from typing import Annotated

from fastapi import APIRouter, Depends
from database import get_db
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from services import UserService
from repository import everyone_dep

auth_router = APIRouter(prefix='/auth', tags=['Auth'])


@auth_router.post('/login')
async def login(form: Annotated[OAuth2PasswordRequestForm, Depends()], db: Session = Depends(get_db)):
    token = UserService.login(db, form)
    return {"access_token": token, "token_type": "bearer"}


@auth_router.get('/check')
async def check_auth(current_user: everyone_dep):
    return {"ok": True}
