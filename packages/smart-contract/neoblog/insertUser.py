from boa.blockchain.vm.Neo.Storage import GetContext, Get, Put
from boa.code.builtins import concat

"""
Inserting a username at user.userid.{userAddress} = {displayName}
Inserting userId at user.{displayName} = {userAddress}
"""

def registerUser(args):
    return True

def updateUser(args):
    return True