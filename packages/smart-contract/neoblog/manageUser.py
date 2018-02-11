from boa.blockchain.vm.Neo.Storage import GetContext, Get, Put
from boa.blockchain.vm.System.ExecutionEngine import GetCallingScriptHash
from boa.code.builtins import concat

"""
Inserting a username at user.userid.{userAddress} = {displayName}
Inserting userId at user.{displayName} = {userAddress}
"""

def insertUser(args):
    user = args[0]
    userName = args[1]

    upsert(user, userName, True)
    return True


def updateUser(args):
    user = args[0]

    caller = GetCallingScriptHash()

    # Is the user who wants to modify a certain entry, the owner?
    if caller == user:
        upsert(user, userName, False)
        return True
    return False


def upsert(user, userName, checkNeeded):
    upsertDomain = concat("user.userId.", userName)

    # Validate the username does not exist
    if checkNeeded:
        condition = Get(GetContext, upsertDomain)
        if condition != ''
            return False

    Put(GetContext, upsertDomain, user)
    return True