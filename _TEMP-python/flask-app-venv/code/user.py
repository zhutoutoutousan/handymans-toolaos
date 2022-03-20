from sqlite3 import dbapi2


class User:
    def __init__(self, _id, name, email, password):
        self.id = _id
        self.name = name
        self.email = email
        self.password = password

    def __str__(self):
        return f'{self.name} {self.email} {self.password}'

    def __repr__(self):
        return f'{self.name} {self.email} {self.password}'
    
    def __getitem__(self, item):
        return self.json()[item]

    def json(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'password': self.password
        }
    
    @classmethod
    def find_by_name(cls, name):
        return cls.query.filter_by(name=name).first()

    @classmethod
    def find_by_email(cls, email):
        return cls.query.filter_by(email=email).first()
    
    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()

    def save_to_db(self):
        dbapi2.session.add(self)
        dbapi2.session.commit()

    def delete_from_db(self):
        dbapi2.session.delete(self)
        dbapi2.session.commit()
    
    @classmethod
    def find_all(cls):
        return cls.query.all()