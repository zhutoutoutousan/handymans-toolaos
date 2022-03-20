from flask import Flask, jsonify, request, abort
from flask_restful import Api, Resource, reqparse
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from security import authenticate, identity
from user import UserRegister
from item import Item, ItemList

app = Flask(__name__)
app.config['PROPAGATE_EXCEPTIONS'] = True
app.config['JWT_SECRET_KEY'] = 'super-secret'  # Change this!
jwt = JWTManager(app)

# Create an API
PORT = 5000
api = Api(app)


mock = [
    {
        "id": 1,
        "name": "John",
        "age": 30
    },
    {
        "id": 2,
        "name": "Jane",
        "age": 28
    },
    {
        "id": 3,
        "name": "Jack",
        "age": 32
    },
    {
        "id": 4,
        "name": "Jill",
        "age": 35
    }
]

items = [
    {
        'name': 'Edward',
        'age': 21
    },
    {
        'name': 'Eddy',
        'age': 22
    }
]

# Login Class
class Login(Resource):
    @jwt_required
    def get(self):
        return {
            'user': get_jwt_identity()
        }
    
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        if not username or not password:
            return {'message': 'Missing username or password'}, 400
        if authenticate(username, password):
            return {
                'message': 'Logged in as {}'.format(username),
                'access_token': create_access_token(identity=username)
            }
        return {'message': 'Invalid credentials'}, 401

# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
class Protected(Resource):
    @jwt_required()
    def get(self):
        return {
            'protected': True,
            'user': get_jwt_identity()
        }
    
    @jwt_required()
    def put(self, name):
        data = request.get_json() 
        # authenticate and identity
        user = get_jwt_identity()
        if user['name'] == name:
            return {'message': 'You cannot change your own name'}, 400
        authenticated_user = authenticate(user['name'], user['password'])
        if authenticated_user:
            user = authenticated_user
        else:
            return {'message': 'Invalid credentials'}, 401
        # update user
        user['name'] = data.get('name')
        user['age'] = data.get('age')
        return {'message': 'User updated'}, 200

class Mock(Resource):
    # Get only, if items is empty, add mock data to items
    def get(self):
        if items:
            return items
        else:
            items.extend(mock)
            return items



api.add_resource(Login, '/login')
api.add_resource(Protected, '/protected')
api.add_resource(Item, '/item/<string:name>')
api.add_resource(ItemList, '/items')
api.add_resource(Mock, '/mock')
api.add_resource(UserRegister, '/register')

# only run this file once
if __name__ == '__main__':
    app.run(port=PORT, debug=True)
