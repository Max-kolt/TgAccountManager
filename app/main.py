from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from routers import all_routers
from models import Base
from database import engine
from loguru import logger


logger.add('app_logger.log', rotation="500 MB", compression="gz", level="DEBUG", diagnose=False, backtrace=False)
Base.metadata.create_all(bind=engine)
app = FastAPI(title='Manage telegram profiles')

for router in all_routers:
    app.include_router(router)


origins = [
    "http://127.0.0.1:8080",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)
