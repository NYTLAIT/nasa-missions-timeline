from app import app
from models import db
from models import Mission

from datetime import date

def seed_database():
    print("Initializing database seeding...")

    # Check Seeded
    existing_missions = db.session.scalars(db.select(Mission).limit(1)).first()
    if existing_missions:
        print("Database already has data. Skipping seed.")
        return

    # Defining Preset Data    
    missions = [
        Mission(
        mission="Apollo 11",
        launch=date(1969, 7, 16),
        status='complete',
        end=date(1969, 7, 24),
        description="The historic first crewed lunar landing mission, successfully landing Neil Armstrong and Buzz Aldrin on the Moon."
        ),
        Mission(
        mission="Cassini-Huygens",
        launch=date(1997, 10, 15),
        status='complete',
        end=date(2017, 9, 15),
        description="A flagship robotic orbiter and probe collaboration that extensively studied Saturn, its complex rings, and its diverse moons."
        ),
        Mission(
        mission="Mars Exploration Rover - Opportunity",
        launch=date(2003, 7, 8),
        status='complete',
        end=date(2018, 6, 10),
        description="An incredibly long-lived Mars rover that searched for and found extensive geological evidence of past liquid water on the Martian surface."
        )
    ]

    # 4. Stage and Commit
    db.session.add_all(missions)
    db.session.commit()
    print("Database successfully seeded with preset data!")

if __name__ == "__main__":
    # RUN THIS FILE SPECIFICALLY BEFORE STARTING ACTUAL FLASK APP
    with app.app_context():
        seed_database()