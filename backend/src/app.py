from re import A
from unicodedata import name
from flask import Flask
from config import config
from routes import Category, Product,Provider,Role, User

app = Flask(__name__)


def page_not_found(error):
    return 'This page does not exist', 404

if __name__ == '__main__':
    app.config.from_object(config['development'])
    #register multiple blueprints

    app.register_blueprint(Category.main, name="category" , url_prefix='/api/categories')
    app.register_blueprint(Product.main, name="products", url_prefix='/api/products')
    app.register_blueprint(Provider.main, name="providers", url_prefix='/api/providers')
    app.register_blueprint(Role.main, name="roles", url_prefix='/api/roles')
    app.register_blueprint(User.main, name="users", url_prefix='/api/users')
    app.register_error_handler(404, page_not_found)
    app.run()
