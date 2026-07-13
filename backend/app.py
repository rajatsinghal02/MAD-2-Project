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
        
        # Initialize database automatically
        db.create_all()
        
        # Check if Admin user exists
        from werkzeug.security import generate_password_hash
        admin_email = "admin@ppa.com"
        admin = models.User.query.filter_by(email=admin_email).first()
        if not admin:
            print("Auto-initializing DB: Admin user not found. Creating admin user...")
            hashed_password = generate_password_hash("admin123", method='pbkdf2:sha256')
            admin_user = models.User(
                email=admin_email,
                password=hashed_password,
                role="Admin",
                is_active=True
            )
            db.session.add(admin_user)
            db.session.commit()
            print("Auto-initializing DB: Admin user created successfully.")
    from auth_routes import auth_bp
    from student_routes import student_bp
    from admin_routes import admin_bp
    from company_routes import company_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(student_bp, url_prefix='/api/student')
    app.register_blueprint(admin_bp, url_prefix='/api/admin')
    app.register_blueprint(company_bp, url_prefix='/api/company')
    
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
