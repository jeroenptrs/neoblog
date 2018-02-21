from boa.blockchain.vm.Neo.Storage import GetContext, Get, Put
from boa.code.builtins import concat

"""
Inserting a username at user.userid.{displayName} = {userAddress}
Inserting userId at user.{userAddress} = {displayName}
"""

def manageUser(args):
    user = args[0]
    userName = args[1]
    prevUserName = args[2]

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

    """
    Clear out/unlink previous userName user.userid.{displayName} = ''
    """
    prevUserIdDomain = concat("user.userId.", prevUserName)
    prevCondition = Get(GetContext, prevUserIdDomain)
    if condition != '':
        return False
    Put(GetContext, prevUserIdDomain, '')

    return True
