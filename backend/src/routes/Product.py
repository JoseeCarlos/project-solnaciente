from sre_parse import CATEGORIES
from flask import Blueprint, jsonify, request
from models.ProductModel import ProductModel
from models.entities.Product import Product
import uuid


main = Blueprint('category_blueprint', __name__)

@main.route('/')
def get_products():
    try:
        products = ProductModel.get_products()
        return jsonify(products)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@main.route('/<id>')
def get_product(id):
    try:
        print(id)
        product = ProductModel.get_product(str(id))
        if product is None:
            return jsonify({'error': 'Product not found'}), 404
        return jsonify(product)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@main.route('/add', methods=['POST'])
def add_product():
    try:
        name = request.json['name']
        price = float(request.json['price'])
        category = request.json['category']
        product = Product(str(uuid.uuid4()), name, price, category)
        affected_rows = ProductModel.add_product(product)
        if affected_rows == 1:
            return jsonify(product.id)
        else:
            return jsonify({'error': 'Product not added'}), 500

    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@main.route('/delete/<id>', methods=['DELETE'])
def delete_product(id):
    try:
        product = Product(str(id))
        affected_rows = ProductModel.delete_product(product)
        if affected_rows == 1:
            return jsonify(product.id)
        else:
            return jsonify({'error': 'Product not deleted'}), 404

    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@main.route('/update/<id>', methods=['PUT'])
def update_product(id):
    try:
        name = request.json['name']
        price = float(request.json['price'])
        category = request.json['category']
        product = Product(str(id), name, price, category)
        affected_rows = ProductModel.update_product(product)
        if affected_rows == 1:
            return jsonify(product.id)
        else:
            return jsonify({'error': 'Product not updated'}), 404

    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

    