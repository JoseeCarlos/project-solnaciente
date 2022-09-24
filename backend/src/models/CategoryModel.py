from database.db import get_connection
from .entities.Category import Category

class CategoryModel():

    @classmethod
    def get_category(self):
        try:
            connection = get_connection()
            categories = []
            with connection.cursor() as cursor:
                cursor.execute("SELECT idcategory, image, name, description, is_active, created_at, updated_at FROM category")
                for row in cursor.fetchall():
                    categories.append(Category(row[0],row[1],row[2],row[3],row[4],row[5],row[6]).to_JSON())
               
            connection.close()
            return categories
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def get_categories(self, id):
        try:
                connection = get_connection()
                category = None
                with connection.cursor() as cursor:
                    cursor.execute("SELECT * FROM category WHERE idcategory = %s", (int(id),))
                    row = cursor.fetchone()
                    category = None 
                    if row is not None:
                        category = Category(row[0],row[1],row[2],row[3],row[4],row[5],row[6]).to_JSON()
                    
                connection.close()
                return category
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def add_category(self, category):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                query = "INSERT INTO category (image, name, description, updated_at) VALUES (%s, %s, %s, %s)"
                affected_rows = cursor.execute(query, (category.image, category.name, category.description, category.updated_at))
                connection.commit()
            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def delete_category(self, category):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("UPDATE category SET is_active = 0 WHERE idcategory = %s", (category.idcategory,))
                affected_rows = cursor.rowcount
                connection.commit()
            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def update_category(self, category):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("UPDATE category SET name = %s, description = %s, image = %s, updated_at = %s WHERE idcategory = %s", (category.name, category.description, category.image, category.updated_at, category.idcategory))
                affected_rows = cursor.rowcount
                connection.commit()
            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)
       