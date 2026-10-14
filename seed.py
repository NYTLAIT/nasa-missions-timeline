from app import app
from models import db
from models import Mission

from datetime import datetime
import json

def seed_database():
    print("Initializing database seeding...")

    # Check Seeded
    existing_missions = db.session.scalars(db.select(Mission).limit(1)).first()
    if existing_missions:
        print("Database already has data. Skipping seed.")
        return

    # Setting Preset Data From json After Cleaning
    missions = []

    with open('data.json', 'r', encoding="utf-8") as f:
        raw_missions = json.load(f)

    for mission in raw_missions:
        mission["launch"] = datetime.strptime(
            mission["launch"], "%Y-%m-%d"
        )

        if mission.get('concluded'):
            mission["concluded"] = datetime.strptime(
                mission["concluded"], "%Y-%m-%d"
            )
        missions.append(Mission(**mission))

    # 4. Stage and Commit
    db.session.add_all(missions)
    db.session.commit()
    print("Database successfully seeded with preset data!")

if __name__ == "__main__":
    # RUN THIS FILE SPECIFICALLY BEFORE STARTING ACTUAL FLASK APP
    with app.app_context():
        seed_database()