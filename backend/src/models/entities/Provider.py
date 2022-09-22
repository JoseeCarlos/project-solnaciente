from utils.DateFormat import DateFormat
class Provider():

    def __init__(self,idProvider=None,name=None,description=None,direction=None,phone=None,is_active=None,created_at=None,updated_at=None):
        self.idProvider = idProvider
        self.name = name
        self.description = description
        self.direction = direction
        self.phone = phone
        self.is_active = is_active
        self.created_at = created_at
        self.updated_at = updated_at 
       
    
    def to_JSON(self):
        return {
            'idProvider': self.idProvider,
            'name': self.name,
            'description': self.description,
            'direction': self.direction,
            'phone': self.phone,
            'is_active': self.is_active,
            'created_at': DateFormat.convert_date(self.created_at), 
            'updated_at': DateFormat.convert_date(self.updated_at)
        }