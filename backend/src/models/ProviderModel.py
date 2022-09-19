from database.db import get_connection
from .entities.Provider import Provider

class ProviderModel():
    
        @classmethod
        def get_providers(self):
            try:
                connection = get_connection()
                providers = []
                with connection.cursor() as cursor:
                    cursor.execute("SELECT * FROM provider")
                    for row in cursor.fetchall():
                        providers.append(Provider(row[0],row[1],row[2],row[3],row[4],row[5]).to_JSON())
                    
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
                    cursor.execute("INSERT INTO provider (name, description, updated_at) VALUES ( %s, %s, %s)", (provider.name, provider.description, provider.updated_at))
                    affected_rows = cursor.rowcount
                    connection.commit()
                connection.close()
                return affected_rows
            except Exception as ex:
                raise Exception(ex)   
    
        @classmethod
        def delete_provider(self, provider):
            try:
                connection = get_connection()
                with connection.cursor() as cursor:
                    cursor.execute("DELETE FROM provider WHERE idprovider = %s", (provider.id,))
                    affected_rows = cursor.rowcount
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
                    cursor.execute("UPDATE provider SET name = %s, description = %s, updated_at = %s WHERE idprovider = %s", (provider.name, provider.description, provider.updated_at, provider.id))
                    affected_rows = cursor.rowcount
                    connection.commit()
                connection.close()
                return affected_rows
            except Exception as ex:
                raise Exception(ex)