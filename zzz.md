Run Using:
$ source .venv/bin/activate
$ flask --app app run
Seeding:
Run python3 seed.py before running app to seed

Resources:
- https://docs.sqlalchemy.org/en/21/orm/quickstart.html - SQLAlchemy Docs: Quickstart
- https://github.com/ajbraus/bloginator/tree/main - Flask + SQLAlchemy
- https://github.com/NYTLAIT/ACS-1320-React-Fundamentals-Tutorial - CSS
- https://github.com/NYTLAIT/shape-calculator - Javascript watcher
- https://github.com/Tech-at-DU/Proud-Petes-Pet-Emporium - Simple Search
- https://github.com/NYTLAIT/savemeporo - Dynamic Search
- https://docs.python.org/3/library/datetime.html#strftime-and-strptime-behavior - Conver string to date object
- https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch - Fetching

- https://dev.to/blamsa0mine/building-a-smart-exit-confirmation-modal-with-the-popstate-api-in-typescript-1bj2 - back/forward
- https://www.pythonforbeginners.com/basics/check-if-a-string-is-empty-or-whitespace-in-python - Checking for whitespace lol

---------------------------------------------------------

SCHEDULE:

1. Monday (DAY 1):
    - Goal: SETUP - Hook up SQLAlchemy with Flask. Populate with three test data to be able to show a timeline line. Setup a rough javascript frontend to check if fetch is working and display a modal when hovered.
    - Finished: Hooked up SQLAlchemy with Flask | Created the missions module | Created seed.py to populate database with 3 test entries | Able to show the entries | Displays a modal when hovered
    - Unfinished: No Javascript; rendered page with Jinja

2. Tuesday (DAY 2):
    - Goal: YESTERDAY - Set up Javascipt listener to at least be able to filter something with the very few data have to check if working | DATA - Look for databases and insert into the sql, else spend the whole day populating the tables.
    - Finished: - Form submition goes through javascript that creates filter url to point to python route to handle sql querying

3. Wednesday (DAY 3):
    - Goal: YESTERDAY - Be able to render the timeline, populate json| FILTER - Finalize filter
    - Finished: Able to seed database with json data | Routes handle bookmarking filters | Able to fetch and get json data from routes | Able to render data 

4. Thursday (DAY 4):
    - Goal: STYLING && PRESENTATION - Style the application, create presetation slides

---------------------------------------------------------

AI Use:
- pattern for seeding data using flask-sqlalchemy 2.0
- Model CheckConstraint method use
- Horizontal Scroll Javascript Listener
- Brainstorming how to Organize the Filter Inputs
- Using .where() to get conditional
- Getting best practices to get multiple param items that may have empty strings
- Full search on sql
- Organizing routes; how to seperate the logic of the routes efficiently
- Prompt: "If I have a date value in strings, in a dictionary, in a list of many dictionaries with the same issue. How can I convert them all to actual date objects? Would it okay to iterate over all dictionaries and do datetime.strptime(entry, %Y-%m-%d)?"
- "Prompt: "Whys is this:     
missions = db.session.scalars(stmt).all()
return jsonify(missions)
giving me a type error?"
- Prompt: "Say a url points me to route that gives me a json of items I need but another url actually handles the rendering. How can I make it so that it retains bookmark functionality as the parameters will disappear when rendered while keeping the setup?"
- Formatting dates in javascript rendering to something readable

Notes:
- (Models) column name: Mapped['python constraints'] = mapped_column('database constraints')
    Make sure to have them both
- Flask cannot just return nothing (return or return None), must be a valid HTTP response (Strings work)
    Learned can do this though: return 'Bad Request', 400 - or whatever status
- .entries() returns an iterator, not an array with arrays inside, just arrays in an iterator
    Object.fromEntries() turns key value pairs into an object
    Object.entries() does the opposite of above which makes it rather funny how the wholes thing goes
    Use spread operator to turn into an array
- .where() joins with AND not OR
- db.session.scalars(stmt).all() returns Model objects not dictionaries
- URLSearchParams() lets treat query strings as key-value pairs the way you can loop through a string and get each character, URLSearchParams gets each key-value pair but shows up as a string among making sure its okay to put in the url and deal with spaces and such