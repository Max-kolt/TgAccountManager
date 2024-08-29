from config import SECRET_AUTH_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm, HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from fastapi import HTTPException, Request, Depends
from typing import Annotated
from datetime import datetime, timedelta


oauth2_bearer = OAuth2PasswordBearer(tokenUrl='api/v1/auth/login')


class AuthRepository:
    @staticmethod
    def create_token(data: dict) -> str:
        to_encode = data.copy()
        to_encode['exp'] = datetime.utcnow()+timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        return jwt.encode(to_encode, SECRET_AUTH_KEY, algorithm=ALGORITHM)

    @staticmethod
    async def decode_token(token: str) -> dict:
        try:
            payload = jwt.decode(token, SECRET_AUTH_KEY, algorithms=[ALGORITHM])
            return payload
        except Exception:
            return {}


async def verify_token(token: Annotated[str, Depends(oauth2_bearer)]) -> dict:
    if not token:
        raise HTTPException(status_code=402, detail="Need token")
    try:
        payload = await AuthRepository.decode_token(token)
        if payload.get("exp") <= int(datetime.now().timestamp()):
            raise HTTPException(status_code=401, detail='token expired')

        username: str = payload.get('username')
        if username is None:
            raise HTTPException(status_code=401, detail='Could not validate user.')

        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail='Could not validate user.')


async def is_admin(current_user: dict = Depends(verify_token)):
    if current_user.get("is_admin"):
        return current_user
    raise HTTPException(status_code=401, detail='User is not admin.')


admin_dep = Annotated[dict, Depends(is_admin)]
everyone_dep = Annotated[dict, Depends(verify_token)]
