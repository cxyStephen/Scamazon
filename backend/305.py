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
    req = request.get_json()
    email = '"{}"'.format(req.get('email'))
    pw =    '"{}"'.format(req.get('pw'))

    try:
        query.execute(insert.users(email, pw))
    except Exception as e:
        return error_response(e)
    
    return jsonify(success=True, message="successfully created new user " + email), 200

@app.route('/create_customer', methods=['POST'])
def create_customer():
    req = request.get_json()
    name1 = '"{}"'.format(req.get('fname'))
    name2 = '"{}"'.format(req.get('lname'))
    email = '"{}"'.format(req.get('email'))

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
    req = request.get_json()
    name =  '"{}"'.format(req.get('name'))
    email = '"{}"'.format(req.get('email'))

    try:
        query.execute(insert.seller(email, name))
    except Exception as e:
        return error_response(e)
    
    return jsonify(success=True, message="successfully created new seller " + name), 200

@app.route('/create_item', methods=['POST'])
def create_item():
    req = request.get_json()
    name = '"{}"'.format(req.get('name'))
    desc = '"{}"'.format(req.get('desc', 'NULL'))
    print(desc)
    manufacturer = req.get('manufacturer')
    category = req.get('category')

    try:
        query.execute(insert.item(name, desc, manufacturer, category))
    except Exception as e:
        return error_response(e)
    
    return jsonify(success=True, message="successfully created new item " + name), 200

@app.route('/create_listing', methods=['POST'])
def create_listing():
    req = request.get_json()
    item = req.get('item')
    seller = '"{}"'.format(req.get('seller'))
    quantity = req.get('quantity')
    price = req.get('price')

    try:
        query.execute(insert.listing(item, seller, quantity, price))
    except Exception as e:
        return error_response(e)
    
    return jsonify(success=True, message="successfully created new listing for " + quantity + " of item #" + item + " for " + price + "cents each by seller " + seller), 200

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

@app.route('/get_categories', methods=['GET'])
def get_categories():
    try:
        query.execute(select.categories())    
    except Exception as e:
        return error_response(e)

    out = []
    for val in query:
        out.append(val[0])

    return jsonify(success=True, categories=out), 200

@app.route('/get_items', methods=['GET'])
def get_items():
    try:
        query.execute(select.items())    
    except Exception as e:
        return error_response(e)

    out = []
    for val in query:
        out.append({'item_id': val[0], 'name': val[1],  'desc': val[2],
                    'manufacturer': val[3],  'category': val[4]})

    return jsonify(success=True, items=out), 200

@app.route('/get_listings', methods=['GET'])
def get_listings():
    try:
        query.execute(select.listings())    
    except Exception as e:
        return error_response(e)

    out = []
    for val in query:
        out.append({'item_name': val[0], 'item_id': val[1],  'price': val[2],
                    'seller_name': val[3],  'seller_id': val[4], 'quantity': val[5]})

    return jsonify(success=True, listings=out), 200

@app.route('/login', methods=['GET'])
def login():
    req = request.get_json()
    email = '"{}"'.format(req.get('email'))
    pw =    '"{}"'.format(req.get('pw'))

    try:
        query.execute(select.user_exists(email))
        if (query.fetchone()[0] == 0):
            return error_response("no such user " + email)
        query.execute(select.password_matches(email, pw))
        if (query.fetchone()[0] == 0):
            return error_response("incorrect password")
        
    except Exception as e:
        return error_response(e)

    return jsonify(success=True, message="successfully logged in " + email)


def error_response(e):
    return jsonify(success=False, message=str(e)), 500