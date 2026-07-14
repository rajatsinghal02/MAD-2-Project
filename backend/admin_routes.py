from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import User, Student, Company, PlacementDrive, Application, Placement
from database import db
import json

admin_bp = Blueprint('admin', __name__)

def is_admin(identity_str):
    try:
        identity = json.loads(identity_str)
        return identity.get('role') == 'Admin'
    except:
        return False

@admin_bp.route('/stats', methods=['GET'])
@jwt_required()
def get_stats():
    if not is_admin(get_jwt_identity()):
        return jsonify({"msg": "Unauthorized"}), 403
        
    total_students = Student.query.count()
    total_companies = Company.query.count()
    total_jobs = PlacementDrive.query.count()
    total_applications = Application.query.count()
    
    return jsonify({
        "students": total_students,
        "companies": total_companies,
        "jobs": total_jobs,
        "applications": total_applications
    }), 200

# --- COMPANIES ---

@admin_bp.route('/companies', methods=['GET'])
@jwt_required()
def get_companies():
    if not is_admin(get_jwt_identity()):
        return jsonify({"msg": "Unauthorized"}), 403
        
    companies = Company.query.all()
    result = []
    for c in companies:
        user = User.query.get(c.user_id)
        result.append({
            "id": c.id,
            "name": c.name,
            "industry": c.industry,
            "location": c.location,
            "approval_status": c.approval_status,
            "email": user.email if user else None,
            "is_active": user.is_active if user else False,
            "created_at": user.created_at.isoformat() if user and user.created_at else None
        })
    return jsonify(result), 200

@admin_bp.route('/companies/<int:company_id>/status', methods=['PUT'])
@jwt_required()
def update_company_status(company_id):
    if not is_admin(get_jwt_identity()):
        return jsonify({"msg": "Unauthorized"}), 403
        
    data = request.get_json()
    status = data.get('status') # 'Approved', 'Rejected', 'Deactivated', 'Pending'
    
    company = Company.query.get(company_id)
    if not company:
        return jsonify({"msg": "Company not found"}), 404
        
    if status:
        company.approval_status = status
        # If deactivated/rejected, we might also want to disable the user login
        user = User.query.get(company.user_id)
        if status in ['Deactivated', 'Rejected']:
            user.is_active = False
        elif status == 'Approved':
            user.is_active = True
            
        try:
            db.session.commit()
            return jsonify({"msg": f"Company status updated to {status}"}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({"msg": str(e)}), 500
    
    return jsonify({"msg": "Missing status"}), 400

@admin_bp.route('/companies/<int:company_id>', methods=['DELETE'])
@jwt_required()
def delete_company(company_id):
    if not is_admin(get_jwt_identity()):
        return jsonify({"msg": "Unauthorized"}), 403
        
    company = Company.query.get(company_id)
    if not company:
        return jsonify({"msg": "Company not found"}), 404
        
    user = User.query.get(company.user_id)
    
    try:
        # Note: In a real prod app, you should cascade delete or handle orphaned drives.
        # SQLite with SQLAlchemy defaults might not cascade properly without setup, 
        # so we manually delete dependent drives
        drives = PlacementDrive.query.filter_by(company_id=company_id).all()
        for d in drives:
            # Delete applications for this drive
            Application.query.filter_by(drive_id=d.id).delete()
            db.session.delete(d)
            
        db.session.delete(company)
        if user:
            db.session.delete(user)
            
        db.session.commit()
        return jsonify({"msg": "Company removed successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": str(e)}), 500


# --- STUDENTS ---

@admin_bp.route('/students', methods=['GET'])
@jwt_required()
def get_students():
    if not is_admin(get_jwt_identity()):
        return jsonify({"msg": "Unauthorized"}), 403
        
    students = Student.query.all()
    result = []
    for s in students:
        user = User.query.get(s.user_id)
        result.append({
            "id": s.id,
            "name": s.name,
            "branch": s.branch,
            "cgpa": s.cgpa,
            "email": user.email if user else None,
            "is_active": user.is_active if user else False,
            "created_at": user.created_at.isoformat() if user and user.created_at else None
        })
    return jsonify(result), 200

@admin_bp.route('/students/<int:student_id>/status', methods=['PUT'])
@jwt_required()
def update_student_status(student_id):
    if not is_admin(get_jwt_identity()):
        return jsonify({"msg": "Unauthorized"}), 403
        
    data = request.get_json()
    is_active = data.get('is_active') # True or False
    
    student = Student.query.get(student_id)
    if not student:
        return jsonify({"msg": "Student not found"}), 404
        
    user = User.query.get(student.user_id)
    if user:
        user.is_active = is_active
        try:
            db.session.commit()
            return jsonify({"msg": "Student status updated"}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({"msg": str(e)}), 500
            
    return jsonify({"msg": "User not found"}), 404

@admin_bp.route('/students/<int:student_id>', methods=['DELETE'])
@jwt_required()
def delete_student(student_id):
    if not is_admin(get_jwt_identity()):
        return jsonify({"msg": "Unauthorized"}), 403
        
    student = Student.query.get(student_id)
    if not student:
        return jsonify({"msg": "Student not found"}), 404
        
    user = User.query.get(student.user_id)
    
    try:
        # Delete related applications
        Application.query.filter_by(student_id=student_id).delete()
        
        db.session.delete(student)
        if user:
            db.session.delete(user)
            
        db.session.commit()
        return jsonify({"msg": "Student removed successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": str(e)}), 500


# --- JOBS ---

@admin_bp.route('/jobs', methods=['GET'])
@jwt_required()
def get_jobs():
    if not is_admin(get_jwt_identity()):
        return jsonify({"msg": "Unauthorized"}), 403
        
    drives = PlacementDrive.query.all()
    result = []
    for d in drives:
        company = Company.query.get(d.company_id)
        result.append({
            "id": d.id,
            "title": d.title,
            "company": company.name if company else "Unknown",
            "status": d.status,
            "application_deadline": d.application_deadline.isoformat() if d.application_deadline else None
        })
    return jsonify(result), 200

@admin_bp.route('/jobs/<int:drive_id>/status', methods=['PUT'])
@jwt_required()
def update_job_status(drive_id):
    if not is_admin(get_jwt_identity()):
        return jsonify({"msg": "Unauthorized"}), 403
        
    data = request.get_json()
    status = data.get('status') # 'Approved', 'Pending', 'Closed', 'Rejected'
    
    drive = PlacementDrive.query.get(drive_id)
    if not drive:
        return jsonify({"msg": "Drive not found"}), 404
        
    drive.status = status
    try:
        db.session.commit()
        return jsonify({"msg": f"Job status updated to {status}"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": str(e)}), 500

@admin_bp.route('/jobs/<int:drive_id>', methods=['DELETE'])
@jwt_required()
def delete_job(drive_id):
    if not is_admin(get_jwt_identity()):
        return jsonify({"msg": "Unauthorized"}), 403
        
    drive = PlacementDrive.query.get(drive_id)
    if not drive:
        return jsonify({"msg": "Drive not found"}), 404
        
    try:
        # Delete associated applications
        Application.query.filter_by(drive_id=drive_id).delete()
        db.session.delete(drive)
        db.session.commit()
        return jsonify({"msg": "Job posting removed successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": str(e)}), 500


# --- APPLICATIONS ---

@admin_bp.route('/applications', methods=['GET'])
@jwt_required()
def get_applications():
    if not is_admin(get_jwt_identity()):
        return jsonify({"msg": "Unauthorized"}), 403
        
    apps = Application.query.all()
    result = []
    for app in apps:
        student = Student.query.get(app.student_id)
        drive = PlacementDrive.query.get(app.drive_id)
        company = Company.query.get(drive.company_id) if drive else None
        
        result.append({
            "id": app.id,
            "student_name": student.name if student else "Unknown",
            "job_title": drive.title if drive else "Unknown",
            "company_name": company.name if company else "Unknown",
            "status": app.status,
            "application_date": app.application_date.isoformat() if app.application_date else None
        })
        
    return jsonify(result), 200
