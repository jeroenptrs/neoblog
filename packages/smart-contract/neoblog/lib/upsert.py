from boa.blockchain.vm.Neo.Storage import GetContext, Put
from boa.code.builtins import concat

def upsert(user, userName):
    upsertDomain = concat("user.userId.", userName)
    Put(GetContext, upsertDomain, user)
    return True
    