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

@app.route('/create_user', methods=['POST'])
def create_user():
    req = request.args
    email = req.get('email')
    pw = req.get('pw')

    try:
        query.execute(insert.users(email, pw))
    except Exception as e:
        return error_response(e)
    
    return jsonify(success=True, message="successfully created new user " + email), 200

@app.route('/create_customer', methods=['POST'])
def create_customer():
    req = request.args
    name1 = req.get('fname')
    name2 = req.get('lname')
    email = req.get('email')

    try:
        query.execute(insert.shoppingcart())
        query.execute(select.last_inserted_cart())
        cart_id = query.fetchone()[0]
        query.execute(insert.customer(email, name1, name2, cart_id))
    except Exception as e:
        return error_response(e)
    
    return jsonify(success=True, message="successfully created new customer " + name1[:-1] + " " + name2[1:]), 200

@app.route('/create_seller', methods=['POST'])
def create_seller():
    req = request.args
    name = req.get('name')
    email = req.get('email')

    try:
        query.execute(insert.seller(email, name))
    except Exception as e:
        return error_response(e)
    
    return jsonify(success=True, message="successfully created new seller " + name), 200

@app.route('/get_sellers', methods=['GET'])
def get_sellers():
    try:
        query.execute(select.sellers())    
    except Exception as e:
        return error_response(e)

    out = []
    for val in query:
        out.append({'display_name': val[0], 'email': val[1]})

    return jsonify(success=True, sellers=out), 200

def error_response(e):
    return jsonify(success=False, message=str(e)), 500