from flask import Flask, request, jsonify
from flask_cors import CORS

import mysql.connector

app = Flask(__name__)
CORS(app)

database = mysql.connector.connect(
        database="305",
        host="localhost",
        user="root",
        passwd="password"
    )
query = database.cursor()

@app.after_request
def after_request(response):
    if query is not None:
        database.commit()
    return response

@app.route('/')
def hello_world():
    query.execute('SHOW TABLES')

    out = 'Tables: '
    for x in query:
        out += str(x[0]) + ' '
        
    return out

@app.route('/create_seller', methods=['POST'])
def create_seller():
    req = request.args
    name = req.get('name')
    email = req.get('email')
    pw = req.get('pw')

    values = insert_format([email, pw])
    query.execute("INSERT INTO user(Email, PW) VALUES " + values)

    values = insert_format([email, name])
    query.execute("INSERT INTO seller(Email, DisplayName) VALUES " + values)
    return jsonify(success=True, message="successfully created new seller " + name), 200

@app.route('/get_sellers', methods=['GET'])
def get_sellers():
    query.execute("SELECT DisplayName FROM seller")
    out = []
    for val in query:
        out.append(val[0])
    return jsonify(sellers=out), 200

def insert_format(v):
    out = '('
    for val in v:
        out += val + ','
    out = out[:-1] + ')'
    return out
