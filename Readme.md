# Placement Portal Application – V2

A web app for managing campus recruitment, built for *Modern Application Development II (IITM BS)*.

## About

Replaces manual placement coordination (spreadsheets/email) with a role-based portal for three users:

•⁠  ⁠*Admin* – pre-created superuser; approves/rejects companies and placement drives, manages/blacklists students and companies, views statistics.
•⁠  ⁠*Company* – registers profile; after admin approval, posts placement drives, views applicants, shortlists/rejects, schedules interviews, updates selection status.
•⁠  ⁠*Student* – self-registers; maintains profile with skills/resume, applies to approved drives (no duplicates, eligibility-checked), tracks application status and placement history.

## Tech Stack

| Layer | Tech |
|---|---|
| Backend API | Flask |
| Frontend UI | Vue.js + Bootstrap |
| Database | SQLite (programmatically created) |
| Caching | Redis |
| Async / Batch Jobs | Celery + Redis |

## Features

•⁠  ⁠JWT / Flask-Security role-based auth (Admin / Company / Student)
•⁠  ⁠Admin approval workflow for companies and drives
•⁠  ⁠Application status flow: Applied → Shortlisted → Interview → Selected / Rejected
•⁠  ⁠Scheduled jobs: daily reminders, monthly admin report (HTML/PDF via email)
•⁠  ⁠User-triggered async CSV export of placement history
•⁠  ⁠Redis caching with expiry on high-traffic endpoints

## How to Run

	⁠Setup instructions will be added as milestones are completed.

## Milestone Progress

•⁠  ⁠[x] Milestone 0: GitHub Repository Setup
•⁠  ⁠[ ] Database Models & Schema
•⁠  ⁠[ ] Authentication & Role-Based Access
•⁠  ⁠[ ] Admin Dashboard
•⁠  ⁠[ ] Company Dashboard
•⁠  ⁠[ ] Student Dashboard
•⁠  ⁠[ ] Application History & Status Tracking
•⁠  ⁠[ ] Celery + Redis Batch Jobs
•⁠  ⁠[ ] Redis Caching & API Optimization

## Author

Navya | IITM BS – Modern Application Development II