from fastapi import APIRouter, Depends
from database import get_async_session
from sqlalchemy.ext.asyncio import AsyncSession
from repository import everyone_dep, UserRepo
from services import UserService, UserSchema, UserSettingSchema, ChangePasswordSchema, ChangePrivilegesSchema

users_router = APIRouter(prefix='/users', tags=['Users'])


@users_router.get('/get_all')
async def get_users(user_dep: everyone_dep, db: AsyncSession = Depends(get_async_session)):
    all_users = await UserService.get_all(db, skip_user=user_dep['username'])
    return all_users


@users_router.get('/get_me')
async def get_user_info(user_deps: everyone_dep, db: AsyncSession = Depends(get_async_session)):
    user_info = await UserService.get_user_info(db, user_deps['username'])
    return user_info


@users_router.post('/create')
async def create_user(user_deps: everyone_dep, request_body: UserSchema, db: AsyncSession = Depends(get_async_session)):
    result_user = await UserService.create_user(db, request_body)
    return result_user


@users_router.delete("/delete/{user_name}")
async def delete_user(user_deps: everyone_dep, user_name: str, db: AsyncSession = Depends(get_async_session)):
    await UserRepo.delete(db, user_name)
    return {'ok': True}


@users_router.put('/change_password/{user_name}')
async def change_password(user_deps: everyone_dep, user_name: str, request_body: ChangePasswordSchema,
                          db: AsyncSession = Depends(get_async_session)):
    result = await UserService.change_password(db, user_name, passwords=request_body)
    return {'ok': result}


@users_router.put('/change_privileges/{user_name}')
async def change_privileges(user_deps: everyone_dep, user_name: str, new_privileges: ChangePrivilegesSchema,
                            db: AsyncSession = Depends(get_async_session)):
    is_updated = await UserService.change_privileges(db, user_name, new_privileges)
    return {'ok': is_updated}


@users_router.put('/change_active/{user_name}')
async def change_active(user_deps: everyone_dep, user_name: str, db: AsyncSession = Depends(get_async_session)):
    is_updated = await UserService.change_active(db, user_name)
    return {'ok': is_updated}
