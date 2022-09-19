class Product():

    def __init__(self,idProduct,image=None,barcode=None,price_in=None,price_out=None,presentation=None,unit=None,user_id=None,category_id=None,is_active=None,created_at=None,updated_at=None):
        self.idProduct = idProduct
        self.image = image
        self.barcode = barcode
        self.price_in = price_in
        self.price_out = price_out
        self.presentation = presentation
        self.unit = unit
        self.user_id = user_id
        self.category_id = category_id
        self.is_active = is_active
        self.created_at = created_at
        self.updated_at = updated_at
    
    def to_JSON(self):
        return {
            'idProduct': self.idProduct,
            'image': self.image,
            'barcode': self.barcode,
            'price_in': self.price_in,
            'price_out': self.price_out,
            'presentation': self.presentation,
            'unit': self.unit,
            'user_id': self.user_id,
            'category_id': self.category_id,
            'is_active': self.is_active,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

