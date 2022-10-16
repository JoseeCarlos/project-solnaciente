from database.db import get_connection
from .entities.Client import Client

class ClientModel():
    
        @classmethod
        def get_clients(self):
            try:
                connection = get_connection()
                clients = []
                with connection.cursor() as cursor:
                    cursor.execute("SELECT idclient, name, phone, ci, is_active FROM client")
                    for row in cursor.fetchall():
                        clients.append(Client(row[0],row[1],row[2],row[3],row[4]).to_JSON())
                    
                connection.close()
                return clients
            except Exception as ex:
                raise Exception(ex)
        
        @classmethod
        def get_client(self, id):
            try:
                    connection = get_connection()
                    client = None
                    with connection.cursor() as cursor:
                        cursor.execute("SELECT * FROM client WHERE idclient = %s", (int(id),))
                        row = cursor.fetchone()
                        client = None 
                        if row is not None:
                            client = Client(row[0],row[1],row[2],row[3],row[4],row[5],row[6]).to_JSON()
                        
                    connection.close()
                    return client
            except Exception as ex:
                raise Exception(ex)
        
        @classmethod
        def add_client(self, client):
            try:
                connection = get_connection()
                with connection.cursor() as cursor:
                    query = "INSERT INTO client (name, ci, phone, updated_at) VALUES (%s, %s, %s, %s)"
                    affected_rows = cursor.execute(query, (client.name, client.ci, client.phone, client.updated_at))
                    connection.commit()
                connection.close()
                return affected_rows
            except Exception as ex:
                raise Exception(ex)
        
        @classmethod
        def delete_client(self, client):
            try:
                connection = get_connection()
                with connection.cursor() as cursor:
                    cursor.execute("UPDATE client SET is_active = 0 WHERE idclient = %s", (client.idclient,))
                    affected_rows = cursor.rowcount
                    connection.commit()
                connection.close()
                return affected_rows
            except Exception as ex:
                raise Exception(ex)

