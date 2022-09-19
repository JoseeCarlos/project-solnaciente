from sqlite3 import connect
from database.db import get_connection
from .entities.Purchase import Purchase



class PurchaseModel():
        
        @classmethod
        def get_purchases(self):
            try:
                connection = get_connection()
                purchases = []
                with connection.cursor() as cursor:
                    cursor.execute("SELECT * FROM purchase")
                    for row in cursor.fetchall():
                        purchases.append(Purchase(row[0],row[1],row[2],row[3],row[4],row[5],row[6]).to_JSON())
                    
                connection.close()
                return purchases
            except Exception as ex:
                raise Exception(ex)
    
        @classmethod
        def get_full_purchase(self, id):
            try:
                connection = get_connection()
                purchase = None
                with connection.cursor() as cursor:
                    cursor.execute("""SELECT idpurchase, purchase_date, purchase_amount, purchase_quantity, purchase_status, purchase_description, purchase_updated_at, product_idproduct, product_name, product_description, product_price, product_quantity, product_updated_at, product_category_idcategory, product_category_name, product_category_description, product_category_updated_at, provider_idprovider, provider_name, provider_description, provider_updated_at, user_iduser, user_name, user_email, user_password, user_updated_at, user_role_idrole, user_role_name, user_role_description, user_role_updated_at FROM purchase
                    FROM purchase
                    INNER JOIN purchase_detail ON purchase.idpurchase = purchase_detail.idpurchase
                    INNER JOIN product ON purchase_detail.idproduct = product.idproduct
                    WHERE idpurchase = %s""", (id,))
                    row = cursor.fetchone()
                    purchase = None 
                    if row is not None:
                        purchase = Purchase(row[0],row[1],row[2],row[3],row[4],row[5],row[6]).to_JSON()
                    
                connection.close()
                return purchase
            except Exception as ex:
                raise Exception(ex)
           
    
        @classmethod
        def add_purchase(self,purchase, list_products):
            connection = get_connection()
            try:
                with connection.cursor() as cursor:
                    cursor.execute("""INSERT INTO purchase (total_quantity, total_price, purchase_date, is_active, update_at, idUser) 
                    VALUES ( %s, %s, %s, %s, %s, %s)""", (purchase.total_quantity, purchase.total_price, purchase.purchase_date, purchase.is_active, purchase.update_at, purchase.idUser))
                    for product in list_products:
                        cursor.execute("""INSERT INTO purchasedetail (quantity, price, idProduct, idPurchase) 
                        VALUES ( %s, %s, %s, %s)""", (product.quantity, product.price, product.idProduct, cursor.lastrowid))
                        cursor.execute("""UPDATE product SET stock = stock - %s 
                        WHERE idproduct = %s""", (product.quantity, product.idProduct))
                    
                    connection.commit()
                    affected_rows = cursor.rowcount
                connection.close()
                return affected_rows
            except Exception as ex:
                connection.rollback()
                raise Exception(ex)
        
        @classmethod
        def delete_purchase(self, purchase):
            connection = get_connection()
            try:
                with connection.cursor() as cursor:
                    cursor.execute("""UPDATE purchase SET is_active = 0 WHERE idpurchase = %s""", (purchase.idpurchase))
                    connection.commit()
                    affected_rows = cursor.rowcount
                connection.close()
                return affected_rows
            except Exception as ex:
                connection.rollback()
                raise Exception(ex)
        
        @classmethod
        def update_purchase(self, purchase):
            connection = get_connection()
            try:
                with connection.cursor() as cursor:
                    cursor.execute("""UPDATE purchase SET 
                    total_quantity = %s, total_price = %s, purchase_date = %s, is_active = %s, update_at = %s, idUser = %s 
                    WHERE idpurchase = %s""", (purchase.total_quantity, purchase.total_price, purchase.purchase_date, purchase.is_active, purchase.update_at, purchase.idUser, purchase.idpurchase))
                    connection.commit()
                    affected_rows = cursor.rowcount
                connection.close()
                return affected_rows
            except Exception as ex:
                connection.rollback()
                raise Exception(ex)
        
        
                   

       
