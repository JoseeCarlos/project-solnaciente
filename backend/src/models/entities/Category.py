class Category():

    def __init__(self,idcategory=None,image=None,name=None,description=None,is_active=None,created_at=None,updated_at=None):
        self.idcategory = idcategory
        self.image = image
        self.name = name
        self.description = description
        self.is_active = is_active
        self.created_at = created_at
        self.updated_at = updated_at
      
    
    def to_JSON(self):
        return {
            'idcategory': self.idcategory,
            'image': self.image,
            'name': self.name,
            'description': self.description,
            'is_active': self.is_active,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
       

