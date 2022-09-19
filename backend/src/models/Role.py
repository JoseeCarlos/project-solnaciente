from database.db import get_connection
from .entities.Role import Role

class RoleModel():
        
            @classmethod
            def get_roles(self):
                try:
                    connection = get_connection()
                    roles = []
                    with connection.cursor() as cursor:
                        cursor.execute("SELECT * FROM role")
                        for row in cursor.fetchall():
                            roles.append(Role(row[0],row[1],row[2],row[3],row[4],row[5]).to_JSON())
                        
                    connection.close()
                    return roles
                except Exception as ex:
                    raise Exception(ex)
            
            @classmethod
            def get_role(self, id):
                try:
                    connection = get_connection()
                    role = None
                    with connection.cursor() as cursor:
                        cursor.execute("SELECT * FROM role WHERE idrole = %s", (id,))
                        row = cursor.fetchone()
                        role = None 
                        if row is not None:
                            role = Role(row[0],row[1],row[2],row[3],row[4],row[5]).to_JSON()
                        
                    connection.close()
                    return role
                except Exception as ex:
                    raise Exception(ex)
            
            @classmethod
            def add_role(self, role):
                try:
                    connection = get_connection()
                    with connection.cursor() as cursor:
                        cursor.execute("INSERT INTO role (name, description, updated_at) VALUES ( %s, %s, %s)", (role.name, role.description, role.updated_at))
                        affected_rows = cursor.rowcount
                        connection.commit()
                    connection.close()
                    return affected_rows
                except Exception as ex:
                    raise Exception(ex)
            
            @classmethod
            def delete_role(self, role):
                try:
                    connection = get_connection()
                    with connection.cursor() as cursor:
                        cursor.execute("DELETE FROM role WHERE idrole = %s", (role.id,))
                        affected_rows = cursor.rowcount
                        connection.commit()
                    connection.close()
                    return affected_rows
                except Exception as ex:
                    raise Exception(ex)
            
            @classmethod
            def update_role(self, role):
                try:
                    connection = get_connection()
                    with connection.cursor() as cursor:
                        cursor.execute("UPDATE role SET name = %s, description = %s, updated_at = %s WHERE idrole = %s", (role.name, role.description, role.updated_at, role.id))
                        affected_rows = cursor.rowcount
                        connection.commit()
                    connection.close()
                    return affected_rows
                except Exception as ex:
                    raise Exception(ex)