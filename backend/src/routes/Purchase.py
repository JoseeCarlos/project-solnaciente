from sre_parse import CATEGORIES
from flask import Blueprint, jsonify, request
from models.PurchaseModel import PurchaseModel
from models.entities.Purchase import Purchase

main = Blueprint('purchase_blueprint', __name__)

@main.route('/')
def get_purchases():
    try:
        purchases = PurchaseModel.get_purchases()
        return jsonify(purchases)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@main.route('/<id>')
def get_purchase(id):
    try:
        print(id)
        purchase = PurchaseModel.get_purchase(str(id))
        if purchase is None:
            return jsonify({'error': 'Purchase not found'}), 404
        return jsonify(purchase)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@main.route('/add', methods=['POST'])
def add_purchase():
    try:
        date = request.json['date']
        total = request.json['total']
        purchase = Purchase(date, total)
        affected_rows = PurchaseModel.add_purchase(purchase)
        if affected_rows == 1:
            return jsonify(purchase.id)
        else:
            return jsonify({'error': 'Purchase not added'}), 500

    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@main.route('/delete/<id>', methods=['DELETE'])
def delete_purchase(id):
    try:
        purchase = Purchase(str(id))
        affected_rows = PurchaseModel.delete_purchase(purchase)
        if affected_rows == 1:
            return jsonify(purchase.id)
        else:
            return jsonify({'error': 'Purchase not deleted'}), 404

    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@main.route('/update/<id>', methods=['PUT'])
def update_purchase(id):
    try:
        date = request.json['date']
        total = request.json['total']
        purchase = Purchase(str(id), date, total)
        affected_rows = PurchaseModel.update_purchase(purchase)
        if affected_rows == 1:
            return jsonify(purchase.id)
        else:
            return jsonify({'error': 'Purchase not updated'}), 404

    except Exception as ex:
        return jsonify({'error': str(ex)}), 500
        
