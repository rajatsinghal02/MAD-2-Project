from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import User, Company, PlacementDrive, Application, Student, Placement
from database import db
from datetime import datetime
import json

company_bp = Blueprint('company', __name__)

def get_current_company(identity_str):
    try:
        identity = json.loads(identity_str)
        if identity.get('role') != 'Company':
            return None
        user_id = identity.get('id')
        return Company.query.filter_by(user_id=user_id).first()
    except:
        return None

# --- PROFILE ---
@company_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    company = get_current_company(get_jwt_identity())
    if not company:
        return jsonify({"msg": "Unauthorized or company not found"}), 403
        
    user = User.query.get(company.user_id)
    return jsonify({
        "name": company.name,
        "industry": company.industry,
        "location": company.location,
        "description": company.description,
        "approval_status": company.approval_status,
        "email": user.email if user else None
    }), 200

@company_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    company = get_current_company(get_jwt_identity())
    if not company:
        return jsonify({"msg": "Unauthorized"}), 403
        
    data = request.get_json()
    company.name = data.get('name', company.name)
    company.industry = data.get('industry', company.industry)
    company.location = data.get('location', company.location)
    company.description = data.get('description', company.description)
    
    try:
        db.session.commit()
        return jsonify({"msg": "Profile updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": str(e)}), 500

# --- JOBS (PLACEMENT DRIVES) ---
@company_bp.route('/jobs', methods=['GET'])
@jwt_required()
def get_jobs():
    company = get_current_company(get_jwt_identity())
    if not company:
        return jsonify({"msg": "Unauthorized"}), 403
        
    drives = PlacementDrive.query.filter_by(company_id=company.id).all()
    result = []
    for d in drives:
        # Get application count
        app_count = Application.query.filter_by(drive_id=d.id).count()
        result.append({
            "id": d.id,
            "title": d.title,
            "description": d.description,
            "salary": d.salary,
            "skills_required": d.skills_required,
            "application_deadline": d.application_deadline.isoformat() if d.application_deadline else None,
            "status": d.status,
            "application_count": app_count
        })
    return jsonify(result), 200

@company_bp.route('/jobs', methods=['POST'])
@jwt_required()
def create_job():
    company = get_current_company(get_jwt_identity())
    if not company:
        return jsonify({"msg": "Unauthorized"}), 403
        
    if company.approval_status != 'Approved':
        return jsonify({"msg": "Your company profile must be approved by an Admin to post jobs."}), 403
        
    data = request.get_json()
    title = data.get('title')
    description = data.get('description')
    salary = data.get('salary')
    skills_required = data.get('skills_required')
    application_deadline_str = data.get('application_deadline')
    
    if not title:
        return jsonify({"msg": "Job title is required"}), 400
        
    deadline = None
    if application_deadline_str:
        try:
            deadline = datetime.fromisoformat(application_deadline_str)
        except:
            pass
            
    new_drive = PlacementDrive(
        company_id=company.id,
        title=title,
        description=description,
        salary=salary,
        skills_required=skills_required,
        application_deadline=deadline,
        status='Pending' # Default to pending admin approval
    )
    
    try:
        db.session.add(new_drive)
        db.session.flush()
        new_drive.custom_id = f"JOB-{3000 + new_drive.id}"
        db.session.commit()
        return jsonify({"msg": "Job created successfully. Pending Admin approval."}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": str(e)}), 500

@company_bp.route('/jobs/<int:drive_id>', methods=['PUT'])
@jwt_required()
def update_job(drive_id):
    company = get_current_company(get_jwt_identity())
    if not company:
        return jsonify({"msg": "Unauthorized"}), 403
        
    drive = PlacementDrive.query.filter_by(id=drive_id, company_id=company.id).first()
    if not drive:
        return jsonify({"msg": "Job not found"}), 404
        
    data = request.get_json()
    status = data.get('status')
    if status in ['Active', 'Closed']:
        # Only allow changing from Approved -> Closed, or Closed -> Active(Approved)
        # Assuming Active means 'Approved' in this model. Wait, the model uses 'Approved'.
        # We'll map 'Active' -> 'Approved' if it was already Approved, else keep it Pending.
        # Actually, let's just use 'Closed' if they want to stop applications.
        if status == 'Active':
             if drive.status == 'Closed':
                 drive.status = 'Approved' # Re-open
        elif status == 'Closed':
             drive.status = 'Closed'
             
    try:
        db.session.commit()
        return jsonify({"msg": "Job updated"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": str(e)}), 500

# --- APPLICATIONS / CANDIDATES ---
@company_bp.route('/jobs/<int:drive_id>/applications', methods=['GET'])
@jwt_required()
def get_applications(drive_id):
    company = get_current_company(get_jwt_identity())
    if not company:
        return jsonify({"msg": "Unauthorized"}), 403
        
    # Verify company owns the job
    drive = PlacementDrive.query.filter_by(id=drive_id, company_id=company.id).first()
    if not drive:
        return jsonify({"msg": "Job not found"}), 404
        
    apps = Application.query.filter_by(drive_id=drive_id).all()
    result = []
    for app in apps:
        student = Student.query.get(app.student_id)
        user = User.query.get(student.user_id) if student else None
        
        result.append({
            "application_id": app.id,
            "student_id": student.id,
            "student_name": student.name,
            "student_email": user.email if user else "",
            "student_branch": student.branch,
            "student_cgpa": student.cgpa,
            "student_skills": student.skills,
            "student_phone": student.phone,
            "student_education": student.education,
            "student_experience": student.experience,
            "student_achievements": student.achievements,
            "status": app.status,
            "resume_url": app.resume_url,
            "application_date": app.application_date.isoformat() if app.application_date else None,
            "interview_date": app.interview_date.isoformat() if app.interview_date else None,
            "feedback": app.feedback
        })
    return jsonify(result), 200

@company_bp.route('/applications/<int:app_id>/status', methods=['PUT'])
@jwt_required()
def update_application_status(app_id):
    company = get_current_company(get_jwt_identity())
    if not company:
        return jsonify({"msg": "Unauthorized"}), 403
        
    app = Application.query.get(app_id)
    if not app:
        return jsonify({"msg": "Application not found"}), 404
        
    # Verify ownership
    drive = PlacementDrive.query.filter_by(id=app.drive_id, company_id=company.id).first()
    if not drive:
        return jsonify({"msg": "Unauthorized to modify this application"}), 403
        
    data = request.get_json()
    status = data.get('status')
    feedback = data.get('feedback')
    interview_date_str = data.get('interview_date')
    
    if status:
        app.status = status
        if status == 'Placed':
            existing_placement = Placement.query.filter_by(student_id=app.student_id, company_id=company.id).first()
            if not existing_placement:
                new_placement = Placement(
                    student_id=app.student_id,
                    company_id=company.id,
                    position=drive.title,
                    salary=drive.salary
                )
                db.session.add(new_placement)
    if feedback is not None:
        app.feedback = feedback
    if interview_date_str:
        try:
            # HTML datetime-local inputs might not have seconds/timezone, but isoformat can parse them.
            # If Z is present, replace with +00:00 for older python compatibility
            interview_date_str = interview_date_str.replace('Z', '+00:00')
            app.interview_date = datetime.fromisoformat(interview_date_str)
        except:
            pass
            
    try:
        db.session.commit()
        return jsonify({"msg": "Application updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": str(e)}), 500
