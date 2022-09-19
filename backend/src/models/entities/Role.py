class Role():

    def __init__(self, idRole=None, name=None, description=None, is_active=None, created_at=None, updated_at=None):
        self.idRole = idRole
        self.name = name
        self.description = description
        self.is_active = is_active
        self.created_at = created_at
        self.updated_at = updated_at
    
    def to_JSON(self):
        return {
            'idRole': self.idRole,
            'name': self.name,
            'description': self.description,
            'is_active': self.is_active,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
       

    