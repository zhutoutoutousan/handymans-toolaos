#!/usr/bin/env python
from flask import Flask, request, jsonify, render_template
app = Flask(__name__)

# # Import ./mock.py
# from .mock import get_store
# Mock
store = [
    {
        'name': 'My Wonderful Store',
        'items': [
            {
                'name': 'My Item',
                'price': 15.99
            }
        ]
    }
]

class Mock:
    # Constructor 
    def __init__(self):
        self.store = store
    def get_store():
        return store
    # Append Store
    def append_store(self, name, items):
        self.store.append({
            'name': name,
            'items': items
        })
    
# Create a new instance of Mock
mock = Mock()


# /index return home page
@app.route('/')
def index():
    return render_template('index.html')


# GET /store/<string:name>
@app.route('/store/<string:name>') 
def get_store(name):
    # Iterate over stores
    # If the store name matches, return it
    # If none match, return an error message
    for store in mock.store:
        if store['name'] == name:
            return jsonify(store)
    return jsonify({'message': 'store not found'})

# POST /store data: {name}
@app.route('/store', methods=['POST'])
def create_store():
    request_data = request.get_json()
    print(request_data)
    new_store = {
        'name': request_data['name'],
        'items': []
    }
    mock.append_store(new_store['name'], new_store['items'])
    return jsonify(new_store)


# GET /store
@app.route('/store')
def get_stores():
    return jsonify({'stores': mock.store})

# POST /store/<string:name>/item {name:, price:}
@app.route('/store/<string:name>/item', methods=['POST'])
def create_item_in_store(name):
    # Get request details
    request_data = request.get_json()
    for store in mock.store:
        if store['name'] == name:
            new_item = {
                'name': request_data['name'],
                'price': request_data['price']
            }
            store['items'].append(new_item)
            return jsonify(new_item)
    return jsonify({'message': 'store not found'})

# GET /store/<string:name>/item
@app.route('/store/<string:name>/item')
def get_items_in_store(name):
    # Iterate over stores
    # If the store name matches, return its item
    # If none match, return an error message
    for store in mock.store:
        if store['name'] == name:
            return jsonify({'items': store['items']})
    return jsonify({'message': 'store not found'})


app.run(port=5000)