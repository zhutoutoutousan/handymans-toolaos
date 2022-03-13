from flask import Flask, request
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

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
    def get(self):
        # If items exist, return, if not, return empty list with 404
        if items:
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



api.add_resource(Student, '/student/<string:name>')
api.add_resource(Item, '/item/<string:name>')
api.add_resource(Items, '/items')
app.run(debug=True)