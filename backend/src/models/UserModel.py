from database.db import get_connection
from .entities.User import User

class UserModel():
    
        @classmethod
        def get_users(self):
            try:
                connection = get_connection()
                users = []
                with connection.cursor() as cursor:
                    query = "SELECT iduser, name, first_name, second_name, ci, number, username, password, is_active, created_at, updated_at, idrole FROM user"
                    cursor.execute(query)
                    result = cursor.fetchall()
                    for row in result:
                        user = User(row[0],row[1],row[2],row[3],row[4],row[5],row[6],row[7],row[8],row[9],row[10],row[11])
                        users.append(user.to_JSON())
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
                    query = "INSERT INTO user (name, first_name, second_name, ci, number, username, password, updated_at, idrole) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
                    affected_rows = cursor.execute(query, (user.name, user.first_name, user.second_name, user.ci, user.number, user.username, user.password, user.updated_at, user.idrole))
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
                    query = "UPDATE user SET is_active = 0 WHERE iduser = %s"
                    affected_rows = cursor.execute(query, (user.iduser,))
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
                    query = "UPDATE user SET name = %s, first_name = %s, second_name = %s, ci = %s, number = %s, username = %s, password = %s, updated_at = %s, idrole = %s WHERE iduser = %s"
                    affected_rows = cursor.execute(query, (user.name, user.first_name, user.second_name, user.ci, user.number, user.username, user.password, user.updated_at, user.idrole, user.iduser))
                    connection.commit()
                connection.close()
                return affected_rows
            except Exception as ex:
                raise Exception(ex)
