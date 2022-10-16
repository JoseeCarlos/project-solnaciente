class Client():
    def __init__(self, idclient=None, name=None, phone=None, ci=None, is_active=None, created_at=None, updated_at=None):
        self.idclient = idclient
        self.name = name
        self.phone = phone
        self.ci = ci
        self.is_active = is_active
        self.created_at = created_at
        self.updated_at = updated_at

    def to_JSON(self):
        return {
            'idclient': self.idclient,
            'name': self.name,
            'phone': self.phone,
            'ci': self.ci,
            'is_active': self.is_active,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }