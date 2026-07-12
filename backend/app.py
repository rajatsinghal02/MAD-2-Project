import os
import sys

# Ensure backend directory is in the Python path
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

# pyrefly: ignore [missing-import]
from flask import Flask
from flask_cors import CORS
from database import db
from flask_jwt_extended import JWTManager
# pyrefly: ignore [missing-import]
from flask import render_template

def create_app():
    app = Flask(__name__, template_folder='../frontend', static_folder='../frontend/static')
    CORS(app)
    
    # Configure SQLite database
    basedir = os.path.abspath(os.path.dirname(__file__))
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'ppa.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Configure JWT
    app.config['JWT_SECRET_KEY'] = 'careerkite-super-secret-key-2026' # In production, use env variable
    
    # Initialize plugins
    db.init_app(app)
    jwt = JWTManager(app)
    
    with app.app_context():
        # Import models so they are registered with SQLAlchemy
        import models
    
    # Register Blueprints
    from auth_routes import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    
    # API endpoints will go here...
    
    # SPA Catch-all route to serve index.html
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve_vue_app(path):
        return render_template('index.html')
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=8080)
