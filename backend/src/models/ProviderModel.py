from database.db import get_connection
from .entities.Provider import Provider

class ProviderModel():
    
        @classmethod
        def get_providers(self):
            try:
                connection = get_connection()
                providers = []
                with connection.cursor() as cursor:
                    query = "SELECT idprovider, name, description, direction,phone, is_active, created_at, updated_at FROM provider"
                    cursor.execute(query)
                    result = cursor.fetchall()
                    for row in result:
                        provider = Provider(row[0],row[1],row[2],row[3],row[4],row[5],row[6],row[7])
                        providers.append(provider.to_JSON())
                connection.close()
                return providers
            except Exception as ex:
                raise Exception(ex)
    
        @classmethod
        def get_provider(self, id):
            try:
                connection = get_connection()
                provider = None
                with connection.cursor() as cursor:
                    cursor.execute("SELECT * FROM provider WHERE idproveedor = %s", (id,))
                    row = cursor.fetchone()
                    provider = None 
                    if row is not None:
                        provider = Provider(row[0],row[1],row[2],row[3],row[4],row[5]).to_JSON()
                    
                connection.close()
                return provider
            except Exception as ex:
                raise Exception(ex)
    
        @classmethod
        def add_provider(self, provider):
            try:
                connection = get_connection()
                with connection.cursor() as cursor:
                    query = "INSERT INTO provider (name, description, direction, phone, updated_at) VALUES (%s, %s, %s, %s, %s)"
                    affected_rows = cursor.execute(query, (provider.name, provider.description, provider.direction, provider.phone, provider.updated_at))
                    connection.commit()
                connection.close()
                return affected_rows
            except Exception as ex:
                raise Exception(ex)   
    
        @classmethod
        def delete_provider(self, provider):
            #update
            try:
                connection = get_connection()
                with connection.cursor() as cursor:
                    query = "UPDATE provider SET is_active = 0 WHERE idprovider = %s"
                    affected_rows = cursor.execute(query, (provider.idProvider,))
                    connection.commit()
                connection.close()
                return affected_rows
            except Exception as ex:
                raise Exception(ex)
        
        @classmethod
        def update_provider(self, provider):
            try:
                connection = get_connection()
                with connection.cursor() as cursor:
                    query = "UPDATE provider SET name = %s, description = %s, direction = %s, phone = %s, updated_at = %s WHERE idprovider = %s"
                    affected_rows = cursor.execute(query, (provider.name, provider.description, provider.direction, provider.phone, provider.updated_at, provider.idProvider))
                    connection.commit()
                connection.close()
                return affected_rows
            except Exception as ex:
                raise Exception(ex)