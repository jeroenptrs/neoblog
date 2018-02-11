from boa.blockchain.vm.Neo.Runtime import CheckWitness
from boa.blockchain.vm.System.ExecutionEngine import GetCallingScriptHash
from neoblog.submitPost import submitPost
from neoblog.manageUser import insertUser, updateUser
from neoblog.addToCategory import addPostToCategory

"""
==========================
========== MAIN ==========
==========================
"""
def Main(operation, args):

  """
  Main for SC

    :param operation: The function performed
    :type operation: str

    :param args: list of arguments
      args[0] always sender hash
    :param type: str

  """
  user = args[0]
  result = GetCallingScriptHash()

  authorized = CheckWitness(user)
  if not authorized:
    print("Not authorized")
    return False

  if operation != None:
    # Requires: user, postHash, category
    if operation == 'submitPost':
      if len(args) == 3:
        submitPost(args)

    # Requires: user, postHash, category - optionally more categories
    if operation == 'addPostToCategory':
      if len(args) >= 3:
        addPostToCategory(args)
    
    # Requires: user, userName
    if operation == 'insertUser':
      if len(args) == 2:
        insertUser(args)

    # Requires user, userName
    if operation == 'updateUser':
      if leng(args) == 2:
        updateUser(args)    
  return False
  # Signals a bad request has been made without a known or even any operation
