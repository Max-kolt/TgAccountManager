import asyncio

from sqlalchemy import create_engine
from models import Base
from sqlalchemy.orm import sessionmaker
from config import DB_NAME, DB_USER, DB_PORT, DB_HOST, DB_USER_PASSWORD, DB_NAME_SESSIONS
from loguru import logger

import aiopg.sa


# SQLAlchemy initialization
SQLALCHEMY_DATABASE_URL = f"postgresql+psycopg2://{DB_USER}:{DB_USER_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Aiopg initialization
get_session_engine = aiopg.sa.create_engine(user=DB_USER, database=DB_NAME_SESSIONS, host=DB_HOST, password=DB_USER_PASSWORD)


async def get_session_db():
    session_db = await aiopg.sa.create_engine(user=DB_USER, database=DB_NAME_SESSIONS, host=DB_HOST, password=DB_USER_PASSWORD)
    try:
        yield session_db
    finally:
        session_db.close()

