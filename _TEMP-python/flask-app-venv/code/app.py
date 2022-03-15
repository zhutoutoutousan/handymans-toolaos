from flask import Flask, request
from flask_restful import Resource, Api

app = Flask(__name__)
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

# Student Class
class Student(Resource):
    def get(self, name):
        return {'student': name}
    # Methods
    def post(self, name):
        # Add student
        return {'student': name}

class Items(Resource):
    def get(self, name):
        # If items exist, return, if not, return empty list with 404
        # If name exist
        if name in items:
            return list(filter(lambda x: x['name'] == name, items))
        elif items:
            return items
        else:
            return {'items': []}, 404

class Item(Resource):
    def get(self, name):
        # Get item by name
        for item in items:
            if item['name'] == name:
                return item
        return {'item': None}, 404
    def post(self, name):
        # Get path variable
        item = {'name': name}
        # Get body variable and append to item
        item.update(request.json)
        items.append(item)
        return items, 201
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