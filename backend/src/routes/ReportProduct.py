from flask import Blueprint, jsonify, request
from models.ReportModel import ReportModel
from models.entities.ReportProduct import ReportProduct

main = Blueprint('report_blueprint', __name__)

@main.route('/product')
def get_report_product():
    try:
        report = ReportModel.get_report_product()
        return jsonify(report)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

        

