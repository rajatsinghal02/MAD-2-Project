import os
import sys

# Ensure backend directory is in the Python path
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

# pyrefly: ignore [missing-import]
from werkzeug.security import generate_password_hash
from app import create_app
from database import db
from models import User

def init_database():
    app = create_app()
    with app.app_context():
        # Create all tables
        print("Creating database tables...")
        db.create_all()
        
        # Check if Admin user exists
        admin_email = "admin@ppa.com"
        admin = User.query.filter_by(email=admin_email).first()
        if not admin:
            print("Admin user not found. Creating admin user...")
            hashed_password = generate_password_hash("admin123", method='pbkdf2:sha256')
            admin_user = User(
                email=admin_email,
                password=hashed_password,
                role="Admin",
                is_active=True
            )
            db.session.add(admin_user)
            db.session.commit()
            print("Admin user created successfully.")
        else:
            print("Admin user already exists.")
            
        print("Database initialization complete.")

if __name__ == '__main__':
    init_database()
