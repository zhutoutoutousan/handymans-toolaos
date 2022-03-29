from db import db

class FeedModel(db.Model):
    __tablename__ = 'feeds'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    feed = db.Column(db.String(80))
    users = db.relationship('UserModel', secondary='user_feeds')

    def __init__(self, name, price, store_id):
        self.name = name
        self.price = price
        self.store_id = store_id
    # RSS Feed
    def json(self):
        return {
            # RSS feed attributes
            'id': self.id,
            'name': self.name,
            'feedUrl': self.feed,
            'users': [user.json() for user in self.users],

        }

    @classmethod
    def find_by_name(cls, name):
        return cls.query.filter_by(name=name).first()

    @classmethod
    def find_all(cls):
