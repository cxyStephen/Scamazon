def cart_quantity(CartID, Item, Seller, Quantity):
    return '''
    UPDATE shoppingcartcontents SET Quantity={} WHERE CartID={} AND Item={} AND Seller={}
    '''.format(Quantity, CartID, Item, Seller)

def listing(Item, Seller, Quantity, Price):
    return '''
    UPDATE listing SET Quantity={}, Price={} WHERE Seller={} AND Item={}
    '''.format(Quantity, Price, Seller, Item)

def cart_remove(CartID, Item, Seller):
    return '''
    DELETE FROM shoppingcartcontents WHERE CartID={} AND Item={} AND Seller={}
    '''.format(CartID, Item, Seller)

def remove_listing_from_all_carts(Item, Seller):
    return '''
    DELETE FROM shoppingcartcontents WHERE Item={} AND Seller={}
    '''.format(Item, Seller)

def listing_remove(Item, Seller):
    return '''
    DELETE FROM listing WHERE Seller={} AND Item={}
    '''.format(Seller, Item)

def user_cart(Email, CartID):
    return '''
    UPDATE customer SET CurrentCart={} WHERE Email={}
    '''.format(CartID, Email)

def address(AddressID, RecipientName, Address, City, State, Country, Zip, UserID):
    return '''
    UPDATE address SET RecipientName={}, Address={}, City={}, State={}, Country={}, Zip={} WHERE UserID={} AND AddressID={}
    '''.format(RecipientName, Address, City, State, Country, Zip, UserID, AddressID)

def payment(PaymentID, PaymentType, PaymentKey, ExpirationDate, CVV, BillingAddress, UserID):
    if(ExpirationDate != 'NULL'):
        ExpirationDate = "STR_TO_DATE({}, '%m/%Y')".format(ExpirationDate)
    return '''
    UPDATE payment SET PaymentType={}, PaymentKey={}, ExpirationDate={}, CVV={}, BillingAddress={} WHERE UserID={} AND PaymentID={}
    '''.format(PaymentType, PaymentKey, ExpirationDate, CVV, BillingAddress, UserID, PaymentID)

def address_remove(UserID, AddressID):
    return '''
    DELETE FROM address WHERE UserID={} AND AddressID={}
    '''.format(UserID, AddressID)

def payment_remove(UserID, PaymentID):
    return '''
    DELETE FROM payment WHERE UserID={} AND PaymentID={}
    '''.format(UserID, PaymentID)
    