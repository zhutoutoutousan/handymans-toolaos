from flask import Flask
from flask_restful import Api
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from user import UserRegister
from item import Item, ItemList

app = Flask(__name__)
app.config['PROPAGATE_EXCEPTIONS'] = True
app.config['JWT_SECRET_KEY'] = 'super-secret'  # Change this!
jwt = JWTManager(app)

# Create an API
PORT = 5000
api = Api(app)


api.add_resource(Item, '/item/<string:name>')
api.add_resource(ItemList, '/items')
api.add_resource(UserRegister, '/register')

# only run this file once
if __name__ == '__main__':
    app.run(port=PORT, debug=True)
