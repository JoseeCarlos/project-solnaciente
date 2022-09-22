from sre_parse import CATEGORIES
from flask import Blueprint, jsonify, request
from models.BrandModel import BrandModel
from models.entities.Brand import Brand
import uuid

main = Blueprint('brand_blueprint', __name__)

@main.route('/')
def get_brands():
    try:
        brands = BrandModel.get_brand()
        return jsonify(brands)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@main.route('/<int:id>')
def get_brand(id):
    try:
        brand = BrandModel.get_brand(id)
        if brand is None:
            return jsonify({'error': 'Brand not found'}), 404
        return jsonify(brand)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@main.route('/add', methods=['POST'])
def add_brand():
    try:
        brand = Brand(name=request.json['name'], description=request.json['description'], updated_at=request.json['updated_at'])
        affected_rows = BrandModel.add_brand(brand)
        if affected_rows == 1:
            return jsonify({'success': 'Brand added successfully'}), 201
        else:
            return jsonify({'error': 'Brand not added'}), 500

    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@main.route('/delete/<id>', methods=['DELETE'])
def delete_brand(id):
    try:
        brand = Brand(id=id)
        affected_rows = BrandModel.delete_brand(brand)
        if affected_rows == 1:
            return jsonify({'success': 'Brand deleted successfully'}), 200
        else:
            return jsonify({'error': 'Brand not deleted'}), 500  

    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@main.route('/update/<id>', methods=['PUT'])
def update_brand(id):
    try:
        brand = Brand(id=id, name=request.json['name'], description=request.json['description'], updated_at=request.json['updated_at'])
        affected_rows = BrandModel.update_brand(brand)
        if affected_rows == 1:
            return jsonify({'success': 'Brand updated successfully'}), 200
        else:
            return jsonify({'error': 'Brand not updated'}), 500  

    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

        
