from utils.DateFormat import DateFormat
class User():

    def __init__(self, iduser=None, name=None, first_name=None, second_name=None, ci=None, number=None, username=None, password=None,is_active=None, created_at=None, updated_at=None, idrole=None):
        self.iduser = iduser
        self.name = name
        self.first_name = first_name
        self.second_name = second_name
        self.ci = ci
        self.number = number
        self.username = username
        self.password = password
        self.is_active = is_active
        self.created_at = created_at
        self.updated_at = updated_at
        self.idrole = idrole
    
    def to_JSON(self):
        return {
            'iduser': self.iduser,
            'name': self.name,
            'first_name': self.first_name,
            'second_name': self.second_name,
            'ci': self.ci,
            'number': self.number,
            'username': self.username,
            'password': self.password,
            'is_active': self.is_active,
            'created_at': DateFormat.convert_date(self.created_at), 
            'updated_at': DateFormat.convert_date(self.updated_at),
            'idrole': self.idrole
        }
        