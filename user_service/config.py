import os
from dotenv import load_dotenv
from loguru import logger
load_dotenv()


DB_NAME = os.getenv('DB_NAME')
# DB_NAME_SESSIONS = os.getenv('DB_NAME_SESSIONS')
DB_USER = os.getenv('DB_USER')
DB_USER_PASSWORD = os.getenv('DB_USER_PASSWORD')
DB_HOST = os.getenv('DB_HOST')
DB_PORT = int(os.getenv('DB_PORT', '5432'))
DATABASE_URL = f"postgresql+asyncpg://{DB_USER}:{DB_USER_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"


ALGORITHM = os.getenv('ALGORITHM')
SECRET_AUTH_KEY = os.getenv('SECRET_AUTH_KEY')
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES', "43200"))

