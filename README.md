# NASA Mission Timeline
Explore NASA missions through an interactive timeline! Search and filter missions by dates, status, mission type, target, and more. Hover over any mission to see details of its objectives, launch date, status, and launch site or research location. Then follow the link or click the card to learn more from the mission's official NASA website. 

## Run it!
- Download repo
- $ python3 -m venv venv (create virtual environment)
- $ source venv/bin/activate (activate virtual environment)
- $ pip install requirements.txt (donwload dependencies)
- $ flask --app app run (run the app on app.py)

## Features:
1. Easy, readable, informative, mission browsing
2. Neat modal formatting for more mission information
3. Bookmarkable filters
4. Extensive and comprehensive search 
5. Advanced mission filtering
6. Seamless links to official NASA mission websites

## Stack
- SQLAlchemy for database relations
- SQLite for the actual database
- Flask to host routes
- Plain Javascript for rendering
- CSS and Tailwind for styling
- JSON file to store entries for seeding database

## Workflow:
1. JS requests missions from Flask route with filter parameters
2. Flask and SQLAlchemy queries SQLite to match filters
3. Flask route responds with json object of matched missions
4. Javascript renders the missions
5. Custom CSS and Tailwind style the interface
6. Users can submit filter form to repeat cycle

## Why:
### Idea:
Disliked the current NASA layout for missions that seems uninformative and unhandy for browsing. Timeline was a good way to showcase the history informatively and be easy to broowse.

### Tech:
- Understand recent SQLAlchemy querying
- Practice querying with SQLAlchemy and setting guards on inputs
- Further understand how APIs run with the missions route
- Practice fetching from an API with Javascript
- Learning url javascript methods, specically for bookmark feature
- Practice making code more modular
- Understanding reading from a JSON file
- Better understand dynamic rendering with Javascript
- Practice CSS and tailwind
- Better understand flow between Javascript rendering and Pythong backend

## Other notes
- Slide presentation link: https://docs.google.com/presentation/d/1ti5pGkKTjlOtIJSogj-0EnTHnpLLwzCaD2od99MWafM/edit?usp=sharing
- - Check out zzz.md for resources used, AI use, progress, and known issues