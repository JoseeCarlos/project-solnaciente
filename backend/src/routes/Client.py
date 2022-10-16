from flask import Blueprint, jsonify, request
from models.ClientModel import ClientModel
from models.entities.Client import Client

main = Blueprint('client_blueprint', __name__)

@main.route('/')
def get_clients():
    try:
        clients = ClientModel.get_clients()
        return jsonify(clients)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@main.route('/<int:id>')
def get_client(id):
    try:
        client = ClientModel.get_client(id)
        if client is None:
            return jsonify({'error': 'Client not found'}), 404
        return jsonify(client)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@main.route('/add', methods=['POST'])
def add_client():
    try:
        client = Client(name=request.json['name'], phone=request.json['phone'], ci=request.json['ci'], updated_at=request.json['updated_at'])
        affected_rows = ClientModel.add_client(client)
        if affected_rows == 0:
            return jsonify({'error': 'Client not added'}), 500
        return jsonify({'success': 'Client added successfully'}), 200
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@main.route('/delete/<id>', methods=['DELETE'])
def delete_client(id):
    try:
        client = Client(idclient=id)
        affected_rows = ClientModel.delete_client(client)
        if affected_rows == 0:
            return jsonify({'error': 'Client not deleted'}), 500
        return jsonify({'success': 'Client deleted successfully'}), 200

    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@main.route('/update/<id>', methods=['PUT'])
def update_client(id):
    try:
        client = Client(idclient=id, name=request.json['name'], phone=request.json['phone'], ci=request.json['ci'], updated_at=request.json['updated_at'])
        affected_rows = ClientModel.update_client(client)
        if affected_rows == 0:
            return jsonify({'error': 'Client not updated'}), 500
        return jsonify({'success': 'Client updated successfully'}), 200

    except Exception as ex:
        return jsonify({'error': str(ex)}), 500
