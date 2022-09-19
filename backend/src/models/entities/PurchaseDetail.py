class PurchaseDetail():

    def __init__(self, product_id, purchase_id,  quantity, price):
        self.product_id = product_id
        self.purchase_id = purchase_id
        self.quantity = quantity
        self.price = price

    
    def to_JSON(self):
        return {
            'product_id': self.product_id,
            'purchase_id': self.purchase_id,
            'quantity': self.quantity,
            'price': self.price
        }