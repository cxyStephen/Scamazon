from flask import Flask, request, jsonify, g
from flask_cors import CORS
from queries import insert, select, update

import mysql.connector

app = Flask(__name__)
CORS(app)

def connect_db():
    if not hasattr(g, 'database'):
        g.database = mysql.connector.connect(
            database="305",
            host="localhost",
            user="root",
            passwd="password"
        )
        g.cursor = g.database.cursor()
    return g.database

def process_strings(dictionary):
    for (k, v) in dictionary.items():
        if (type(v) == str):
            dictionary[k] = '"{}"'.format(v)
    return dictionary

@app.before_request
def before_request():
  g.database = connect_db()

@app.after_request
def after_request(response):
    if g.cursor is not None:
        if response.status_code == 200:
            g.database.commit()
        g.cursor.close()
    return response

@app.teardown_request
def teardown_request(exception):
    database = getattr(g, 'database', None)
    if database is not None:
        database.close()

@app.route('/')
def hello_world():
    query = g.cursor
    query.execute('SHOW TABLES')

    out = 'Tables: '
    for x in query:
        out += str(x[0]) + ' '
        
    return out

@app.route('/create_user', methods=['POST'])
def create_user():
    query = g.cursor
    req = process_strings(request.get_json())
    email = req.get('email')
    pw =    req.get('pw')

    try:
        query.execute(insert.users(email, pw))
    except Exception as e:
        return error_response(e)
    
    return jsonify(success=True, message="successfully created new user " + email), 200

@app.route('/create_customer', methods=['POST'])
def create_customer():
    query = g.cursor
    req = process_strings(request.get_json())
    name1 = req.get('fname')
    name2 = req.get('lname')
    email = req.get('email')

    try:
        query.execute(insert.shoppingcart())
        query.execute(select.last_inserted())
        cart_id = query.fetchone()[0]
        query.execute(insert.customer(email, name1, name2, cart_id))
    except Exception as e:
        return error_response(e)
    
    return jsonify(success=True, message="successfully created new customer " + name1[:-1] + " " + name2[1:]), 200

@app.route('/create_seller', methods=['POST'])
def create_seller():
    query = g.cursor
    req = process_strings(request.get_json())
    name =  req.get('name')
    email = req.get('email')

    try:
        query.execute(insert.seller(email, name))
    except Exception as e:
        return error_response(e)
    
    return jsonify(success=True, message="successfully created new seller " + name), 200

@app.route('/create_item', methods=['POST'])
def create_item():
    query = g.cursor
    req = process_strings(request.get_json())
    name = req.get('name')
    desc = req.get('desc', 'NULL')
    man =  req.get('manufacturer')
    cat =  req.get('category')

    try:
        query.execute(insert.item(name, desc, man, cat))
    except Exception as e:
        return error_response(e)
    
    return jsonify(success=True, message="successfully created new item " + name), 200

@app.route('/create_listing', methods=['POST'])
def create_listing():
    query = g.cursor
    req = process_strings(request.get_json())
    item =   req.get('item')
    seller = req.get('seller')
    quant =  req.get('quantity')
    price =  req.get('price')

    try:
        query.execute(insert.listing(item, seller, quant, price))
    except Exception as e:
        return error_response(e)
    
    return jsonify(success=True, message="successfully created new listing for " + str(quant) + " of item #" + str(item) + " for " + str(price) + " cents each by seller " + seller), 200

@app.route('/create_payment', methods=['POST'])
def create_payment():
    query = g.cursor
    req = process_strings(request.get_json())
    ptype =   req.get('type')
    key =     req.get('key')
    exp =     req.get('exp', 'NULL')
    cvv =     req.get('cvv', 'NULL')
    billing = req.get('billing', 'NULL')
    user =    req.get('user')

    try:
        query.execute(insert.payment(ptype, key, exp, cvv, billing, user))
    except Exception as e:
        return error_response(e)
    
    return jsonify(success=True, message="successfully created new payment for " + user), 200

@app.route('/create_address', methods=['POST'])
def create_address():
    query = g.cursor
    req = process_strings(request.get_json())
    name =    req.get('name')
    address = req.get('address')
    city =    req.get('city')
    state =   req.get('state')
    country = req.get('country')
    zipcode = req.get('zip')
    user =    req.get('user')

    try:
        query.execute(insert.address(name, address, city, state, country, zipcode, user))
    except Exception as e:
        return error_response(e)
    
    return jsonify(success=True, message="successfully created new address for " + name), 200

@app.route('/create_review', methods=['POST'])
def create_review():
    query = g.cursor
    req = process_strings(request.get_json())
    rating = req.get('rating')
    title =  req.get('title')
    desc =   req.get('desc')
    user =   req.get('user')

    rtype =  req.get('type')
    rid =    req.get('id')

    try:
        if (rtype == 'item'):
            query.execute(insert.item_review(rating, title, desc, user, rid))
        elif (rtype == 'seller'):
            query.execute(insert.seller_review(rating, title, desc, user, rid))
        else:
            return error_response("invalid review type")
    except Exception as e:
        return error_response(e)
    
    return jsonify(success=True, message="successfully created new " + str(rtype) + " review for " + str(rid)), 200

@app.route('/get_sellers', methods=['GET'])
def get_sellers():
    query = g.cursor

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
    query = g.cursor

    try:
        query.execute(select.categories())    
    except Exception as e:
        return error_response(e)

    out = []
    for val in query:
        out.append(val[0])

    return jsonify(success=True, categories=out), 200

@app.route('/get_shiptypes', methods=['GET'])
def get_shiptypes():
    query = g.cursor

    try:
        query.execute(select.shiptypes())    
    except Exception as e:
        return error_response(e)

    out = []
    for val in query:
        out.append({'company': val[0], 'speed': val[1], 'price': val[2]})

    return jsonify(success=True, shiptypes=out), 200

@app.route('/get_items', methods=['GET'])
def get_items():
    query = g.cursor

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
    query = g.cursor
    req = process_strings(request.args)
    user = req.get('user')

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
    query = g.cursor
    req = process_strings(request.args)
    user = req.get('user')

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
    query = g.cursor
    req = process_strings(request.args)
    rtype = req.get('type')
    rid   = req.get('id')
    
    out = []
    avg = 0.0
    try:
        if (rtype == 'item'):
            query.execute(select.item_reviews(rid))
        elif (rtype == 'seller'):
            query.execute(select.seller_reviews(rid))
        else:
            return error_response("invalid review type")

        for val in query:
            out.append({'rating': val[0], 'title': val[1], 'desc': val[2], 'user': val[3]})

        if (rtype == 'item'):
            query.execute(select.item_review_avg(rid))
        elif (rtype == 'seller'):
            query.execute(select.seller_review_avg(rid))

        avg = query.fetchone()[0]
    except Exception as e:
        return error_response(e)

    return jsonify(success=True, reviews=out, average_rating=float(avg)), 200

@app.route('/get_all_reviews', methods=['GET'])
def get_all_reviews():
    query = g.cursor
    req = process_strings(request.args)
    rtype = req.get('type', 'NULL')

    out = []
    try:
        if (rtype == 'item'):
            query.execute(select.all_reviews('ItemID'))
        elif (rtype == 'seller'):
            query.execute(select.all_reviews('Seller'))
        elif (rtype == 'NULL'):
            query.execute(select.all_reviews('NULL'))
        else:
            return error_response("invalid review type")
    except Exception as e:
        return error_response(e)

    for val in query:
        out.append({'rating': val[0], 'title': val[1], 'desc': val[2],
                    'user': val[3], 'item_id': val[4], 'seller': val[5]})

    return jsonify(success=True, reviews=out), 200

@app.route('/get_listings', methods=['GET'])
def get_listings():
    query = g.cursor

    try:
        query.execute(select.listings())    
    except Exception as e:
        return error_response(e)

    out = []
    for val in query:
        out.append({'item_name': val[0], 'item_id': val[1], 'price': val[2],
                    'seller_name': val[3], 'seller_id': val[4], 'quantity': val[5]})

    return jsonify(success=True, listings=out), 200

@app.route('/get_cart', methods=['GET'])
def get_cart():
    query = g.cursor
    req = process_strings(request.args)
    user = req.get('user')

    try:
        query.execute(select.user_cart(user))
        cart_id = query.fetchone()[0]
        query.execute(select.cart_contents(cart_id))
    except Exception as e:
        return error_response(e)
        
    out = []
    price = 0
    for val in query:
        out.append({'item_id': val[0], 'item_name': val[1], 'seller': val[2],
                    'quantity': val[3], 'price': val[4]})
        price += val[4] * val[3]

    return jsonify(success=True, contents=out, subtotal=price), 200

@app.route('/login', methods=['GET', 'POST'])
def login():
    query = g.cursor
    req = process_strings(request.get_json())
    email = req.get('email')
    pw =    req.get('pw')

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

@app.route('/add_to_cart', methods=['POST'])
def add_to_cart():
    query = g.cursor
    req = process_strings(request.get_json())
    email =  req.get('email')
    item =   req.get('item')
    seller = req.get('seller')
    quant =  req.get('quantity')

    try:
        query.execute(select.check_stock(item, seller))
        if (query.fetchone()[0] < quant):
            return error_response(seller + " does not have enough " + str(item) + " in stock.")
        
        query.execute(select.user_cart(email))
        cart_id = query.fetchone()[0]
        query.execute(insert.add_to_cart(cart_id, item, seller, quant))
    except Exception as e:
        return error_response(e)

    return jsonify(success=True, message="successfully added " + str(quant) + " of item "+ str(item) + " sold by " + seller + " to " + email +"'s cart")

@app.route('/modify_cart', methods=['PUT'])
def modify_cart():
    query = g.cursor
    req = process_strings(request.get_json())
    email =  req.get('email')
    item =   req.get('item')
    seller = req.get('seller')
    quant =  req.get('quantity')

    try:
        query.execute(select.check_stock(item, seller))
        if (query.fetchone()[0] < quant):
            return error_response(seller + " does not have enough " + str(item) + " in stock.")
        
        query.execute(select.user_cart(email))
        cart_id = query.fetchone()[0]

        if (quant == 0):
            query.execute(update.cart_remove(cart_id, item, seller))
        else:
            query.execute(update.cart_quantity(cart_id, item, seller, quant))
        
    except Exception as e:
        return error_response(e)

    return jsonify(success=True, message="successfully changed quantity of item "+ str(item) + " sold by " + seller + " in " + email +"'s cart to " + str(quant))

@app.route('/modify_listing', methods=['PUT'])
def modify_listing():
    query = g.cursor
    req = process_strings(request.get_json())
    item =   req.get('item')
    seller = req.get('seller')
    quant =  req.get('quantity')
    price =  req.get('price')
    
    try:
        if (quant == 0):
            query.execute(update.listing_remove(item, seller))
        else:
            query.execute(update.listing(item, seller, quant, price))
    except Exception as e:
        return error_response(e)

    return jsonify(success=True, message="successfully changed quantity and price of item " + str(item) + " sold by " + seller + " to " + str(quant) + " and " + str(price))

@app.route('/modify_payment', methods=['PUT', 'DELETE'])
def modify_payment():
    query = g.cursor
    req = process_strings(request.get_json())
    pid =  req.get('id')
    user = req.get('user')

    if (request.method == 'DELETE'):
        try:
            query.execute(update.payment_remove(user, pid))
        except Exception as e:
            return error_response(e)
        return jsonify(success=True, message="successfully deleted payment for " + user), 200

    ptype =   req.get('type')
    key =     req.get('key')
    exp =     req.get('exp', 'NULL')
    cvv =     req.get('cvv', 'NULL')
    billing = req.get('billing', 'NULL')

    try:
        query.execute(update.payment(pid, ptype, key, exp, cvv, billing, user))
    except Exception as e:
        return error_response(e)
    
    return jsonify(success=True, message="successfully created new payment for " + user), 200

@app.route('/modify_address', methods=['POST', 'DELETE'])
def modify_address():
    query = g.cursor
    req = process_strings(request.get_json())
    aid =  req.get('id')
    user = req.get('user')

    if (request.method == 'DELETE'):
        try:
            query.execute(update.address_remove(user, aid))
        except Exception as e:
            return error_response(e)
        return jsonify(success=True, message="successfully deleted address for " + user), 200

    name =    req.get('name')
    address = req.get('address')
    city =    req.get('city')
    state =   req.get('state')
    country = req.get('country')
    zipcode = req.get('zip')

    try:
        query.execute(update.address(aid, name, address, city, state, country, zipcode, user))
    except Exception as e:
        return error_response(e)
    
    return jsonify(success=True, message="successfully updated address for " + name), 200

@app.route('/purchase_cart', methods=['POST'])
def purchase_cart():
    query = g.cursor
    req = process_strings(request.get_json())
    email =   req.get('email')
    payment = req.get('payment_id')
    address = req.get('address_id')
    shipc =   req.get('ship_company')
    ships =   req.get('ship_speed')

    try:
        #get current user cart
        query.execute(select.user_cart(email))
        cart_id = query.fetchone()[0]

        query.execute(select.cart_contents(cart_id))
        cart_contents = []
        price = 0
        for val in query:
            cart_contents.append({'item_id': val[0], 'item_name': val[1], 'seller': val[2],
                        'quantity': val[3], 'price': val[4]})
            price += val[4] * val[3]

        #get shipping price
        query.execute(select.ship_price(shipc, ships))
        ship_price = query.fetchone()[0]

        query.execute(select.distinct_sellers_in_cart(cart_id))
        sellers = []
        for val in query:
            sellers.append(val[0])

        ship_price *= len(sellers)

        #remove quantity from listing
        for item in cart_contents:
            seller = '"{}"'.format(item['seller'])
            query.execute(select.check_stock(item['item_id'], seller))
            current_quantity = query.fetchone()[0]
            new_quantity = current_quantity - item['quantity']
            if (new_quantity < 0):
                return error_response(item['item_name'] + ' does not have enough in stock')
            if (new_quantity == 0):
                query.execute(update.listing_remove(item['item_id'], seller))
            else:
                query.execute(update.listing(item['item_id'], seller, new_quantity, item['price']))

        #add new Purchase(ShoppingCart, Customer, TotalPrice, Payment, Address)
        query.execute(insert.purchase(cart_id, email, price + ship_price, payment, address))
        query.execute(select.last_inserted())
        purchase_id = query.fetchone()[0]

        #for each different seller in cart
        #   add an entry into shipment
        for seller in sellers:
            query.execute(insert.shipment(purchase_id, '"{}"'.format(seller), shipc, ships))

        #create new cart
        query.execute(insert.shoppingcart())
        query.execute(select.last_inserted())
        new_cart_id = query.fetchone()[0]

        #update user current cart
        query.execute(update.user_cart(email, new_cart_id))

    except Exception as e:
        return error_response(e)

    return jsonify(success=True, message="successfully checked out user " + email)

def error_response(e):
    return jsonify(success=False, message=str(e)), 500
    