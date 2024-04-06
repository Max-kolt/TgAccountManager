from typing import Generic, TypeVar
from sqlalchemy import update, delete
from sqlalchemy.future import select
from sqlalchemy.orm import Session

T = TypeVar('T')


class BaseRepo:
    model = Generic[T]

    @classmethod
    def create(cls, db: Session, **kwargs):
        model = cls.model(**kwargs)
        db.add(model)
        db.commit()
        return model

    @classmethod
    def update(cls, db: Session, model_id: str, **kwargs):
        query = update(cls.model)\
            .where(cls.model.id == model_id)\
            .values(**kwargs)\
            .execution_options(synchronize_session='fetch')
        db.execute(query)
        db.commit()

    @classmethod
    def delete(cls, db: Session, model_id: str):
        query = delete(cls.model).where(cls.model.id == model_id)
        db.execute(query)
        db.commit()

    @classmethod
    def get_all(cls, db: Session):
        query = select(cls.model)
        return (db.execute(query)).scalars().all()

    @classmethod
    def get_by_id(cls, db: Session, model_id: str):
        query = select(cls.model).where(cls.model.id == model_id)
        return (db.execute(query)).scalars()


