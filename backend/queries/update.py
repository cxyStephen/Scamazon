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

def listing_remove(Item, Seller):
    return '''
    DELETE FROM listing WHERE Seller={} AND Item={}
    '''.format(Seller, Item)