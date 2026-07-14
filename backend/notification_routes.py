from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Notification, User
from database import db
import json

notification_bp = Blueprint('notification', __name__)

def get_current_user(identity_str):
    try:
        identity = json.loads(identity_str)
        user = User.query.get(identity.get('id'))
        return user
    except:
        return None

@notification_bp.route('/', methods=['GET'])
@jwt_required()
def get_notifications():
    user = get_current_user(get_jwt_identity())
    if not user:
        return jsonify({"msg": "Unauthorized"}), 403
        
    notifications = Notification.query.filter_by(user_id=user.id).order_by(Notification.created_at.desc()).all()
    result = []
    for n in notifications:
        result.append({
            "id": n.id,
            "message": n.message,
            "is_read": n.is_read,
            "action_url": n.action_url,
            "created_at": n.created_at.isoformat()
        })
        
    return jsonify(result), 200

@notification_bp.route('/<int:notif_id>/read', methods=['PUT'])
@jwt_required()
def mark_read(notif_id):
    user = get_current_user(get_jwt_identity())
    if not user:
        return jsonify({"msg": "Unauthorized"}), 403
        
    notif = Notification.query.filter_by(id=notif_id, user_id=user.id).first()
    if not notif:
        return jsonify({"msg": "Notification not found"}), 404
        
    notif.is_read = True
    db.session.commit()
    
    return jsonify({"msg": "Marked as read"}), 200

@notification_bp.route('/read_all', methods=['PUT'])
@jwt_required()
def mark_all_read():
    user = get_current_user(get_jwt_identity())
    if not user:
        return jsonify({"msg": "Unauthorized"}), 403
        
    Notification.query.filter_by(user_id=user.id, is_read=False).update({"is_read": True})
    db.session.commit()
    
    return jsonify({"msg": "All marked as read"}), 200

@notification_bp.route('/clear_all', methods=['DELETE'])
@jwt_required()
def clear_all():
    user = get_current_user(get_jwt_identity())
    if not user:
        return jsonify({"msg": "Unauthorized"}), 403
        
    Notification.query.filter_by(user_id=user.id).delete()
    db.session.commit()
    
    return jsonify({"msg": "All notifications cleared"}), 200
