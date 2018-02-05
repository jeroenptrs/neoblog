from boa.blockchain.vm.Neo.Runtime import CheckWitness
from boa.blockchain.vm.Neo.Storage import GetContext, Get, Put
from boa.code.builtins import concat, substr


***
==========================
===== MAIN FUNCTIONS =====
==========================
***
***
Storing a post hash on the BC
  :param args: list of arguments
    args[0] always sender hash
    args[1] post content hash on IPFS
    args[2..11] extra categories (max 10)
  :param type: str
***
def submitPost(args):
  user = args[0]
  postHash = args[1]
  categoryList = getCategories(args)

  postToStore = concat(postHash, categoryList)

  Put(GetContext, postToStore)
  return True


***
Getting the post hash from BC
  :param args: list of arguments
    args[0] always sender hash
    args[1] post content hash on IPFS
  :param type: str
***
def getPost(args):
  user = args[0]
  postHash = args[1]
  categoryList = getCategories(args)

  postToGet = concat(postHash, categoryList)

  Get(GetContext, postToGet)
  return True



***
==========================
==== HELPER FUNCTIONS ====
==========================
***
def getCategories(args):
    i = 2
    categoryList = []

    while i<len(args - 2):
      categoryList = concat(',', args[i])
    return categoryList


def IncrementIndexes():
  print('Incrementing indexes..')
  return True

def getIndexes():
  print('Getting indexes..')
  return True



***
==========================
========== MAIN ==========
==========================
***
def Main(operation, args):

  ***
  Main for SC

  :param operation: The function performed
  :type operation: str

  :param args: list of arguments
    args[0] always sender hash
  :param type: str

  ***

  user = args[0]
  authorized = CheckWitness(user)
  if not authorized:
    print("Not authorized")
    return False

  if operation != None:
    if operation == 'submitPost':
        submitPost(args)
        return True
    if operation == 'getPost':
        getPost(args)
        return True
