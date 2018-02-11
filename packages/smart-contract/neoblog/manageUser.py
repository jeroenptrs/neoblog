from boa.blockchain.vm.Neo.Storage import GetContext, Get, Put
from boa.code.builtins import concat

"""
Inserting a username at user.userid.{userAddress} = {displayName}
Inserting userId at user.{displayName} = {userAddress}
"""

def insertUser(args):
    user = args[0]
    userName = args[1]

    upsert(user, userName)
    return True


def updateUser(args):
    user = args[0]
    userName = args[1]

    upsert(user, userName)
    return True


def upsert(user, userName):
    upsertDomain = concat("user.userId.", userName)
    Put(GetContext, upsertDomain, user)
    return True