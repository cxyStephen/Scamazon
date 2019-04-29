def last_inserted_cart():
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

def items():
    return '''
    SELECT ItemID, ItemName, Summary, Manufacturer, Category FROM item
    '''

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

def item_reviews(ItemID):
    return '''
    SELECT Rating, Title, Body, Customer FROM review WHERE ItemID={}
    '''.format(ItemID)

def seller_reviews(Seller):
    return '''
    SELECT Rating, Title, Body, Customer FROM review WHERE Seller={}
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