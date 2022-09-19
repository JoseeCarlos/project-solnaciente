import datetime

class DateFormat():

    @classmethod
    def convert_date(self, date):
        date = datetime.datetime.strftime(date, '%d/%m/%Y')
        return date
