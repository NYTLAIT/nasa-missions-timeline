from flask import Blueprint, render_template
from models import db, Mission

main_bp = Blueprint('main', __name__, url_prefix='/')

@main_bp.route('')
def timeline():
    stmt = db.select(Mission)
    missions = db.session.scalars(stmt).all()

    return render_template('timeline.html', missions=missions)