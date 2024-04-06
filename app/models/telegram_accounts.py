from database import Base
from sqlalchemy import Column, String, ForeignKey, Boolean, DateTime, BigInteger, CheckConstraint
from sqlalchemy.sql import func


class TelegramAccounts(Base):
    __tablename__ = "tg_accounts"

    id = Column("id", BigInteger, primary_key=True, autoincrement=True)
    # Telegram info
    login = Column("login", String, nullable=False)
    phone = Column("phone", String, nullable=False)
    # Other info
    gender = Column("gender", String)
    is_active = Column("is_active", Boolean, default=True)
    created_at = Column("created_at", DateTime, server_default=func.now())
    updated_at = Column("updated_at", DateTime, server_onupdate=func.now())
    last_activity = Column("last_activity", DateTime)
    last_online = Column("last_online", DateTime)



