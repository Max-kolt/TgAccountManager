from pydantic import BaseModel


class AuthTelegramAccount(BaseModel):
    login: str
    user_id: int
    phone: str
    password: str | None


class AddTelegramAccount(AuthTelegramAccount):
    api_id: int
    api_hash: str


class ConfirmTelegramAccount(AddTelegramAccount):
    confirmation_code: str


class MessageTelegram(BaseModel):
    login: str
    message_to_user: str
    text: str


class TelegramAccountSchema(BaseModel):
    login: str
    phone: str
    fname: str
    lname: str
    description: str
    gender: str | None


class TelegramSessionSchema(BaseModel):
    phone: str
    user_id: int
    login: str
