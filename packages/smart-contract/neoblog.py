from boa.blockchain.vm.Neo.Runtime import CheckWitness
from boa.blockchain.vm.System.ExecutionEngine import GetCallingScriptHash
from neoblog.submitPost import submitPost
from neoblog.addCategory import addPostToCategory

"""
# TODO:
- Uncomment CheckWitness, this is commented for easy testing purposes
- Error handling when "out of bounds" -> ex: post.1234 which does not exist

Example of domain trees
post.latest                     Latest index of a post in common - Done
post.{postIndex}                Getting a post by index - Done
post.data.{IPFS_PostHash}       Getting a post by Hash From IPFS - Done
post.{postHash}.subCategories   Getting a list of subcategories -> [{s1,s2,..}] - Done
post.{IPFS_PostHash}            Getting post by Hash from IPFS (Optional)

category.{categoryName}.latest        Latest index of a certain category - Done
category.{CategoryName}.{postIndex}   Getting a post from a certain category by index - Done

user.{userAddress}              User address of a user (Public key/hash) - Done
user.{userAddress}.latest       Getting the latest post index of a certain user - Done
user.{userAddress}.{postIndex}  Getting a post from a certain user by index - Done

user.{userId}.{userName}        ex: user.{userId}.jeroenptrs: jeroenptrs is an example user id

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

  
  authorized = CheckWitness(user)
  if not authorized:
    print("Not authorized")
    return False
  
  user = args[0]
  result = GetCallingScriptHash()

  if operation != None:
    if operation == 'submitPost':
      submitPost(args)
      return True
    if operation == 'addPostToCategory':
      addPostToCategory(args)
      return True
