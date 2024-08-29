from database import BaseModel, engine


async def setting_database():
    async with engine.begin() as conn:
        await conn.run_sync(BaseModel.metadata.create_all)

