from fastapi import HTTPException
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from repository import UserRepo
from utils import generate_password, hashing_password, verify_password


class UserSchema(BaseModel):
    name: str
    is_admin: bool
    use_func: bool
    create_users: bool
    manage_tg_accounts: bool
    check_tg_msg: bool


class LoginSchema(BaseModel):
    username: str
    password: str


class UserSettingSchema(UserSchema):
    password: str


class UserServices:
    @staticmethod
    async def create_user(db: AsyncSession, data: UserSchema):
        verify = UserRepo.get_by_name(db, data.name)
        if verify:
            raise HTTPException(status_code=400, detail="Username already taken")

        _random_password = generate_password(lenght=16)

        model = UserSettingSchema(
            **data.model_dump(),
            password=hashing_password(_random_password)
        )
        UserRepo.create(db, **model.model_dump())

        return UserSettingSchema(
            **data.model_dump(),
            password=_random_password
        )


