from database import BaseModel
from sqlalchemy import update, select, delete
from sqlalchemy.ext.asyncio import AsyncSession


class BaseCrudRepo:
    model: BaseModel

    @classmethod
    async def create(cls, db: AsyncSession, **kwargs):
        model = cls.model(**kwargs)
        db.add(model)
        await db.commit()
        return model

    @classmethod
    async def update(cls, db: AsyncSession, model_id: str, **kwargs):
        query = update(cls.model) \
            .where(cls.model.id == model_id) \
            .values(**kwargs) \
            .execution_options(synchronize_session='fetch')
        await db.execute(query)
        await db.commit()

    @classmethod
    async def delete(cls, db: AsyncSession, model_id: str):
        query = delete(cls.model).where(cls.model.id == model_id)
        await db.execute(query)
        await db.commit()

    @classmethod
    async def get_all(cls, db: AsyncSession):
        query = select(cls.model)
        return (await db.execute(query)).scalars().all()

    @classmethod
    async def get_by_id(cls, db: AsyncSession, model_id: str):
        query = select(cls.model).where(cls.model.id == model_id)
        return (await db.execute(query)).scalar_one_or_none()


