from fastapi import APIRouter, Depends, HTTPException
from database import get_db
from sqlalchemy.orm import Session
from sqlalchemy.exc import NoResultFound, IntegrityError
from repository import UserReposiroty
from models import User
from schemas import UserSchema, UserSettingsSchema, ChangePasswordSchema, ChangePrivilegesSchema
from services import UserService
from loguru import logger
from repository import everyone_dep

users_router = APIRouter(prefix='/users', tags=['Users'])


@users_router.get('/get_all')
async def get_users(user_dep: everyone_dep, db: Session = Depends(get_db)):
    users: list[User] = UserReposiroty.get_all(db)
    for i in range(len(users)):
        users[i].__dict__.pop("password")
    return users


@users_router.get('/get_info/{user_name}')
async def get_user_info(user_deps: everyone_dep, user_name: str, db: Session = Depends(get_db)):
    try:
        user = UserReposiroty.get_by_name(db, user_name)
        user = user.__dict__
        user.pop('password')
    except NoResultFound:
        raise HTTPException(status_code=400, detail="no result found")
    except Exception as e:
        logger.exception(e)
        raise HTTPException(status_code=400, detail="unrecognized error")

    return user


@users_router.post('/create')
async def create_user(user_deps: everyone_dep, request_body: UserSchema, db: Session = Depends(get_db)):
    try:
        user = UserService.create_user(db, request_body)
    except IntegrityError:
        raise HTTPException(status_code=400, detail="role already exists")
    except Exception as e:
        logger.exception(e)
        raise HTTPException(status_code=400, detail="unrecognized error")

    return user


@users_router.delete("/delete/{user_name}")
async def delete_user(user_deps: everyone_dep, user_name: str, db: Session = Depends(get_db)):
    UserReposiroty.delete(db=db, model_name=user_name)
    return {"ok": True}


@users_router.put('/change_password/{user_name}')
async def change_password(user_deps: everyone_dep, user_name: str, request_body: ChangePasswordSchema, db: Session = Depends(get_db)):
    result = UserService.change_password(db, user_name, request_body)
    return {"ok": result}


@users_router.put('/change_privileges/{user_name}')
async def change_role(user_deps: everyone_dep, user_name: str, new_privileges: ChangePrivilegesSchema, db: Session = Depends(get_db)):
    UserReposiroty.update(db, model_name=user_name, **new_privileges.model_dump())
    return {"ok": True}


@users_router.put('/change_active/{user_name}')
async def change_active(user_deps: everyone_dep, user_name: str, new_active: bool, db: Session = Depends(get_db)):
    UserReposiroty.update(db, model_name=user_name, is_active=new_active)
    return {"ok": True}
