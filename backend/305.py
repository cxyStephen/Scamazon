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
    desc = req.get('desc', 'NULL')
    manufacturer = '"{}"'.format(req.get('manufacturer'))
    category = '"{}"'.format(req.get('category'))

    if (desc != 'NULL'):
        desc = '"{}"'.format(desc)

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
    
    return jsonify(success=True, message="successfully created new listing for " + str(quantity) + " of item #" + str(item) + " for " + str(price) + " cents each by seller " + seller), 200

@app.route('/create_payment', methods=['POST'])
def create_payment():
    req = request.get_json()
    ptype =   '"{}"'.format(req.get('type'))
    key =     '"{}"'.format(req.get('key'))
    exp =                   req.get('exp', 'NULL')
    cvv =                   req.get('cvv', 'NULL')
    billing =               req.get('billing', 'NULL')
    user =    '"{}"'.format(req.get('user'))

    if (exp != 'NULL'):
        exp = '"{}"'.format(exp)

    try:
        query.execute(insert.payment(ptype, key, exp, cvv, billing, user))
    except Exception as e:
        return error_response(e)
    
    return jsonify(success=True, message="successfully created new payment for " + user), 200

@app.route('/create_address', methods=['POST'])
def create_address():
    req = request.get_json()
    name =    '"{}"'.format(req.get('name'))
    address = '"{}"'.format(req.get('address'))
    city =    '"{}"'.format(req.get('city'))
    state =   '"{}"'.format(req.get('state'))
    country = '"{}"'.format(req.get('country'))
    zipcode =               req.get('zip')
    user =    '"{}"'.format(req.get('user'))

    try:
        query.execute(insert.address(name, address, city, state, country, zipcode, user))
    except Exception as e:
        return error_response(e)
    
    return jsonify(success=True, message="successfully created new address for " + name), 200

@app.route('/create_review', methods=['POST'])
def create_review():
    req = request.get_json()
    rating =               req.get('rating')
    title =  '"{}"'.format(req.get('title'))
    desc =   '"{}"'.format(req.get('desc'))
    user =   '"{}"'.format(req.get('user'))

    rtype = req.get('type')
    rid =   req.get('id')

    try:
        if (rtype == 'item'):
            query.execute(insert.item_review(rating, title, desc, user, rid))
        elif (rtype == 'seller'):
            query.execute(insert.seller_review(rating, title, desc, user, '"{}"'.format(rid)))
        else:
            return error_response("invalid review type")
    except Exception as e:
        return error_response(e)
    
    return jsonify(success=True, message="successfully created new " + str(rtype) + " review for " + str(rid)), 200

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
        out.append({'item_id': val[0], 'name': val[1], 'desc': val[2],
                    'manufacturer': val[3], 'category': val[4]})

    return jsonify(success=True, items=out), 200

@app.route('/get_payments', methods=['GET'])
def get_payments():
    req = request.get_json()
    user = '"{}"'.format(req.get('user'))

    try:
        query.execute(select.payments(user))    
    except Exception as e:
        return error_response(e)

    out = []
    for val in query:
        out.append({'payment_id': val[0], 'payment_type': val[1], 'payment_key': val[2],
                    'exp_date': val[3], 'cvv': val[4], 'billing_address': val[5]})

    return jsonify(success=True, addresses=out), 200

@app.route('/get_addresses', methods=['GET'])
def get_addresses():
    req = request.get_json()
    user = '"{}"'.format(req.get('user'))

    try:
        query.execute(select.addresses(user))    
    except Exception as e:
        return error_response(e)

    out = []
    for val in query:
        out.append({'address_id': val[0], 'name': val[1], 'address': val[2],
                    'city': val[3], 'state': val[4], 'country': val[5], 'zip': val[6]})

    return jsonify(success=True, addresses=out), 200

@app.route('/get_reviews', methods=['GET'])
def get_reviews():
    req = request.get_json()
    rtype = req.get('type')
    rid   = req.get('id')
    
    out = []
    avg = 0.0
    try:
        if (rtype == 'item'):
            query.execute(select.item_reviews(rid))
        elif (rtype == 'seller'):
            query.execute(select.seller_reviews('"{}"'.format(rid)))
        else:
            return error_response("invalid review type")

        for val in query:
            out.append({'rating': val[0], 'title': val[1], 'desc': val[2], 'user': val[3]})

        if (rtype == 'item'):
            query.execute(select.item_review_avg(rid))
        elif (rtype == 'seller'):
            query.execute(select.seller_review_avg('"{}"'.format(rid)))

        avg = query.fetchone()[0]
    except Exception as e:
        return error_response(e)

    return jsonify(success=True, reviews=out, average_rating=float(avg)), 200

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