from config import SECRET_AUTH_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm, HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from fastapi import HTTPException, Request, Depends
from typing import Annotated
from datetime import datetime, timedelta

from sqlalchemy.orm import Session

from .users import UserReposiroty
from database import get_db

oauth2_bearer = OAuth2PasswordBearer(tokenUrl='auth/login')


class AuthRepository:
    @staticmethod
    def create_token(data: dict) -> str:
        to_encode = data.copy()
        to_encode['exp'] = datetime.utcnow()+timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        return jwt.encode(to_encode, SECRET_AUTH_KEY, algorithm=ALGORITHM)

    @staticmethod
    async def decode_token(token: str):
        try:
            payload = jwt.decode(token, SECRET_AUTH_KEY, algorithms=[ALGORITHM])
            return payload
        except Exception:
            return {}


async def verify_token(token: Annotated[str, Depends(oauth2_bearer)]):
    try:
        payload = await AuthRepository.decode_token(token)
        if payload["exp"] <= int(datetime.now().timestamp()):
            raise HTTPException(status_code=401, detail='token expired')

        username: str = payload.get('username')
        if username is None:
            raise HTTPException(status_code=401, detail='Could not validate user.')

        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail='Could not validate user.')


async def refresh_token(token: Annotated[str, Depends(oauth2_bearer)]):
    payload = await AuthRepository.decode_token(token)
    new_token = AuthRepository.create_token({'username': payload.get('username')})
    return new_token


async def is_admin(current_user=Depends(verify_token), db: Session = Depends(get_db)):
    user = UserReposiroty.get_by_name(db, current_user.get("username"))
    if user.is_admin:
        return current_user
    raise HTTPException(status_code=401, detail='User is not admin.')


refresh_dep = Annotated[dict, Depends(refresh_token)]
admin_dep = Annotated[dict, Depends(is_admin)]
everyone_dep = Annotated[dict, Depends(verify_token)]
