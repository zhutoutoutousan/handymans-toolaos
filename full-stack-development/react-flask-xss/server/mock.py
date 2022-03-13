#!/usr/bin/env python
# Mock store data for app.py
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

# export
def get_store():
    return store
