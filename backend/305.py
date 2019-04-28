from flask import Flask, request, jsonify
from flask_cors import CORS
from queries import insert, select

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

    try:
        query.execute(insert.user(email, pw))
        query.execute(insert.seller(email, name))
    except Exception as e:
        return jsonify(success=False, message=str(e)), 200
    
    return jsonify(success=True, message="successfully created new seller " + name), 200

@app.route('/get_sellers', methods=['GET'])
def get_sellers():
    try:
        query.execute(select.seller_names())    
    except Exception as e:
        return jsonify(success=False, message=str(e)), 200

    out = []
    for val in query:
        out.append(val[0])
        
    return jsonify(sellers=out), 200