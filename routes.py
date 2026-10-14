from flask import Blueprint, render_template, url_for, redirect, request
from sqlalchemy import String, or_
from models import db, Mission

main_bp = Blueprint('main', __name__, url_prefix='/')

# ----------- MAIN RENDER ROUTE WITH FILTER LOGIC ----------- 
@main_bp.route('')
def timeline():
    filters = request.args
    stmt = db.select(Mission)

# ---- INPUT FIELDS
    general_search = filters.get('general-search')
    status = filters.get('status')
    date_start = filters.get('date-start')
    date_end = filters.get('date-end')
    launch_start = filters.get('launch-start')
    launch_end = filters.get('launch-end')
    concluded_start = filters.get('concluded-start')
    concluded_end = filters.get('consluded-end')
    type = filters.get('type')
    target = filters.get('target')
    objective = filters.get('objective')
    site = filters.get('site')

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

    if concluded_end:
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

    return render_template('timeline.html', missions=missions)

# ----------- GATHER FILTERS FROM JAVASCRIPT -----------  
@main_bp.route('filter', methods=['GET'])
def filter_missions():
    raw_filters = request.args.to_dict() 
    filters = {
        key: val.strip()
        for key, val in raw_filters.items() 
        if val.strip() != ''
    }

    return redirect(url_for('main.timeline', **filters))

# ----------- RESET FILTERS ----------- 
@main_bp.route('/reset')
def reset_filters():
    return redirect(url_for('main.timeline'))
    
