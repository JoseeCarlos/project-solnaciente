class Brand():

    def __init__(self, idbrand=None, name=None,is_active=None, created_at=None, updated_at=None):
        self.idbrand = idbrand
        self.name = name
        self.is_active = is_active
        self.created_at = created_at
        self.updated_at = updated_at
      
    
    def to_JSON(self):
        return {
            'idbrand': self.idbrand,
            'name': self.name,
            'is_active': self.is_active,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
       
