from dotenv import load_dotenv
import os

DEBUG = True
APP_NAME = "Telegram subscription service"

load_dotenv()

DB_NAME = os.getenv('DB_NAME')
DB_USER = os.getenv('DB_USER')
DB_USER_PASSWORD = os.getenv('DB_USER_PASSWORD')
DB_HOST = os.getenv('DB_HOST')
DB_PORT = int(os.getenv('DB_PORT')) if os.getenv('DB_PORT') is not None else None

ALGORITHM = os.getenv('ALGORITHM')
SECRET_AUTH_KEY = os.getenv('SECRET_AUTH_KEY')
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES'))
