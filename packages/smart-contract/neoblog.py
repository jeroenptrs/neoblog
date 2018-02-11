from boa.blockchain.vm.Neo.Runtime import CheckWitness
from boa.blockchain.vm.System.ExecutionEngine import GetCallingScriptHash
from neoblog.submitPost import submitPost
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
    if operation == 'submitPost':
      submitPost(args)
    if operation == 'addPostToCategory':
      addPostToCategory(args)
  return False
  # Signals a bad request has been made without a known or even any operation
