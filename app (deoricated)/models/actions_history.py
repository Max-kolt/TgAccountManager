from .base import Base
from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func


class ActionsHistory(Base):
    id = Column(Integer, primary_key=True)
    # Time info
    started_at = Column(DateTime, server_default=func.now())
    finished_at = Column(DateTime)
    # Action info
    channel_link = Column(String, nullable=False)
    account_range = Column(Integer, nullable=False)
    mode = Column(String, nullable=False)
    bot_check = Column(Boolean, default=False)
    message_check = Column(String)
    answer_check = Column(String)
    boy_girl_ratio = Column(Integer)

