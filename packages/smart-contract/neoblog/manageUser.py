from neoblog.lib.upsert import upsert

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
