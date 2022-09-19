class Purchase():

    def __init__(self, idPurchase=None, total_quantity=None, total_price=None, purchase_date=None, is_active=None, update_at=None, idUser=None):
        self.idPurchase = idPurchase
        self.total_quantity = total_quantity
        self.total_price = total_price
        self.purchase_date = purchase_date
        self.is_active = is_active
        self.update_at = update_at
        self.idUser = idUser
    
    def to_JSON(self):
        return {
            'idPurchase': self.idPurchase,
            'total_quantity': self.total_quantity,
            'total_price': self.total_price,
            'purchase_date': self.purchase_date,
            'is_active': self.is_active,
            'update_at': self.update_at,
            'idUser': self.idUser
        }