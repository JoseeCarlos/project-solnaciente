from database.db import get_connection
from .entities.User import User

class UserModel():
    
        @classmethod
        def get_users(self):
            try:
                connection = get_connection()
                users = []
                with connection.cursor() as cursor:
                    cursor.execute("SELECT * FROM user")
                    for row in cursor.fetchall():
                        users.append(User(row[0],row[1],row[2],row[3],row[4],row[5],row[6],row[7]).to_JSON())
                    
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
                    cursor.execute("SELECT * FROM user WHERE iduser = %s", (id,))
                    row = cursor.fetchone()
                    user = None 
                    if row is not None:
                        user = User(row[0],row[1],row[2],row[3],row[4],row[5],row[6],row[7]).to_JSON()
                    
                connection.close()
                return user
            except Exception as ex:
                raise Exception(ex)
    
        @classmethod
        def add_user(self, user):
            try:
                connection = get_connection()
                with connection.cursor() as cursor:
                    cursor.execute("INSERT INTO user (id, name, email, password, created_at, updated_at, role_id) VALUES (%s, %s, %s, %s, %s, %s, %s)", (user.id, user.name, user.email, user.password, user.created_at, user.updated_at, user.role_id))
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
                    cursor.execute("DELETE FROM user WHERE id = %s", (user.id))
                    affected_rows = cursor.rowcount
                    connection.commit()
                connection.close()
                return affected_rows
            except Exception as ex:
                raise Exception(ex)