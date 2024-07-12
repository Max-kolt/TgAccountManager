from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from routers import all_routers
from models import Base
from database import engine, SessionLocal
from services import UserService
from schemas import UserSchema
from loguru import logger

logger.add('app_logger.log', rotation="500 MB", compression="gz", level="DEBUG", diagnose=False, backtrace=False)
# Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

with SessionLocal() as db:
    try:
        admin = UserService.create_user(db, UserSchema(**{
            "name": "admin",
            "is_admin": True,
            "use_func": True,
            "create_users": True,
            "manage_tg_accounts": True,
            "check_tg_msg": True
        }))
        print(f"name: {admin.name}\npassword: {admin.password}")
    except Exception as e:
        logger.info(f'Admin already created')

app = FastAPI(title='Manage telegram profiles', root_path='/api/v1')

for router in all_routers:
    app.include_router(router)

origins = [
    "http://127.0.0.1:80",
    "http://frontend",
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
