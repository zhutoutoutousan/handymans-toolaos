# Feedly API
# https://developer.feedly.com/v3/categories/
from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app)

@app.route('/') # http://feedly.com/v3/<userId>
def home():
    return "Hello, World!"

@app.route('/feedly/<userId>') # http://feedly.com/v3/<userId>
def feedly(userId):
    # Get categories from Feedly API
    url = "https://cloud.feedly.com/v3/categories/user/" + userId
    headers = {'Authorization': 'OAuth ' + '<access_token>'}
    response = requests.get(url, headers=headers)
    data = response.json()

    # Get categories from Feedly API
    url = "https://cloud.feedly.com/v3/streams/contents"
    headers = {'Authorization': 'OAuth ' + '<access_token>'}
    response = requests.get(url, headers=headers)
    data = response.json()

    # Return categories
    return jsonify(data)

@app.route('/feedly/<userId>/<categoryId>') # http://feedly.com/v3/<userId>/<categoryId>
def feedly_category(userId, categoryId):
    # Get categories from Feedly API
    url = "https://cloud.feedly.com/v3/streams/contents"
    headers = {'Authorization': 'OAuth ' + '<access_token>'}
    response = requests.get(url, headers=headers)
    data = response.json()

    # Return categories
    return jsonify(data)

# Entries API
@app.route('/entries/<userId>') # http://feedly.com/v3/entries/<userId>
def entries(userId):
    # Get entries from Feedly API
    url = "https://cloud.feedly.com/v3/entries"
    headers = {'Authorization': 'OAuth ' + '<access_token>'}
    response = requests.get(url, headers=headers)
    data = response.json()

    # Return entries
    return jsonify(data)

# Enterprise API
@app.route('/enterprise/<userId>') # http://feedly.com/v3/enterprise/<userId>
def enterprise(userId):
    # Get enterprise from Feedly API
    url = "https://cloud.feedly.com/v3/enterprise"
    headers = {'Authorization': 'OAuth ' + '<access_token>'}
    response = requests.get(url, headers=headers)
    data = response.json()

    # Return enterprise
    return jsonify(data)

# PORT: 5000
app.run(debug=True, port=5000)
