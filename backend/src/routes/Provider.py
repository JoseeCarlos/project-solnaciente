from sre_parse import CATEGORIES
from flask import Blueprint, jsonify, request
from models.ProviderModel import ProviderModel
from models.entities.Provider import Provider

main = Blueprint('provider_blueprint', __name__)

@main.route('/')
def get_providers():
    try:
        providers = ProviderModel.get_providers()
        return jsonify(providers)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@main.route('/<id>')
def get_provider(id):
    try:
        print(id)
        provider = ProviderModel.get_provider(str(id))
        if provider is None:
            return jsonify({'error': 'Provider not found'}), 404
        return jsonify(provider)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@main.route('/add', methods=['POST'])
def add_provider():
    try:
        provider = Provider(name=request.json['name'], description=request.json['description'], direction=request.json['direction'], phone=request.json['phone'], updated_at=request.json['updated_at'])
        affected_rows = ProviderModel.add_provider(provider)
        if affected_rows == 0:
            return jsonify({'error': 'Provider not added'}), 500
        return jsonify({'message': 'Provider added'}), 201

    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@main.route('/delete/<id>', methods=['DELETE'])
def delete_provider(id):
    try:
        provider = Provider(idProvider=str(id))
        affected_rows = ProviderModel.delete_provider(provider)
        if affected_rows == 0:
            return jsonify({'error': 'Provider not deleted'}), 404
        return jsonify({'message': 'Provider deleted'}), 200

    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@main.route('/update/<id>', methods=['PUT'])
def update_provider(id):
    try:
        provider = Provider(idProvider=id, name=request.json['name'], description=request.json['description'], direction=request.json['direction'], phone=request.json['phone'], updated_at=request.json['updated_at'])
        affected_rows = ProviderModel.update_provider(provider)
        if affected_rows == 0:
            return jsonify({'error': 'Provider not updated'}), 500
        return jsonify({'message': 'Provider updated'}), 201 

    except Exception as ex:
        return jsonify({'error': str(ex)}), 500
