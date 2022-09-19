class Provider():

    def __init__(self,idProvider,name=None,phone=None,email=None,address=None,is_active=None,created_at=None,updated_at=None):
        self.idProvider = idProvider
        self.name = name
        self.phone = phone
        self.email = email
        self.address = address
        self.is_active = is_active
        self.created_at = created_at
        self.updated_at = updated_at
       
    
    def to_JSON(self):
        return {
            'idProvider': self.idProvider,
            'name': self.name,
            'phone': self.phone,
            'email': self.email,
            'address': self.address,
            'is_active': self.is_active,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }