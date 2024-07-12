from database import Base
from sqlalchemy import Column, String, ForeignKey, Boolean, DateTime, BigInteger, CheckConstraint, Integer
from sqlalchemy.sql import func


class TelegramAccounts(Base):
    __tablename__ = "tg_accounts"

    # Telegram info
    login = Column("login", String, nullable=False, primary_key=True)
    phone = Column("phone", String, nullable=False, primary_key=True)
    api_id = Column("api_id", Integer, nullable=False)
    api_hash = Column("api_hash", String, nullable=False)
    password = Column("password", String)
    # Other info
    gender = Column("gender", String)
    is_active = Column("is_active", Boolean, default=False)
    # online_delay = Column("online_delay", Integer)
    created_at = Column("created_at", DateTime, server_default=func.now())
    updated_at = Column("updated_at", DateTime, server_onupdate=func.now())
    last_activity = Column("last_activity", DateTime)
    last_online = Column("last_online", DateTime)
