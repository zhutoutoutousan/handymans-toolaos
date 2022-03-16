from flask import Flask, request
from flask_restful import Resource, Api
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from security import authenticate, identity

app = Flask(__name__)
app.secret_key = 'Hosea'
api = Api(app)

# jwt
app.config['JWT_SECRET_KEY'] = 'Hosea'
jwt = JWTManager(app, authenticate, identity) # /auth

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

# Student Class
class Student(Resource):
    def get(self, name):
        return {'student': name}
    # Methods
    def post(self, name):
        # Add student
        return {'student': name}

class Items(Resource):
    @jwt_required()
    def get(self, *args, **kwargs):
        # If items in args or kwargs is empty, return items
        if not args and not kwargs:
            # If there's no items, return empty list and 404
            if not items:
                return {'items': []}, 404
            return {'items': items}
        # If there's no name argument in args and kwargs, return all items
        if not args and kwargs:
            if 'name' not in kwargs:
                return {'items': items}
            # If there's a name argument in kwargs, return the item with that name
            else:
                for item in items:
                    if item['name'] == kwargs['name']:
                        return {'item': item}
        # If there's a name argument in args, return the item with that name
        if args and not kwargs:
            for item in items:
                if item['name'] == args[0]:
                    return {'item': item}
        # If there's a name argument in args and kwargs, return the item with that name
        if args and kwargs:
            if 'name' not in kwargs:
                for item in items:
                    if item['name'] == args[0]:
                        return {'item': item}
            else:
                if args[0] == kwargs['name']:
                    return {'item': item}

class Item(Resource):
    # Arguments: name
    # API: GET /item/<string:name>
    # Return: item with that name
    # Return: 404 if no item with that name
    # Return: 400 if no name argument
    def get(self, *args, **kwargs):
        # Deal with edge cases
        if not items:
            return {'items': []}, 404
        if not args and not kwargs:
            return {'count': len(items), 'error': "No name specified"}, 400
        # Get item by name
        if not args and kwargs:
            if 'name' not in kwargs:
                return {'count': len(items), 'error': "No name specified"}, 400
            for item in items:
                if item['name'] == kwargs['name']:
                    return {'item': item}, 200
        if args and not kwargs:
            if args[0] not in items:
                return {'count': len(items), 'error': "No item found"}, 404
            for item in items:
                if item['name'] == args[0]:
                    return {'item': item}, 200
    # API: POST /item/<string:name>
    # Return: item with that name
    # Return: 404 if no item with that name
    # Return: 400 if no name argument
    def post(self, *args, **kwargs):
        # Deal with edge cases
        if not args and not kwargs:
            return {'error': "No name specified"}, 400
        # Get request body
        body = request.get_json()
        # Check body validity
        if not body:
            return {'error': "No body specified"}, 400
        if not args and kwargs:
            if 'name' not in kwargs:
                return {'error': "No name specified"}, 400
            for item in items:
                if item['name'] == body["name"]:
                    return {'item': item, 'warning': 'The item with the same name {} already exists'.format(kwargs['name'])}, 400
                else:
                    # Append item to items
                    items.append(kwargs)
                    return {'item': kwargs}, 201
        if args and not kwargs:
            if args[0] not in items:
                return {'error': "No item found"}, 404
            for item in items:
                if item['name'] == args[0]:
                    item.update(request.json)
                    return {'item': item}, 200
                else:
                    # Append item to items
                    items.append(args)
                    return {'item': args}, 201
        # Throw error if this code is reached
        return {'error': "Internal Server Error: Unintended code reached"}, 500
    def put(self, name):
        # Update item
        for item in items:
            if item['name'] == name:
                item.update(item)
                return item
    def delete(self, name):
        # Delete items item by name
        items = [item for item in items if item['name'] != name]

class Mock(Resource):
    # Get only, if items is empty, add mock data to items
    def get(self):
        if items:
            return items
        else:
            items.extend(mock)
            return items



api.add_resource(Student, '/student/<string:name>')
api.add_resource(Item, '/item/<string:name>')
api.add_resource(Items, '/items')
api.add_resource(Mock, '/mock')
app.run(debug=True)