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