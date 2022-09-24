from sre_parse import CATEGORIES
from flask import Blueprint, jsonify, request
from models.CategoryModel import CategoryModel
from models.entities.Category import Category
import uuid

main = Blueprint('category_blueprint', __name__)

@main.route('/')
def get_category():
    try:
        categories = CategoryModel.get_category()
        return jsonify(categories)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@main.route('/<int:id>')
def get_categories(id):
    try:
        category = CategoryModel.get_categories(id)
        if category is None:
            return jsonify({'error': 'Category not found'}), 404
        return jsonify(category)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@main.route('/add', methods=['POST'])
def add_category():
    try:
        category = Category(image=request.json['image'], name=request.json['name'], description=request.json['description'], updated_at=request.json['updated_at'])
        affected_rows = CategoryModel.add_category(category)
        if affected_rows == 0:
            return jsonify({'error': 'Category not added'}), 500
        return jsonify({'success': 'Category added successfully'}), 200
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@main.route('/delete/<id>', methods=['DELETE'])
def delete_category(id):
    try:
        category = Category(idcategory=id)
        affected_rows = CategoryModel.delete_category(category)
        if affected_rows == 0:
            return jsonify({'error': 'Category not deleted'}), 500
        return jsonify({'success': 'Category deleted successfully'}), 200

    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@main.route('/update/<id>', methods=['PUT'])
def update_category(id):
    try:
        category = Category(idcategory=id, image=request.json['image'], name=request.json['name'], description=request.json['description'], updated_at=request.json['updated_at'])
        affected_rows = CategoryModel.update_category(category)
        if affected_rows == 0:
            return jsonify({'error': 'Category not updated'}), 500
        return jsonify({'success': 'Category updated successfully'}), 200

    except Exception as ex:
        return jsonify({'error': str(ex)}), 500
    