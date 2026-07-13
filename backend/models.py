from database import db
from datetime import datetime

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), nullable=False) # 'Admin', 'Company', 'Student'
    is_active = db.Column(db.Boolean, default=True)

class Company(db.Model):
    __tablename__ = 'companies'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    industry = db.Column(db.String(100), nullable=True)
    location = db.Column(db.String(150), nullable=True)
    description = db.Column(db.Text, nullable=True)
    hr_contact = db.Column(db.String(50), nullable=True)
    website = db.Column(db.String(150), nullable=True)
    approval_status = db.Column(db.String(20), default='Pending') # Pending, Approved, Rejected, Deactivated
    
    # Relationships
    user = db.relationship('User', backref=db.backref('company_profile', uselist=False))
    placement_drives = db.relationship('PlacementDrive', backref='company', lazy=True)

class Student(db.Model):
    __tablename__ = 'students'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    branch = db.Column(db.String(100), nullable=True)
    cgpa = db.Column(db.Float, nullable=True)
    year_of_passing = db.Column(db.Integer, nullable=True)
    skills = db.Column(db.String(255), nullable=True)
    resume_url = db.Column(db.String(255), nullable=True)
    
    # Relationships
    user = db.relationship('User', backref=db.backref('student_profile', uselist=False))
    applications = db.relationship('Application', backref='student', lazy=True)
    placements = db.relationship('Placement', backref='student', lazy=True)

class PlacementDrive(db.Model):
    __tablename__ = 'placement_drives'
    id = db.Column(db.Integer, primary_key=True)
    company_id = db.Column(db.Integer, db.ForeignKey('companies.id'), nullable=False)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=True)
    salary = db.Column(db.String(50), nullable=True)
    skills_required = db.Column(db.String(255), nullable=True)
    eligibility_branch = db.Column(db.String(150), nullable=True)
    eligibility_cgpa = db.Column(db.Float, nullable=True)
    eligibility_year = db.Column(db.Integer, nullable=True)
    application_deadline = db.Column(db.DateTime, nullable=True)
    status = db.Column(db.String(20), default='Pending') # Pending, Approved, Closed
    
    # Relationships
    applications = db.relationship('Application', backref='drive', lazy=True)

class Application(db.Model):
    __tablename__ = 'applications'
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), nullable=False)
    drive_id = db.Column(db.Integer, db.ForeignKey('placement_drives.id'), nullable=False)
    application_date = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(20), default='Applied') # Applied, Shortlisted, Selected, Rejected
    interview_date = db.Column(db.DateTime, nullable=True)
    feedback = db.Column(db.Text, nullable=True)

class Placement(db.Model):
    __tablename__ = 'placements'
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), nullable=False)
    company_id = db.Column(db.Integer, db.ForeignKey('companies.id'), nullable=False)
    position = db.Column(db.String(150), nullable=False)
    salary = db.Column(db.String(50), nullable=True)
    joining_date = db.Column(db.Date, nullable=True)
