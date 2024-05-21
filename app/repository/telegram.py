from .base_repo import BaseRepo
from models import TelegramAccounts
from sqlalchemy.orm import Session
from sqlalchemy import select, update, delete


class TelegramAccountsRepository(BaseRepo):
    model = TelegramAccounts

    @classmethod
    def get_by_login(cls, db: Session, login: str):
        query = select(cls.model).where(cls.model.login == login)
        return (db.execute(query)).scalar_one_or_none()

    @classmethod
    def update_by_login(cls, db: Session, login: str, **kwargs):
        query = update(cls.model) \
            .where(cls.model.login == login) \
            .values(**kwargs) \
            .execution_options(synchronize_session='fetch')
        db.execute(query)
        db.commit()

    @classmethod
    def delete_by_login(cls, db: Session, login: str):
        query = delete(cls.model).where(cls.model.login == login)
        db.execute(query)
        db.commit()
