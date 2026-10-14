Run Using:
flask --app app run
Seeding:
Run python3 seed.py before running app to seed

Resources:
- https://docs.sqlalchemy.org/en/21/orm/quickstart.html - SQLAlchemy Docs: Quickstart
- https://github.com/ajbraus/bloginator/tree/main - Flask + SQLAlchemy
- https://github.com/NYTLAIT/ACS-1320-React-Fundamentals-Tutorial - CSS
- https://github.com/NYTLAIT/shape-calculator - Javascript watcher
- https://github.com/Tech-at-DU/Proud-Petes-Pet-Emporium - Simple Search
- https://github.com/NYTLAIT/Antarctica-Research-Stations - Search Filter
- https://github.com/NYTLAIT/savemeporo - Dynamic Search

---------------------------------------------------------

SCHEDULE:

1. Monday (DAY 1):
    - Goal: SETUP - Hook up SQLAlchemy with Flask. Populate with three test data to be able to show a timeline line. Setup a rough javascript frontend to check if fetch is working and display a modal when hovered.
    - Finished: Hooked up SQLAlchemy with Flask | Created the missions module | Created seed.py to populate database with 3 test entries | Able to show the entries | Displays a modal when hovered
    - Unfinished: No Javascript; rendered page with Jinja

2. Tuesday (DAY 2):
    - Goal: YESTERDAY - Set up Javascipt listener to at least be able to filter something with the very few data have to check if working | DATA - Look for databases and insert into the sql, else spend the whole day populating the tables.

3. Wednesday (DAY 3):
    - Goal: FILTER - Finalize filter | Style better | Start Presentation Preperation.

4. Thursday (FINAL - Limited to before class):
    - Goal: Run through presentation preperation.

---------------------------------------------------------

Notes:
- (Models) column name: Mapped['python constraints'] = mapped_column('database constraints')
    Make sure to have them both

AI Use:
- pattern for seeding data using flask-sqlalchemy 2.0
- Model CheckConstraint method use
- Horizontal Scroll Javascript Listener