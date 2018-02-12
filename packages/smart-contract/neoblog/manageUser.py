from boa.blockchain.vm.Neo.Storage import GetContext, Get, Put
from boa.code.builtins import concat

"""
Inserting a username at user.userid.{userAddress} = {displayName}
Inserting userId at user.{displayName} = {userAddress}
"""

def manageUser(args):
    user = args[0]
    userName = args[1]

    """
    Adding to user domain
    user.{user}             Getting the userid of a user
    user.userid.{userName}  Getting the address hash of a user
    """

    userIdDomain = concat("user.userId.", userName)
    # Validation check if userid already exists
    condition = Get(GetContext, userIdDomain) 
    if condition != '':
        return False
    Put(GetContext, userIdDomain, user)

    userDomain = concat("user.", user)
    Put(GetContext, userDomain, userName)

    return True
