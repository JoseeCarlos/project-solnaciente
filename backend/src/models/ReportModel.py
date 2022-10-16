from sqlite3 import connect
from database.db import get_connection
from .entities.ReportProduct import ReportProduct

class ReportModel():
    
        @classmethod
        def get_report_product(self):
            try:
                connection = get_connection()
                report = []
                with connection.cursor() as cursor:
                    cursor.execute("""SELECT P.barcode, P.name, B.name, P.presentation, P.price_int, P.price_out, P.stock
                                        FROM db_solnaciente.product P
                                        INNER JOIN brand B on B.idbrand=p.idbrand
                                        WHERE P.is_active=1""")
                    for row in cursor.fetchall():
                        report.append(ReportProduct(row[0],row[1],row[2],row[3],row[4],row[5],row[6]).to_JSON())
                connection.close()
                return report
            except Exception as ex:
                raise Exception(ex)
    
      