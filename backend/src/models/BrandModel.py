from database.db import get_connection
from .entities.Brand import Brand

class BrandModel():
    
        @classmethod
        def get_brand(self):
            try:
                connection = get_connection()
                brands = []
                with connection.cursor() as cursor:
                    cursor.execute("SELECT idbrand, name, is_active, created_at, updated_at FROM brand")
                    for row in cursor.fetchall():
                        brands.append(Brand(row[0],row[1],row[2],row[3],row[4]).to_JSON())
                    
                connection.close()
                return brands
            except Exception as ex:
                raise Exception(ex)
        
        @classmethod
        def get_brands(self, id):
            try:
                    connection = get_connection()
                    brand = None
                    with connection.cursor() as cursor:
                        cursor.execute("SELECT * FROM brand WHERE idbrand = %s", (int(id),))
                        row = cursor.fetchone()
                        brand = None 
                        if row is not None:
                            brand = Brand(row[0],row[1],row[2],row[3],row[4]).to_JSON()
                        
                    connection.close()
                    return brand
            except Exception as ex:
                raise Exception(ex)
        
        @classmethod
        def add_brand(self, brand):
            try:
                connection = get_connection()
                with connection.cursor() as cursor:
                    cursor.execute("""INSERT INTO brand (name, is_active, created_at, updated_at) 
                    VALUES (%s, %s, %s, %s)""", (brand.name, brand.is_active, brand.created_at, brand.updated_at,))
                    affected_rows = cursor.rowcount
                    connection.commit()
                connection.close()
                return affected_rows
            except Exception as ex:
                raise Exception(ex)
        
        @classmethod
        def delete_brand(self, brand):
            try:
                connection = get_connection()
                with connection.cursor() as cursor:
                    cursor.execute("DELETE FROM brand WHERE idbrand = %s", (brand.id,))
                    affected_rows = cursor.rowcount
                    connection.commit()
                connection.close()
                return affected_rows
            except Exception as ex:
                raise Exception(ex)
        
        @classmethod
        def update_brand(self, brand):
            try:
                connection = get_connection()
                with connection.cursor() as cursor:
                    cursor.execute("""UPDATE brand SET name = %s, is_active = %s, updated_at = %s WHERE idbrand = %s""", (brand.name, brand.is_active, brand.updated_at, brand.id,))
                    affected_rows = cursor.rowcount
                    connection.commit()
                connection.close()
                return affected_rows
            except Exception as ex:
                raise Exception(ex)
        
        