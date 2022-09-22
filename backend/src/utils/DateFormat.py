import datetime

class DateFormat():

    @classmethod
    def convert_date(self, date):
        date = datetime.datetime.strftime(date, '%Y-%m-%d')
        return date
