from dataclasses import dataclass
from functools import cache
from typing import Annotated
from pathlib import Path

from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy import Engine, create_engine, make_url
from sqlalchemy.orm import Session
from pydantic_settings import BaseSettings
from pydantic import Field

from models import Todo

app = FastAPI()


class Settings(BaseSettings):
    database_url: str = Field
    database_password: str | None = Field(default=None)
    database_password_file: Path | None = Field(default=None)

    class Config:
        frozen = True


@cache
def get_settings() -> Settings:
    return Settings()


SettingsDep = Annotated[Settings, Depends(get_settings)]


@cache
def get_db_engine(settings: SettingsDep) -> Engine:
    url = make_url(settings.database_url)
    if settings.database_password is not None:
        url = url.set(password=settings.database_password)
    elif settings.database_password_file is not None:
        password = settings.database_password_file.read_text(encoding="utf-8")
        url = url.set(password=password)

    return create_engine(url)


EngineDep = Annotated[Engine, Depends(get_db_engine)]


@cache
def get_session(engine: EngineDep) -> Session:
    return Session(engine)


SessionDep = Annotated[Session, Depends(get_session)]


@app.get("/todos")
async def get_todos(session: SessionDep):
    todos = session.query(Todo).all()
    return {"todos": [
        {"id": todo.id, "label": todo.label, "checked": todo.checked} for todo in todos
    ]}


@dataclass
class CreateTodo:
    label: str


@app.post("/todos")
async def create_todo(opts: CreateTodo, session: SessionDep):
    todo = Todo(label=opts.label, checked=False)
    session.add(todo)
    session.commit()

    return {"id": todo.id, "label": todo.label, "checked": todo.checked}


@dataclass
class UpdateTodo:
    label: str | None = None
    checked: bool | None = None


@app.put("/todos/{ident}")
async def update_todo(ident: int, opts: UpdateTodo, session: SessionDep):
    todo = session.get(Todo, ident)
    if todo is None:
        raise HTTPException(status_code=404)

    if opts.label is not None:
        todo.label = opts.label
    if opts.checked is not None:
        todo.checked = opts.checked

    session.commit()

    return {"id": todo.id, "label": todo.label, "checked": todo.checked}


@app.delete("/todos/{ident}")
async def delete_todo(ident: int, session: SessionDep):
    todo = session.get(Todo, ident)
    if todo is None:
        raise HTTPException(status_code=404)

    session.delete(todo)
