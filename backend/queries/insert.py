def users(Email, PW):
    return '''
    INSERT INTO users(Email, PW) VALUES ({}, {})
    '''.format(Email, PW)

def shoppingcart():
    return '''
    INSERT INTO shoppingcart(CartID) VALUES (NULL)
    '''

def customer(Email, FirstName, LastName, CartID):
    return '''
    INSERT INTO customer(Email, FirstName, LastName, CurrentCart) VALUES ({}, {}, {}, {})
    '''.format(Email, FirstName, LastName, CartID)

def seller(Email, DisplayName):
    return '''
    INSERT INTO seller(Email, DisplayName) VALUES ({}, {})
    '''.format(Email, DisplayName)

def item(ItemName, Summary, Manufacturer, Category):
    return '''
    INSERT INTO item(ItemName, Summary, Manufacturer, Category) VALUES ({}, {}, {}, {})
    '''.format(ItemName, Summary, Manufacturer, Category)

def listing(Item, Seller, Quantity, Price):
    return '''
    INSERT INTO listing(Item, Seller, Quantity, Price) VALUES ({}, {}, {}, {})
    '''.format(Item, Seller, Quantity, Price)

def payment(PaymentType, PaymentKey, ExpirationDate, CVV, BillingAddress, UserID):
    if(ExpirationDate != 'NULL'):
        ExpirationDate = "STR_TO_DATE({}, '%m/%Y')".format(ExpirationDate)
    return '''
    INSERT INTO payment(PaymentType, PaymentKey, ExpirationDate, CVV, BillingAddress, UserID) VALUES ({}, {}, {}, {}, {}, {})
    '''.format(PaymentType, PaymentKey, ExpirationDate, CVV, BillingAddress, UserID)

def address(RecipientName, Address, City, State, Country, Zip, UserID):
    return '''
    INSERT INTO address(RecipientName, Address, City, State, Country, Zip, UserID) VALUES ({}, {}, {}, {}, {}, {}, {})
    '''.format(RecipientName, Address, City, State, Country, Zip, UserID)

def item_review(Rating, Title, Body, Customer, ItemID):
    return '''
    INSERT INTO review(Rating, Title, Body, Customer, ItemID) VALUES ({}, {}, {}, {}, {})
    '''.format(Rating, Title, Body, Customer, ItemID)

def seller_review(Rating, Title, Body, Customer, Seller):
    return '''
    INSERT INTO review(Rating, Title, Body, Customer, Seller) VALUES ({}, {}, {}, {}, {})
    '''.format(Rating, Title, Body, Customer, Seller)

def add_to_cart(CartID, Item, Seller, Quantity):
    return '''
    INSERT INTO shoppingcartcontents(CartID, Item, Seller, Quantity) VALUES ({}, {}, {}, {})
    '''.format(CartID, Item, Seller, Quantity)