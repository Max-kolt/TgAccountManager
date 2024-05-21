from pydantic import BaseModel


class AuthTelegramAccount(BaseModel):
    login: str
    phone: str
    password: str | None
    

class AddTelegramAccount(AuthTelegramAccount):
    api_id: int
    api_hash: str


class ConfirmTelegramAccount(AuthTelegramAccount):
    confirmation_code: str


class MessageTelegram(BaseModel):
    login: str
    message_to_user: str
    text: str
