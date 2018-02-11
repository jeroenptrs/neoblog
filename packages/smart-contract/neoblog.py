from boa.blockchain.vm.Neo.Runtime import CheckWitness
from boa.blockchain.vm.System.ExecutionEngine import GetCallingScriptHash
from boa.code.builtins import hash160
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

  argLen = len(args)

  if operation != None:
    # Requires: user, postHash, category
    if operation == 'submitPost':
      if argLen == 3:
        submitPost(args)

    # Requires: user, postHash, category - optionally more categories
    if operation == 'addPostToCategory':
      if argLen >= 3:
        addPostToCategory(args)
    
    # Requires: user, userName
    if operation == 'insertUser':
      if argLen == 2:
        insertUser(args)

    # Requires user, userName
    if operation == 'updateUser':
      if argLen == 2:
        updateUser(args)    
  return False
  # Signals a bad request has been made without a known or even any operation
