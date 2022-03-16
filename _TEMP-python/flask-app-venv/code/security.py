from user import User

users = [
    User(1, 'bob', 'asafaaf', 'asdf'),
    User(2, 'alice', 'asafasf', 'asdf'),
    User(3, 'joe', 'asafasf', 'asdf')
]

username_mapping = {u['name']: u for u in users}

userid_mapping = {u['id']: u for u in users}

def authenticate(username, password):
    user = username_mapping.get(username, None)
    if user and user['password'] == password:
        return user

def identity(payload):
    user_id = payload['identity']
    return userid_mapping.get(user_id, None)