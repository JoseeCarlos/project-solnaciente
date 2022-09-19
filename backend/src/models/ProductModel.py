from database.db import get_connection
from .entities.Product import Product

class ProductModel():

    @classmethod
    def get_products(self):
        try:
            connection = get_connection()
            products = []
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM product")
                for row in cursor.fetchall():
                    products.append(Product(row[0],row[1],row[2],row[3],row[4],row[5],row[6],row[7],row[8],row[9],row[10],row[11]).to_JSON())
               
            connection.close()
            return products
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def get_product(self, id):
        try:
            
            connection = get_connection()
            product = None
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM product WHERE id_product = %s", (id))
                row = cursor.fetchone()
                product = None 
                if row is not None:
                    product = Product(row[0],row[1],row[2],row[3],row[4],row[5],row[6],row[7],row[8],row[9],row[10],row[11]).to_JSON()
                
            connection.close()
            return product
           
        except Exception as ex:
            raise Exception(ex)
        
    @classmethod
    def add_product(self, product):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("INSERT INTO product (id, image, barcode, price_in, price_out, presentation, unit, user_id, category_id, is_active, created_at, updated_at) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", (product.idProduct, product.image, product.barcode, product.price_in, product.price_out, product.presentation, product.unit, product.user_id, product.category_id, product.is_active, product.created_at, product.updated_at))
                affected_rows = cursor.rowcount
                connection.commit()
            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def delete_product(self, product):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("DELETE FROM product WHERE id = %s", (product.idProduct))
                affected_rows = cursor.rowcount
                connection.commit()
            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def update_product(self, product):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("UPDATE product SET image = %s, barcode = %s, price_in = %s, price_out = %s, presentation = %s, unit = %s, user_id = %s, category_id = %s, is_active = %s, created_at = %s, updated_at = %s WHERE id = %s", (product.image, product.barcode, product.price_in, product.price_out, product.presentation, product.unit, product.user_id, product.category_id, product.is_active, product.created_at, product.updated_at, product.idProduct))
                affected_rows = cursor.rowcount
                connection.commit()
            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def get_products_by_category(self, category_id):
        try:
            connection = get_connection()
            products = []
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM product WHERE category_id = %s", (category_id))
                for row in cursor.fetchall():
                    products.append(Product(row[0],row[1],row[2],row[3],row[4],row[5],row[6],row[7],row[8],row[9],row[10],row[11]).to_JSON())
               
            connection.close()
            return products
        except Exception as ex:
            raise Exception(ex)
    
   
       