def users(Email, PW):
    return '''
    INSERT INTO users(Email, PW) VALUES ({}, {})
    '''.format(Email, PW)

def customer(Email, FirstName, LastName):
    return '''
    INSERT INTO shoppingcart(CartID) VALUES (NULL);
    INSERT INTO customer(Email, FirstName, LastName, CurrentCart) VALUES ({}, {}, {}, LAST_INSERT_ID())
    '''.format(Email, FirstName, LastName)

def seller(Email, DisplayName):
    return '''
    INSERT INTO seller(Email, DisplayName) VALUES ({}, {})
    '''.format(Email, DisplayName)