from typing import Annotated

from fastapi import APIRouter, Depends
from database import get_db
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from services import UserService
from repository import everyone_dep, UserReposiroty

auth_router = APIRouter(prefix='/auth', tags=['Auth'])


@auth_router.post('/login')
async def login(form: Annotated[OAuth2PasswordRequestForm, Depends()], db: Session = Depends(get_db)):
    token = UserService.login(db, form)
    user = UserReposiroty.get_by_name(db, form.username)
    user = user.__dict__
    user.pop('password')
    return {"access_token": token, "token_type": "bearer", "user": user}


@auth_router.get('/check')
async def check_auth(current_user: everyone_dep):
    return {"ok": True}
