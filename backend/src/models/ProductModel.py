from database.db import get_connection
from .entities.Product import Product

class ProductModel():

    @classmethod
    def get_products(self):
        try:
            connection = get_connection()
            products = []
            with connection.cursor() as cursor:
                query = "SELECT idproduct, name, image, barcode, price_int, price_out, presentation, unit, stock, idcategory, is_active, created_at, updated_at, idprovider, iduser, idbrand FROM product"
                cursor.execute(query)
                for row in cursor.fetchall():
                    product = Product(idProduct=row[0], name=row[1], image=row[2], barcode=row[3], price_in=row[4], price_out=row[5], presentation=row[6], unit=row[7], stock=row[8], category_id=row[9], is_active=row[10], created_at=row[11], updated_at=row[12], id_provider=row[13], user_id=row[14], id_brand=row[15])
                    products.append(product.to_JSON())
               
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
                query = "SELECT idproduct, name, image, barcode, price_int, price_out, presentation, unit, stock, idcategory, is_active, created_at, updated_at, idprovider, iduser, idbrand FROM product WHERE idproduct=%s"
                cursor.execute(query, (int(id),))
                row = cursor.fetchone()
                product = Product(idProduct=row[0], name=row[1], image=row[2], barcode=row[3], price_in=row[4], price_out=row[5], presentation=row[6], unit=row[7], stock=row[8], category_id=row[9], is_active=row[10], created_at=row[11], updated_at=row[12], id_provider=row[13], user_id=row[14], id_brand=row[15])
                product = product.to_JSON()
            connection.close()
            return product
           
        except Exception as ex:
            raise Exception(ex)
        
    @classmethod
    def add_product(self, product):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                query = "INSERT INTO product (name, image, barcode, price_int, price_out, presentation, unit, stock, idcategory, updated_at, idprovider, iduser, idbrand) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
                cursor.execute(query, (product.name, product.image, product.barcode, product.price_in, product.price_out, product.presentation, product.unit, product.stock, product.updated_at, product.id_provider, product.user_id, product.id_brand))
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
                query = "UPDATE product SET is_active=0 WHERE idproduct=%s"
                cursor.execute(query, (product.id,))
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
                query = "UPDATE product SET name=%s, image=%s, barcode=%s, price_int=%s, price_out=%s, presentation=%s, unit=%s, stock=%s, idcategory=%s, updated_at=%s, idprovider=%s, iduser=%s, idbrand=%s WHERE idproduct=%s"
                cursor.execute(query, (product.name, product.image, product.barcode, product.price_in, product.price_out, product.presentation, product.unit, product.stock, product.updated_at, product.id_provider, product.user_id, product.id_brand, product.id))
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
                query = "SELECT idproduct, name, image, barcode, price_int, price_out, presentation, unit, stock, idcategory, is_active, created_at, updated_at, idprovider, iduser, idbrand FROM product WHERE idcategory=%s"
                cursor.execute(query, (int(category_id),))
                for row in cursor.fetchall():
                    product = Product(idProduct=row[0], name=row[1], image=row[2], barcode=row[3], price_in=row[4], price_out=row[5], presentation=row[6], unit=row[7], stock=row[8], category_id=row[9], is_active=row[10], created_at=row[11], updated_at=row[12], id_provider=row[13], user_id=row[14], id_brand=row[15])
                    products.append(product.to_JSON())
               
            connection.close()
            return products
        except Exception as ex:
            raise Exception(ex)
    
   
       