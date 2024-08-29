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

    if "exp" and "is_admin" and "username" not in payload:
        raise HTTPException(status_code=401, detail='Token damaged')

    if payload.get("exp") <= int(datetime.now().timestamp()):
        raise HTTPException(status_code=401, detail='Token expired')

    return payload


everyone_dep = Annotated[dict, Depends(verify_token)]
