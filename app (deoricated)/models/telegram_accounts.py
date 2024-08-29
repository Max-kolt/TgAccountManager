from .base import Base
from sqlalchemy import Column, String, ForeignKey, Boolean, DateTime, BigInteger, CheckConstraint, Integer
from sqlalchemy.sql import func


class TelegramAccounts(Base):
    # Telegram info
    login = Column(String, nullable=False, primary_key=True)
    phone = Column(String, nullable=False, primary_key=True)
    user_id = Column(Integer, nullable=False, primary_key=True)
    api_id = Column(Integer, nullable=False)
    api_hash = Column(String, nullable=False)
    password = Column(String)
    # Other info
    gender = Column(String)
    is_active = Column(Boolean, default=False)
    online_periods = Column(Integer, default=0)
    online_delay = Column(Integer, default=0)
    utc_time = Column(Integer, default=0)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_onupdate=func.now())
    last_activity = Column(DateTime)
