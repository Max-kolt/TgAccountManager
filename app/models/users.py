from database import Base
from sqlalchemy import Column, String, Boolean, DateTime
from sqlalchemy.sql import func


class User(Base):
    __tablename__ = "users"

    # default
    name = Column("name", String, primary_key=True)
    password = Column("password", String, nullable=False)
    # privileges
    is_admin = Column("is_admin", Boolean, default=False)
    use_func = Column("use_func", Boolean, default=False)
    # create_roles = Column("create_roles", Boolean, default=False)
    create_users = Column("create_users", Boolean, default=False)
    manage_tg_accounts = Column("manage_tg_accounts", Boolean, default=False)
    check_tg_msg = Column("check_tg_msg", Boolean, default=False)

    is_active = Column("is_active", Boolean, default=True)
    created_at = Column("created_at", DateTime, server_default=func.now())
