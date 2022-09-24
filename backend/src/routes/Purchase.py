from sre_parse import CATEGORIES
from flask import Blueprint, jsonify, request
from models.PurchaseModel import PurchaseModel
from models.entities.Purchase import Purchase
from models.entities.PurchaseDetail import PurchaseDetail
from models.entities.Product import Product

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
        purchase = Purchase(total_quantity=request.json['total_quantity'], total_price=request.json['total_price'], purchase_date=request.json['purchase_date'],update_at=request.json['updated_at'],idUser=request.json['iduser'],idProvider=request.json['idprovider'])
        purchaseDetail = PurchaseDetail(quantity=request.json['quantity'], price=request.json['price'], product_id=request.json['idproduct'], purchase_id=request.json['idpurchase'])
        product = Product(idProduct=request.json['idproduct'], price_in=request.json['price'])
        affected_rows = PurchaseModel.add_purchase(purchase, purchaseDetail, product)
        if affected_rows == 0:
            return jsonify({'error': 'Provider not added'}), 500
        return jsonify({'message': 'Purchase added'}), 201
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
        
