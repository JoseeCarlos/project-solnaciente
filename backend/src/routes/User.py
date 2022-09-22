from pydoc import describe
from sre_parse import CATEGORIES
from flask import Blueprint, jsonify, request
from models.UserModel import UserModel 
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
        user = User(name=request.json['name'],first_name=request.json['first_name'], second_name=request.json['second_name'], ci=request.json['ci'], number=request.json['number'], username= request.json['username'], password=request.json['password'], updated_at=request.json['updated_at'], idrole=request.json['idrole'])
        affected_rows = UserModel.add_user(user)
        if affected_rows == 0:
            return jsonify({'error': 'User not added'}), 500
        return jsonify({'message': 'User added'}), 201

    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@main.route('/delete/<id>', methods=['DELETE'])
def delete_user(id):
    try:
        user = User(iduser=str(id))
        affected_rows = UserModel.delete_user(user)
        if affected_rows == 0:
            return jsonify({'error': 'User not deleted'}), 404
        return jsonify({'message': 'User deleted'}), 200

    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@main.route('/update/<id>', methods=['PUT'])
def update_user(id):
    try:
        user = User(iduser=str(id), name=request.json['name'],first_name=request.json['first_name'], second_name=request.json['second_name'], ci=request.json['ci'], number=request.json['number'], username= request.json['username'], password=request.json['password'], updated_at=request.json['updated_at'], idrole=request.json['idrole'])
        affected_rows = UserModel.update_user(user)
        if affected_rows == 0:
            return jsonify({'error': 'User not updated'}), 500
        return jsonify({'message': 'User updated'}), 201

    except Exception as ex:
        return jsonify({'error': str(ex)}), 500
