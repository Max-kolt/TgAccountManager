from sqlalchemy import Column, Boolean, String, DateTime
from sqlalchemy.sql import func
from .base import BaseModel


class Users(BaseModel):
    # default
    name = Column(String, primary_key=True)
    password = Column(String, nullable=False)
    # privileges
    is_admin = Column(Boolean, default=False)
    use_func = Column(Boolean, default=False)
    # create_roles = Column("create_roles", Boolean, default=False)
    create_users = Column(Boolean, default=False)
    manage_tg_accounts = Column(Boolean, default=False)
    check_tg_msg = Column(Boolean, default=False)

    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())