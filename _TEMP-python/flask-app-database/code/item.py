from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity
import sqlite3

class Item(Resource):
    # init
    def __init__(self, _id=0, name='', price=0.0):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('price',
            type=float,
            required=True,
            help="This field cannot be left blank!"
        )
        self.parser.add_argument('store_id',
            type=int,
            required=True,
            help="Every item needs a store id."
        )
        self.parser.add_argument('name',
            type=str,
            required=True,
            help="Name cannot be left blank!"
        )
        self.id = _id
        self.name = name
        self.price = price

    TABLE_NAME = 'items'

    parser = reqparse.RequestParser()
    parser.add_argument('price',
        type=float,
        required=True,
        help="This field cannot be left blank!"
    )

    # find_by_name
    @classmethod
    def find_by_name(cls, name):
        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()

        query = "SELECT * FROM {table} WHERE name=?".format(table=cls.TABLE_NAME)
        result = cursor.execute(query, (name,))
        row = result.fetchone()

        if row:
            item = cls(*row)
        else:
            item = None

        connection.close()
        return item

    @jwt_required()
    def get(self, name):
        # Authenticate
        identity = get_jwt_identity()
        # If no jwt
        if not identity:
            return {'message': 'No permission'}, 401

        # sql
        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()

        query = "SELECT * FROM {table} WHERE name=?".format(table=self.TABLE_NAME)
        result = cursor.execute(query, (name,))
        row = result.fetchone()
        connection.close()

        if row:
            return {'item': {'name': row[0], 'price': row[1]}}
        else:
            return {'message': "Item not found"}, 404

    @jwt_required()
    def post(self, name):
        # Check if item exists
        if Item.find_by_name(name):
            return {'message': "An item with name '{}' already exists.".format(name)}, 400
        
        # SQL
        data = Item.parser.parse_args()
        item = {'name': name, 'price': data['price']}

        try:
            self.insert(item)
        except:
            return {'message': 'An error occurred inserting the item.'}, 500
        
        return item, 201
        

    @classmethod
    def insert(cls, item):
        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()

        query = "INSERT INTO items VALUES (?, ?)"
        cursor.execute(query, (item['name'], item['price']))

        connection.commit()
        connection.close()

    @jwt_required()
    def delete(self, name):
        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()

        query = "DELETE FROM items WHERE name=?"
        cursor.execute(query, (name,))

        connection.commit()
        connection.close()

        return {'message': 'Item deleted'}

    @jwt_required()
    def put(self, name):
        # Check if item exists
        data = Item.parser.parse_args()
        item = Item.find_by_name(name)
        updated_item = {'name': name, 'price': data['price']}

        if item is None:
            try:
                self.insert(updated_item)
            except:
                return {'message': 'An error occurred inserting the item.'}, 500
        else:
            try:
                self.update(updated_item)
            except:
                return {'message': 'An error occurred updating the item.'}, 500
        return updated_item

    @classmethod
    def update(cls, item):
        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()

        query = "UPDATE items SET price=? WHERE name=?"
        cursor.execute(query, (item['price'], item['name']))

        connection.commit()
        connection.close()

class ItemList(Resource):
    def get(self):
        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()

        query = "SELECT * FROM items"
        result = cursor.execute(query)
        items = []
        for row in result:
            items.append({'name': row[0], 'price': row[1]})

        connection.close()

        return {'items': items}