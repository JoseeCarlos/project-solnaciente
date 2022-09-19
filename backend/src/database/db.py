from sqlite3 import DatabaseError
import mysql.connector
from decouple import config

def get_connection():
    try:
        connection = mysql.connector.connect(
            host=config('MYSQL_HOST'),
            user=config('MYSQL_USER'),
            password='Univalle',
            database=config('MYSQL_DB')
        )
        return connection
    except DatabaseError as ex:
        raise Exception(ex)


