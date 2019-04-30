def change_quantity(CartID, Item, Seller, Quantity):
    return '''
    UPDATE shoppingcartcontents SET Quantity={} WHERE CartID={} AND Item={} AND Seller={}
    '''.format(Quantity, CartID, Item, Seller)

def remove_from_cart(CartID, Item, Seller):
    return '''
    DELETE FROM shoppingcartcontents WHERE CartID={} AND Item={} AND Seller={}
    '''.format(CartID, Item, Seller)