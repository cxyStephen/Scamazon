def last_inserted_cart():
    return '''
    SELECT LAST_INSERT_ID()
    '''

def sellers():
    return '''
    SELECT DisplayName, Email FROM seller
    '''

def categories():
    return'''
    SELECT CategoryName FROM category
    '''

def items():
    return'''
    SELECT ItemID, ItemName, Summary, Manufacturer, Category FROM item
    '''
    