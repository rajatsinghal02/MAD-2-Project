import os
import sys

# Ensure backend directory is in the Python path
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

# pyrefly: ignore [missing-import]
from flask import Flask
from flask_cors import CORS
from database import db

def create_app():
    app = Flask(__name__)
    CORS(app)
    
    # Configure SQLite database
    basedir = os.path.abspath(os.path.dirname(__file__))
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'ppa.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Initialize plugins
    db.init_app(app)
    
    with app.app_context():
        # Import models so they are registered with SQLAlchemy
        import models
    
    @app.route('/')
    def index():
        return {"message": "Placement Portal Application API"}
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)
