from datetime import datetime
from typing import Annotated

import jwt
from config import ALGORITHM, SECRET_AUTH_KEY
from fastapi import Depends, HTTPException, Header


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
    if payload.get("exp") <= int(datetime.now().timestamp()):
        raise HTTPException(status_code=401, detail='Token expired')

    return payload


everyone_dep = Annotated[dict, Depends(verify_token)]

