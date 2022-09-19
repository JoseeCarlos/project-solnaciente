from sre_parse import CATEGORIES
from flask import Blueprint, jsonify, request
from models.User import UserModel
from models.entities.User import User

main = Blueprint('user_blueprint', __name__)

@main.route('/')
def get_users():
    try:
        users = UserModel.get_users()
        return jsonify(users)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@main.route('/<id>')
def get_user(id):
    try:
        print(id)
        user = UserModel.get_user(str(id))
        if user is None:
            return jsonify({'error': 'User not found'}), 404
        return jsonify(user)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@main.route('/add', methods=['POST'])
def add_user():
    try:
        name = request.json['name']
        phone = request.json['phone']
        email = request.json['email']
        password = request.json['password']
        role = request.json['role']
        user = User(name, phone, email, password, role)
        affected_rows = UserModel.add_user(user)
        if affected_rows == 1:
            return jsonify(user.id)
        else:
            return jsonify({'error': 'User not added'}), 500

    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@main.route('/delete/<id>', methods=['DELETE'])
def delete_user(id):
    try:
        user = User(str(id))
        affected_rows = UserModel.delete_user(user)
        if affected_rows == 1:
            return jsonify(user.id)
        else:
            return jsonify({'error': 'User not deleted'}), 404

    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@main.route('/update/<id>', methods=['PUT'])
def update_user(id):
    try:
        name = request.json['name']
        phone = request.json['phone']
        email = request.json['email']
        password = request.json['password']
        role = request.json['role']
        user = User(str(id), name, phone, email, password, role)
        affected_rows = UserModel.update_user(user)
        if affected_rows == 1:
            return jsonify(user.id)
        else:
            return jsonify({'error': 'User not updated'}), 404

    except Exception as ex:
        return jsonify({'error': str(ex)}), 500
