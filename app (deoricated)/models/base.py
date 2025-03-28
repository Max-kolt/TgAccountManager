from sqlalchemy.ext.declarative import as_declarative, declared_attr
import humps


@as_declarative()
class Base:
    __name__: str

    @declared_attr
    def __tablename__(cls) -> str:
        return humps.depascalize(cls.__name__)

