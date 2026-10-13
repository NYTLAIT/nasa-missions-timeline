from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import String, ForeignKey

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
class Missions(db.Model):
    __tablename__ = 'missions'

    mission: Mapped[str] = mapped_column()
    launch: Mapped[int] = mapped_column()
    description: Mapped[str] = mapped_column()
