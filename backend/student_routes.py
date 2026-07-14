from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import User, Student, Company, PlacementDrive, Application, Placement
from database import db
import json
import os
from werkzeug.utils import secure_filename
from datetime import datetime

student_bp = Blueprint('student', __name__)

@student_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    try:
        current_user = json.loads(get_jwt_identity())
    except:
        return jsonify({"msg": "Invalid token payload"}), 422
        
    if current_user.get('role') != 'Student':
        return jsonify({"msg": "Unauthorized"}), 403
        
    student = Student.query.filter_by(user_id=current_user.get('id')).first()
    if not student:
        return jsonify({"msg": "Student profile not found"}), 404
        
    return jsonify({
        "name": student.name,
        "branch": student.branch,
        "cgpa": student.cgpa,
        "year_of_passing": student.year_of_passing,
        "skills": student.skills,
        "resume_url": student.resume_url,
        "phone": student.phone,
        "education": student.education,
        "experience": student.experience,
        "achievements": student.achievements,
        "email": current_user.get('email')
    }), 200

@student_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    try:
        current_user = json.loads(get_jwt_identity())
    except:
        return jsonify({"msg": "Invalid token payload"}), 422
        
    if current_user.get('role') != 'Student':
        return jsonify({"msg": "Unauthorized"}), 403
        
    student = Student.query.filter_by(user_id=current_user.get('id')).first()
    if not student:
        return jsonify({"msg": "Student profile not found"}), 404
        
    data = request.get_json()
    
    student.name = data.get('name', student.name)
    student.branch = data.get('branch', student.branch)
    student.cgpa = data.get('cgpa', student.cgpa)
    student.year_of_passing = data.get('year_of_passing', student.year_of_passing)
    student.skills = data.get('skills', student.skills)
    student.resume_url = data.get('resume_url', student.resume_url)
    student.phone = data.get('phone', student.phone)
    student.education = data.get('education', student.education)
    student.experience = data.get('experience', student.experience)
    student.achievements = data.get('achievements', student.achievements)
    
    try:
        db.session.commit()
        return jsonify({"msg": "Profile updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": str(e)}), 500

@student_bp.route('/upload_resume', methods=['POST'])
@jwt_required()
def upload_resume():
    try:
        current_user = json.loads(get_jwt_identity())
    except:
        return jsonify({"msg": "Invalid token payload"}), 422
        
    if current_user.get('role') != 'Student':
        return jsonify({"msg": "Unauthorized"}), 403
        
    if 'file' not in request.files:
        return jsonify({"msg": "No file part"}), 400
        
    file = request.files['file']
    if file.filename == '':
        return jsonify({"msg": "No selected file"}), 400
        
    if file and file.filename.endswith('.pdf'):
        try:
            student = Student.query.filter_by(user_id=current_user.get('id')).first()
            if not student:
                return jsonify({"msg": "Student profile not found"}), 404
                
            filename = secure_filename(file.filename)
            unique_filename = f"{student.id}_{student.name.replace(' ', '_')}_{filename}"
            
            basedir = os.path.abspath(os.path.dirname(__file__))
            resume_dir = os.path.join(basedir, 'data', 'resumes')
            os.makedirs(resume_dir, exist_ok=True)
            
            file_path = os.path.join(resume_dir, unique_filename)
            file.save(file_path)
            
            resume_url = f"/uploads/{unique_filename}"
            student.resume_url = resume_url
            db.session.commit()
            
            return jsonify({
                "msg": "Resume uploaded successfully",
                "resume_url": resume_url
            }), 200
            
        except Exception as e:
            db.session.rollback()
            return jsonify({"msg": f"Failed to save resume: {str(e)}"}), 500
    else:
        return jsonify({"msg": "Only PDF files are supported"}), 400

@student_bp.route('/jobs', methods=['GET'])
@jwt_required()
def get_jobs():
    try:
        current_user = json.loads(get_jwt_identity())
    except:
        return jsonify({"msg": "Invalid token payload"}), 422
        
    if current_user.get('role') != 'Student':
        return jsonify({"msg": "Unauthorized"}), 403
        
    # Get active drives (Approved and not past deadline)
    now = datetime.utcnow()
    drives = PlacementDrive.query.filter(PlacementDrive.status == 'Approved').all()
    
    # Filter out drives past deadline if deadline is set and company is approved
    valid_drives = []
    for d in drives:
        company = Company.query.get(d.company_id)
        if company and company.approval_status == 'Approved':
            if not d.application_deadline or d.application_deadline >= now:
                valid_drives.append(d)
            
    # Serialize
    result = []
    for drive in valid_drives:
        company = Company.query.get(drive.company_id)
        result.append({
            "id": drive.id,
            "title": drive.title,
            "company": company.name,
            "location": company.location,
            "salary": drive.salary,
            "skills_required": drive.skills_required,
            "description": drive.description,
            "application_deadline": drive.application_deadline.isoformat() if drive.application_deadline else None
        })
        
    return jsonify(result), 200

@student_bp.route('/jobs/<int:drive_id>/apply', methods=['POST'])
@jwt_required()
def apply_job(drive_id):
    try:
        current_user = json.loads(get_jwt_identity())
    except:
        return jsonify({"msg": "Invalid token payload"}), 422
        
    if current_user.get('role') != 'Student':
        return jsonify({"msg": "Unauthorized"}), 403
        
    student = Student.query.filter_by(user_id=current_user.get('id')).first()
    
    # Check drive and company approval
    drive = PlacementDrive.query.get(drive_id)
    if not drive or drive.status != 'Approved':
        return jsonify({"msg": "This job is not available for applications"}), 400
        
    company = Company.query.get(drive.company_id)
    if not company or company.approval_status != 'Approved':
        return jsonify({"msg": "This company is not approved to accept applications"}), 400

    # Check if already applied
    existing_app = Application.query.filter_by(student_id=student.id, drive_id=drive_id).first()
    if existing_app:
        return jsonify({"msg": "You have already applied for this job"}), 400
        
    data = request.get_json() or {}
    resume_url = data.get('resume_url', student.resume_url)
        
    try:
        new_app = Application(
            student_id=student.id,
            drive_id=drive_id,
            status='Applied',
            resume_url=resume_url
        )
        db.session.add(new_app)
        db.session.flush()
        new_app.custom_id = f"APP-{4000 + new_app.id}"
        db.session.commit()
        return jsonify({"msg": "Application submitted successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": str(e)}), 500

@student_bp.route('/applications', methods=['GET'])
@jwt_required()
def get_applications():
    try:
        current_user = json.loads(get_jwt_identity())
    except:
        return jsonify({"msg": "Invalid token payload"}), 422
        
    if current_user.get('role') != 'Student':
        return jsonify({"msg": "Unauthorized"}), 403
        
    student = Student.query.filter_by(user_id=current_user.get('id')).first()
    apps = Application.query.filter_by(student_id=student.id).all()
    
    result = []
    for app in apps:
        drive = PlacementDrive.query.get(app.drive_id)
        company = Company.query.get(drive.company_id)
        result.append({
            "id": app.id,
            "custom_id": app.custom_id,
            "drive_id": drive.id,
            "drive_title": drive.title,
            "company": company.name,
            "status": app.status,
            "resume_url": app.resume_url,
            "application_date": app.application_date.isoformat() if app.application_date else None,
            "interview_date": app.interview_date.isoformat() if app.interview_date else None,
            "feedback": app.feedback
        })
        
    return jsonify(result), 200

@student_bp.route('/placements', methods=['GET'])
@jwt_required()
def get_placements():
    try:
        current_user = json.loads(get_jwt_identity())
    except:
        return jsonify({"msg": "Invalid token payload"}), 422
        
    if current_user.get('role') != 'Student':
        return jsonify({"msg": "Unauthorized"}), 403
        
    student = Student.query.filter_by(user_id=current_user.get('id')).first()
    placements = Placement.query.filter_by(student_id=student.id).all()
    
    result = []
    for placement in placements:
        company = Company.query.get(placement.company_id)
        result.append({
            "id": placement.id,
            "company": company.name,
            "position": placement.position,
            "salary": placement.salary,
            "joining_date": placement.joining_date.isoformat() if placement.joining_date else None
        })
        
    return jsonify(result), 200
