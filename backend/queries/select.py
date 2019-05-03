def last_inserted():
    return '''
    SELECT LAST_INSERT_ID()
    '''

def sellers():
    return '''
    SELECT DisplayName, Email FROM seller
    '''

def categories():
    return '''
    SELECT CategoryName FROM category
    '''

def shiptypes():
    return '''
    SELECT Company, Speed, Price FROM shiptype
    '''

def items():
    return '''
    SELECT ItemID, ItemName, Summary, Manufacturer, Category FROM item
    '''

def item(ItemID):
    return '''
    SELECT ItemID, ItemName, Summary, Manufacturer, Category FROM item WHERE ItemID={}
    '''.format(ItemID)

def listings():
    return '''
    SELECT ItemName, Item, Price, DisplayName, Seller, Quantity FROM listing l JOIN item i ON l.Item = i.ItemID JOIN seller s ON l.seller = s.email
    '''

def payments(User):
    return '''
    SELECT PaymentID, PaymentType, PaymentKey, ExpirationDate, CVV, BillingAddress FROM payment p WHERE p.UserID={}
    '''.format(User)

def addresses(User):
    return '''
    SELECT AddressID, RecipientName, Address, City, State, Country, Zip FROM address a WHERE a.UserID={}
    '''.format(User)

def all_reviews(Type):
    if (Type != 'NULL'):
        return '''
        SELECT Rating, Title, Body, Customer, ItemID, Seller FROM review WHERE {} IS NOT NULL
        '''.format(Type)
    else:
        return '''
        SELECT Rating, Title, Body, Customer, ItemID, Seller FROM review
        '''

def item_reviews(ItemID):
    return '''
    SELECT Rating, Title, Body, Customer, FirstName, LastName FROM review r JOIN customer c ON r.Customer=c.Email WHERE ItemID={}
    '''.format(ItemID)

def seller_reviews(Seller):
    return '''
    SELECT Rating, Title, Body, Customer, FirstName, LastName FROM review r JOIN customer c ON r.Customer=c.Email WHERE Seller={}
    '''.format(Seller)

def item_review_avg(ItemID):
    return '''
    SELECT AVG(Rating) FROM review WHERE ItemID={}
    '''.format(ItemID)

def seller_review_avg(Seller):
    return '''
    SELECT AVG(Rating) FROM review WHERE Seller={}
    '''.format(Seller)

def user_exists(Email):
    return '''
    SELECT COUNT(*) FROM users WHERE Email={}
    '''.format(Email)

def password_matches(Email, Password):
    return '''
    SELECT COUNT(*) FROM users WHERE Email={} AND PW={}
    '''.format(Email, Password)

def check_stock(Item, Seller):
    return '''
    SELECT Quantity FROM listing WHERE Item={} AND Seller={}
    '''.format(Item, Seller)

def user_cart(Email):
    return '''
    SELECT CurrentCart FROM customer WHERE Email={}
    '''.format(Email)

def cart_contents(CartID):
    return '''
    SELECT s.Item, i.ItemName, s.Seller, s.Quantity, l.Price
        FROM shoppingcartcontents s JOIN listing l ON s.item=l.item AND s.seller=l.seller
            JOIN item i ON s.item = i.ItemID WHERE s.CartID={}
    '''.format(CartID)

def ship_price(Company, Speed):
    return '''
    SELECT Price FROM shiptype WHERE Company={} AND Speed={}
    '''.format(Company, Speed)

def distinct_sellers_in_cart(CartID):
    return '''
    SELECT DISTINCT Seller FROM shoppingcartcontents WHERE CartID={}
    '''.format(CartID)
    