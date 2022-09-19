from database.db import get_connection
from .entities.User import User

class UserModel():
    
        @classmethod
        def get_users(self):
            try:
                connection = get_connection()
                users = []
                with connection.cursor() as cursor:
                    cursor.execute("SELECT * FROM users")
                    for row in cursor.fetchall():
                        users.append(User(row[0],row[1],row[2],row[3],row[4],row[5],row[6]).to_JSON())
                
                connection.close()
                return users
            except Exception as ex:
                raise Exception(ex)
        
        @classmethod
        def get_user(self, id):
            try:
                connection = get_connection()
                user = None
                with connection.cursor() as cursor:
                    cursor.execute("SELECT * FROM users WHERE id = %s", (id))
                    row = cursor.fetchone()
                    user = None 
                    if row is not None:
                        user = User(row[0],row[1],row[2],row[3],row[4],row[5],row[6]).to_JSON()
                    
                connection.close()
                return user
            except Exception as ex:
                raise Exception(ex)
        
        @classmethod
        def add_user(self, user):
            try:
                connection = get_connection()
                with connection.cursor() as cursor:
                    cursor.execute("INSERT INTO users (id, username, password, email, created, updated, deleted) VALUES (%s, %s, %s, %s, %s, %s, %s)", (user.id, user.username, user.password, user.email, user.created, user.updated, user.deleted))
                    affected_rows = cursor.rowcount
                    connection.commit()
                connection.close()
                return affected_rows
            except Exception as ex:
                raise Exception(ex)
        
        @classmethod
        def delete_user(self, user):
            try:
                connection = get_connection()
                with connection.cursor() as cursor:
                    cursor.execute("DELETE FROM users WHERE id = %s", (user.id))
                    affected_rows = cursor.rowcount
                    connection.commit()
                connection.close()
                return affected_rows
            except Exception as ex:
                raise Exception(ex)
        
        @classmethod
        def update_user(self, user):
            try:
                connection = get_connection()
                with connection.cursor() as cursor:
                    cursor.execute("UPDATE users SET username = %s, password = %s, email = %s, created = %s, updated = %s, deleted = %s WHERE id = %s", (user.username, user.password, user.email, user.created, user.updated, user.deleted, user.id))
                    affected_rows = cursor.rowcount
                    connection.commit()
                connection.close()
                return affected_rows
            except Exception as ex:
                raise Exception(ex)
