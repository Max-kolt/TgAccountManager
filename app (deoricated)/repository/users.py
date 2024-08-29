from models import Users
from .base_repo import BaseRepo
from sqlalchemy.orm import Session
from sqlalchemy import select, delete, update


class UserReposiroty(BaseRepo):
    model = Users

    @classmethod
    def get_by_name(cls, db: Session, model_name: str) -> Users | None:
        query = select(cls.model).where(cls.model.name == model_name)
        output = (db.execute(query)).scalar_one_or_none()
        return output

    @classmethod
    def delete(cls, db: Session, model_name: str):
        query = delete(cls.model).where(cls.model.name == model_name)
        db.execute(query)
        db.commit()

    @classmethod
    def update(cls, db: Session, model_name: str, **kwargs):
        query = update(cls.model) \
            .where(cls.model.name == model_name) \
            .values(**kwargs) \
            .execution_options(synchronize_session='fetch')
        db.execute(query)
        db.commit()
