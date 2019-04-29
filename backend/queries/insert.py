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