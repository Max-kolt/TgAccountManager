from datetime import datetime
from typing import Annotated
from datetime import timedelta
import jwt
from config import ALGORITHM, SECRET_AUTH_KEY, ACCESS_TOKEN_EXPIRE_MINUTES
from fastapi import Depends, HTTPException, Header


def create_token(data: dict):
    to_encode = data.copy()
    to_encode['exp'] = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    return jwt.encode(to_encode, SECRET_AUTH_KEY, algorithm=ALGORITHM)


async def decode_token(token: str) -> dict:
    try:
        payload = jwt.decode(token, SECRET_AUTH_KEY, algorithms=[ALGORITHM])
        return payload
    except Exception:
        return {}


async def verify_token(authorization: Annotated[str | None, Header()] = None) -> dict:
    if not authorization:
        raise HTTPException(status_code=401, detail="Need authorization header")

    token = authorization.split(' ')[-1]
    payload = await decode_token(token)

    if "exp" and "is_admin" and "username" and "create_users" not in payload:
        raise HTTPException(status_code=401, detail='Token damaged')

    if payload.get("exp") <= int(datetime.now().timestamp()):
        raise HTTPException(status_code=401, detail='Token expired')

    return payload


async def verify_admin(current_user: dict = Depends(verify_token)):
    if current_user.get("is_admin"):
        return current_user
    raise HTTPException(status_code=401, detail='User is not admin.')


async def verify_create_users(current_user: dict = Depends(verify_token)):
    if current_user.get("create_users"):
        return current_user
    raise HTTPException(status_code=401, detail="User can't create users")


create_user_dep = Annotated[dict, Depends(verify_create_users)]
admin_dep = Annotated[dict, Depends(verify_admin)]
everyone_dep = Annotated[dict, Depends(verify_token)]
