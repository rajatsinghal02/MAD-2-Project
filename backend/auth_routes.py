from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models import User, Student, Company
from database import db
import datetime
import json

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({"msg": "Missing email or password"}), 400
        
    user = User.query.filter_by(email=data['email']).first()
    
    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({"msg": "Invalid credentials"}), 401
        
    if not user.is_active:
        return jsonify({"msg": "Account is inactive"}), 403

    # If company, check approval status
    if user.role == 'Company':
        company = Company.query.filter_by(user_id=user.id).first()
        if company and company.approval_status != 'Approved':
            return jsonify({"msg": f"Account status: {company.approval_status}"}), 403

    # Generate token
    expires = datetime.timedelta(days=1)
    payload = json.dumps({"id": user.id, "role": user.role, "email": user.email})
    access_token = create_access_token(identity=payload, expires_delta=expires)
    
    return jsonify({
        "token": access_token,
        "user": {
            "id": user.id,
            "email": user.email,
            "role": user.role
        }
    }), 200

@auth_bp.route('/register/student', methods=['POST'])
def register_student():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')
    
    if not all([email, password, name]):
        return jsonify({"msg": "Missing required fields"}), 400
        
    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "Email already registered"}), 409
        
    try:
        new_user = User(
            email=email,
            password=generate_password_hash(password, method='pbkdf2:sha256'),
            role='Student',
            is_active=True
        )
        db.session.add(new_user)
        db.session.flush() # To get the user ID
        
        new_student = Student(
            user_id=new_user.id,
            name=name
        )
        db.session.add(new_student)
        db.session.commit()
        
        return jsonify({"msg": "Student registered successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": str(e)}), 500

@auth_bp.route('/register/company', methods=['POST'])
def register_company():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')
    
    if not all([email, password, name]):
        return jsonify({"msg": "Missing required fields"}), 400
        
    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "Email already registered"}), 409
        
    try:
        new_user = User(
            email=email,
            password=generate_password_hash(password, method='pbkdf2:sha256'),
            role='Company',
            is_active=True
        )
        db.session.add(new_user)
        db.session.flush() # To get the user ID
        
        new_company = Company(
            user_id=new_user.id,
            name=name,
            approval_status='Pending'
        )
        db.session.add(new_company)
        db.session.commit()
        
        return jsonify({"msg": "Company registered successfully. Pending admin approval."}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": str(e)}), 500
