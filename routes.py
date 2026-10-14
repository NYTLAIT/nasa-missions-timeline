from flask import Blueprint, render_template, request, jsonify
from sqlalchemy import String, or_
from models import db, Mission

from datetime import date

main_bp = Blueprint('main', __name__, url_prefix='/')

# ----------- MAIN RENDER ROUTE ----------- -----------
@main_bp.route('')
def timeline():
    return render_template('timeline.html')

# ----------- RETURN JSON OF MISSIONS ----------- -----------
@main_bp.route('missions')
def missions():
    # ---- GRABBING URL PARAMS
    raw_filters = request.args.to_dict() 
    filters = {
        key: val.strip()
        for key, val in raw_filters.items() 
        if val.strip() != ''
    }

    # ---- INPUT FIELDS
    general_search = filters.get('general-search')
    status = filters.get('status')

    date_start = filters.get('date-start')
    date_end = filters.get('date-end')
    launch_start = filters.get('launch-start')
    launch_end = filters.get('launch-end')
    concluded_start = filters.get('concluded-start')
    concluded_end = filters.get('concluded-end')

    type = filters.get('type')
    target = filters.get('target')
    objective = filters.get('objective')
    site = filters.get('site')

    # ---- CONVERT TO DATE OBJECTS
    date_start = date.fromisoformat(date_start) if date_start else None
    date_end = date.fromisoformat(date_end) if date_end else None
    launch_start = date.fromisoformat(launch_start) if launch_start else None
    launch_end = date.fromisoformat(launch_end) if launch_end else None
    concluded_start = date.fromisoformat(concluded_start) if concluded_start else None
    concluded_end = date.fromisoformat(concluded_end) if concluded_end else None

    # ---- DATABASE
    stmt = db.select(Mission)

    # -- FULL SEARCH
    if general_search:
        # IMPORTANT: On a larger scale database, performance will be horrible
        # SQLite does not do full search efficiently and especially with ilike
        # Does not search dates however
        full_search_condition = [
            column.ilike(f'%{general_search}%')
            for column in Mission.__table__.columns
            if isinstance(column.type, String)
        ]
        if full_search_condition:
            stmt = stmt.where((or_(*full_search_condition)))

    # -- DATE LOGIC
    if date_start:
        stmt = stmt.where(Mission.launch >= date_start)
    if date_end:
        stmt = stmt.where(Mission.concluded <= date_end)

    if launch_start:
        stmt = stmt.where(Mission.launch >= launch_start)
    if launch_end:
        stmt = stmt.where(Mission.launch <= launch_end)

    if concluded_start:
        stmt = stmt.where(Mission.concluded >= concluded_start)
    if concluded_end:
        stmt = stmt.where(Mission.concluded <= concluded_end)

    # -- OTHER
    if status:
        stmt = stmt.where(Mission.status == status)

    if type:
        stmt = stmt.where(Mission.type.ilike(f'%{type}%'))

    if target:
        stmt = stmt.where(Mission.target.ilike(f'%{target}%'))
        
    if objective:
        stmt = stmt.where(Mission.objective.ilike(f'%{objective}%'))

    if site:
        stmt = stmt.where(Mission.site.ilike(f'%{site}%'))

    # -- RUN IT
    missions = db.session.scalars(stmt).all() 

    return jsonify([
        {
        "name": mission.name,
        "status": mission.status,
        "launch": mission.launch,
        "concluded": mission.concluded,
        "description": mission.description,
        "type": mission.type,
        "target": mission.target,
        "objective": mission.objective,
        "site": mission.site,
        "link": mission.link
        }
        for mission in missions
    ])
