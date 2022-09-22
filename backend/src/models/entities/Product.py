from utils.DateFormat import DateFormat
class Product():

    def __init__(self,idProduct=None,image=None,barcode=None,price_in=None,price_out=None,presentation=None,unit=None, stock=None,category_id=None,is_active=None,created_at=None,updated_at=None,name=None,id_provider=None,user_id=None, id_brand=None):
        self.idProduct = idProduct
        self.name = name
        self.image = image
        self.barcode = barcode
        self.price_in = price_in
        self.price_out = price_out
        self.presentation = presentation
        self.unit = unit
        self.stock = stock
        self.category_id = category_id
        self.is_active = is_active
        self.created_at = created_at
        self.updated_at = updated_at
        self.id_provider = id_provider
        self.id_brand = id_brand
        self.user_id = user_id
        
        
        
    def to_JSON(self):
        return {
            "idProduct": self.idProduct,
            "name": self.name,
            "image": self.image,
            "barcode": self.barcode,
            "price_in": self.price_in,
            "price_out": self.price_out,
            "presentation": self.presentation,
            "unit": self.unit,
            "stock": self.stock,
            "category_id": self.category_id,
            "is_active": self.is_active,
            "created_at": DateFormat.convert_date(self.created_at),
            "updated_at": DateFormat.convert_date(self.updated_at),
            "id_provider": self.id_provider,
            "user_id": self.user_id,
            "id_brand": self.id_brand
            
            
        }

