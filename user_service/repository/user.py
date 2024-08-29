from .base import BaseCrudRepo
from database import Users
from sqlalchemy import select, delete, update
from sqlalchemy.ext.asyncio import AsyncSession


class UserRepo(BaseCrudRepo):
    model = Users

    @classmethod
    async def get_by_name(cls, db: AsyncSession, model_name: str) -> Users | None:
        query = select(cls.model).where(cls.model.name == model_name)
        output = (await db.execute(query)).scalar_one_or_none()
        return output

    @classmethod
    async def delete(cls, db: AsyncSession, model_name: str):
        query = delete(cls.model).where(cls.model.name == model_name)
        await db.execute(query)
        await db.commit()

    @classmethod
    async def update(cls, db: AsyncSession, model_name: str, **kwargs):
        query = update(cls.model) \
            .where(cls.model.name == model_name) \
            .values(**kwargs) \
            .execution_options(synchronize_session='fetch')
        await db.execute(query)
        await db.commit()

