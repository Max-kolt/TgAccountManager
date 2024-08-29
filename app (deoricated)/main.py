from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from routers import v1_router, all_routers
from loguru import logger
from models import Base
from database import engine, SessionLocal
from schemas import UserSchema
from services import UserService
import pydantic


logger.add('app_logger.log', rotation="500 MB", compression="gz", level="DEBUG", diagnose=False, backtrace=False)


app = FastAPI(title='Manage telegram profiles', root_path='/api')

Base.metadata.create_all(bind=engine)

with SessionLocal() as db:

    try:
        admin = UserService.create_user(db, UserSchema(**{
            "name": "DmitrySmile",
            "is_admin": True,
            "use_func": True,
            "create_users": True,
            "manage_tg_accounts": True,
            "check_tg_msg": True
        }))
        print(f"name: {admin.name}\npassword: {admin.password}")
    except Exception as e:
        print(e)
        logger.info(f'Admin already created')

app.include_router(v1_router)


origins = [
    "http://127.0.0.1",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
async def hello():
    return 'Welcome on our web application api'


if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)
