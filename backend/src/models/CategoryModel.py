from database.db import get_connection
from .entities.Category import Category

class CategoryModel():

    @classmethod
    def get_category(self):
        try:
            connection = get_connection()
            categories = []
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM category")
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
                cursor.execute("""INSERT INTO category (image, name, description, updated_at) 
                VALUES (%s, %s, %s, %s)""", (category.image, category.name, category.description, category.updated_at,))
                affected_rows = cursor.rowcount
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
                cursor.execute("DELETE FROM category WHERE idcategory = %s", (category.id,))
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
                cursor.execute("UPDATE category SET name = %s, description = %s, image = %s, created = %s, updated = %s, deleted = %s WHERE id = %s", (category.name, category.description, category.image, category.created, category.updated, category.deleted, category.id))
                affected_rows = cursor.rowcount
                connection.commit()
            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)
       