from db import db

class UserModel(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80))
    password = db.Column(db.String(80))

    def __init__(self, username, password):
        self.username = username
        self.password = password

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_username(cls, username):
        return cls.query.filter_by(username=username).first()

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()

    def json(self):
        return {'username': self.username, 'password': self.password}

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    def update_password(self, new_password):
        self.password = new_password
        db.session.commit()

    def update_username(self, new_username):
        self.username = new_username
        db.session.commit()
    
    def update_password_and_username(self, new_password, new_username):
        self.password = new_password
        self.username = new_username
        db.session.commit()

    def __repr__(self):
        return '<User {}>'.format(self.username)

    def __str__(self):
        return 'User {}'.format(self.username)

    def __eq__(self, other):
        return self.username == other.username and self.password == other.password

    def __hash__(self):
        return hash((self.username, self.password))

    def __ne__(self, other):
        return self.username != other.username or self.password != other.password
    
    def __lt__(self, other):
        return self.username < other.username or self.password < other.password

    def __le__(self, other):
        return self.username <= other.username or self.password <= other.password
