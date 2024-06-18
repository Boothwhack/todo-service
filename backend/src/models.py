from sqlalchemy import ForeignKey
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


class BaseModel(DeclarativeBase):
    pass


class Todo(BaseModel):
    __tablename__ = "Todo"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    label: Mapped[str]
    checked: Mapped[bool]
