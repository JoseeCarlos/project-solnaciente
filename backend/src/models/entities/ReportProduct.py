from tkinter import N


class ReportProduct():

    def __init__(self,barcode=None,name=None,nameBrand=None,presentation=None, price_in=None, price_out=None, stock=None):
        self.barcode = barcode
        self.name = name
        self.nameBrand = nameBrand
        self.presentation = presentation
        self.price_in = price_in
        self.price_out = price_out
        self.stock = stock
    
    def to_JSON(self):
        return {
            'barcode': self.barcode,
            'name': self.name,
            'nameBrand': self.nameBrand,
            'presentation': self.presentation,
            'price_in': self.price_in,
            'price_out': self.price_out,
            'stock': self.stock
        }