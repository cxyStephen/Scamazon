def user(Email, PW):
    return '''
    INSERT INTO user(Email, PW) VALUES ({}, {})
    '''.format(Email, PW)

def seller(Email, DisplayName):
    return '''
    INSERT INTO seller(Email, DisplayName) VALUES ({}, {})
    '''.format(Email, DisplayName)