from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordRequestForm

from sqlalchemy.orm import Session
from schemas import UserSchema, UserSettingsSchema, ChangePasswordSchema
from repository import UserReposiroty, AuthRepository
import string, secrets
from fastapi import HTTPException
from datetime import datetime, timedelta


bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated="auto")


def password_generator(lenght: int = 8):
    symbols = string.ascii_letters+string.digits+"_-@$№^+=-"
    return "".join([secrets.choice(symbols) for i in range(lenght)])  # Random symbols choices


class UserService:
    @staticmethod
    def create_user(db: Session, data: UserSchema):
        verify = UserReposiroty.get_by_name(db, data.name)
        if verify:
            raise HTTPException(status_code=400, detail="Username already taken")

        _random_password = password_generator(lenght=16)

        model = UserSettingsSchema(
            **data.model_dump(),
            password=bcrypt_context.hash(_random_password)
        )
        UserReposiroty.create(db, **model.model_dump())

        return UserSettingsSchema(
            **data.model_dump(),
            password=_random_password
        )

    @staticmethod
    def login(db: Session, login: OAuth2PasswordRequestForm) -> str:
        user = UserReposiroty.get_by_name(db, login.username)
        if user:
            if bcrypt_context.verify(login.password, user.password):
                return AuthRepository.create_token(data={
                    'username': user.name
                })
        raise HTTPException(status_code=400, detail='Name or password not valid')

    @staticmethod
    def change_password(db: Session, user_name: str, passwords: ChangePasswordSchema)->bool:
        user = UserReposiroty.get_by_name(db, user_name)
        if user:
            if bcrypt_context.verify(passwords.previous_password, user.password):
                UserReposiroty.update(db, user_name, password=bcrypt_context.hash(passwords.new_password))
                return True
        raise HTTPException(status_code=400, detail='Name or password not valid')
