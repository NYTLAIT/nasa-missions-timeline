from flask import Flask
from models import init_db # models
from routes import main_bp # routes

def create_app():
    app = Flask(__name__)

    init_db(app)
    app.register_blueprint(main_bp)

    return app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)