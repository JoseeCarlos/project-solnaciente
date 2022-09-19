from sre_parse import CATEGORIES
from flask import Blueprint, jsonify, request
from models.Role import RoleModel
from models.entities.Role import Role

main = Blueprint('role_blueprint', __name__)

@main.route('/')
def get_roles():
    try:
        roles = RoleModel.get_roles()
        return jsonify(roles)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@main.route('/<id>')
def get_role(id):
    try:
        print(id)
        role = RoleModel.get_role(str(id))
        if role is None:
            return jsonify({'error': 'Role not found'}), 404
        return jsonify(role)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@main.route('/add', methods=['POST'])
def add_role():
    try:
        name = request.json['name']
        role = Role(name)
        affected_rows = RoleModel.add_role(role)
        if affected_rows == 1:
            return jsonify(role.id)
        else:
            return jsonify({'error': 'Role not added'}), 500

    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@main.route('/delete/<id>', methods=['DELETE'])
def delete_role(id):
    try:
        role = Role(str(id))
        affected_rows = RoleModel.delete_role(role)
        if affected_rows == 1:
            return jsonify(role.id)
        else:
            return jsonify({'error': 'Role not deleted'}), 404

    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@main.route('/update/<id>', methods=['PUT'])
def update_role(id):
    try:
        name = request.json['name']
        role = Role(str(id), name)
        affected_rows = RoleModel.update_role(role)
        if affected_rows == 1:
            return jsonify(role.id)
        else:
            return jsonify({'error': 'Role not updated'}), 404

    except Exception as ex:
        return jsonify({'error': str(ex)}), 500
