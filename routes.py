from flask import Blueprint, render_template, redirect, request
from models import db, Mission

main_bp = Blueprint('main', __name__, url_prefix='/')

@main_bp.route('')
def timeline():
    stmt = db.select(Mission)
    missions = db.session.scalars(stmt).all()

    return render_template('timeline.html', missions=missions)

@main_bp.route('filter', methods=['GET'])
def filter():
    raw_filters = request.args.to_dict() 
    filters = {
        key: val.strip()
        for key, val in raw_filters.items() 
        if val.strip() != ''
    }
    print(filters)

    # Fallbacks


    return '', 204
    
