Run Using:
flask --app app run
Seeding:
Run python3 seed.py before running app to seed

Resources:
- https://docs.sqlalchemy.org/en/21/orm/quickstart.html - SQLAlchemy Docs: Quickstart
- https://github.com/ajbraus/bloginator/tree/main - Flask + SQLAlchemy
- https://github.com/NYTLAIT/ACS-1320-React-Fundamentals-Tutorial - CSS

Notes:
- (Models) column name: Mapped['python constraints'] = mapped_column('database constraints')
    Make sure to have them both

AI Use:
- pattern for seeding data using flask-sqlalchemy 2.0
- Model CheckConstraint method use