
from pydantic import BaseModel


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


class UserSettingsSchema(UserSchema):
    password: str


class ChangePasswordSchema(BaseModel):
    previous_password: str
    new_password: str


class ChangePrivilegesSchema(BaseModel):
    is_admin: bool
    use_func: bool
    create_roles: bool
    create_users: bool
    manage_tg_accounts: bool
    check_tg_msg: bool

