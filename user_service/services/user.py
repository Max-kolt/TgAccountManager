from fastapi import HTTPException
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from repository import UserRepo
from utils import generate_password, hashing_password, verify_password
from repository import create_token


class UserSchema(BaseModel):
    name: str
    is_admin: bool
    use_func: bool
    create_users: bool
    manage_tg_accounts: bool
    check_tg_msg: bool


class LoginSchema(BaseModel):
    name: str
    password: str


class UserSettingSchema(UserSchema):
    password: str


class ChangePasswordSchema(BaseModel):
    previous_password: str
    new_password: str


class ChangePrivilegesSchema(BaseModel):
    is_admin: bool
    use_func: bool
    create_users: bool
    manage_tg_accounts: bool
    check_tg_msg: bool


class UserService:
    @staticmethod
    async def create_user(db: AsyncSession, data: UserSchema):
        verify = await UserRepo.get_by_name(db, data.name)
        if verify:
            raise HTTPException(status_code=400, detail="Username already taken")

        _random_password = generate_password(lenght=16)

        model = UserSettingSchema(
            **data.model_dump(),
            password=hashing_password(_random_password)
        )
        await UserRepo.create(db, **model.model_dump())

        return UserSettingSchema(
            **data.model_dump(),
            password=_random_password
        )

    @staticmethod
    async def login(db: AsyncSession, auth: LoginSchema) -> tuple[str, dict]:
        user = await UserRepo.get_by_name(db, auth.name)
        if user:
            if not user.is_active:
                raise HTTPException(status_code=400, detail='Account blocked')
            if verify_password(auth.password, user.password):
                jwt_token = create_token(data={
                    'username': user.name,
                    'is_admin': user.is_admin,
                    'use_func': user.use_func,
                    'create_users': user.create_users,
                    'manage_tg_accounts': user.manage_tg_accounts,
                    "check_tg_msg": user.check_tg_msg
                })
                user = user.__dict__
                user.pop('password')
                return jwt_token, user
        raise HTTPException(status_code=400, detail='Name or password not valid')

    @staticmethod
    async def change_password(db: AsyncSession, user_name: str, passwords: ChangePasswordSchema) -> bool:
        user = await UserRepo.get_by_name(db, user_name)
        if user:
            if verify_password(passwords.previous_password, user.password):
                await UserRepo.update(db, user_name, password=hashing_password(passwords.new_password))
                return True
        raise HTTPException(status_code=400, detail='Name or password not valid')

    @staticmethod
    async def change_privileges(db: AsyncSession, user_name: str, new_privileges: ChangePrivilegesSchema):
        await UserRepo.update(db, user_name, **new_privileges.model_dump())
        return True

    @staticmethod
    async def change_active(db: AsyncSession, user_name: str):
        user = await UserRepo.get_by_name(db, user_name)
        await UserRepo.update(db, user_name, is_active=not user.is_active)
        return True

    @staticmethod
    async def get_all(db: AsyncSession, skip_user: str = None):
        all_users = await UserRepo.get_all(db)

        result = []
        for user in all_users:
            if user.name == skip_user:
                continue
            result.append(
                {
                    "name": user.name,
                    "is_admin": user.is_admin,
                    "use_func": user.use_func,
                    "create_users": user.create_users,
                    "manage_tg_accounts": user.manage_tg_accounts,
                    "check_tg_msg": user.check_tg_msg,
                    "is_active": user.is_active,
                    "created_at": user.created_at
                }
            )

        return result

    @staticmethod
    async def get_user_info(db: AsyncSession, user_name: str):
        user_model = await UserRepo.get_by_name(db, user_name)
        user_info: dict = user_model.__dict__
        user_info.pop('password')
        return user_info


