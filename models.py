from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import Date, CheckConstraint

from datetime import date
from typing import Literal, Optional

class Base(DeclarativeBase):
    id: Mapped[int] = mapped_column(primary_key=True)

# ------ FLASK + SQLAlchemy Setup
db = SQLAlchemy(model_class=Base)

def init_db(app: Flask):
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///project.db"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    with app.app_context():
        db.create_all()

# ------ MODELS
class Mission(db.Model):
    __tablename__ = 'missions'

    name: Mapped[str] = mapped_column()
    status: Mapped[Literal['ongoing', 'concluded', 'abandoned']] = mapped_column(CheckConstraint("status IN ('ongoing', 'concluded', 'abandoned')"))
    launch: Mapped[date] = mapped_column(Date)
    end: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    description: Mapped[str] = mapped_column()
    type: Mapped[str] = mapped_column()
    target: Mapped[str] = mapped_column()
    objective: Mapped[str] = mapped_column()
    site: Mapped[str] = mapped_column()
