from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import v1_router
from utils import setting_database, set_admin


async def lifespan(app: FastAPI):
    await setting_database()
    await set_admin()
    yield


app = FastAPI(lifespan=lifespan, title='Users service', root_path='/api')


app.include_router(v1_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
async def welcome():
    return {'Hello': 'user service'}
