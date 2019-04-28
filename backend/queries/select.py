def last_inserted_cart():
    return '''
    SELECT LAST_INSERT_ID()
    '''

def sellers():
    return '''
    SELECT DisplayName, Email FROM seller
    '''