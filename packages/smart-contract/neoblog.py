from boa.blockchain.vm.Neo.Runtime import CheckWitness
from boa.blockchain.vm.Neo.Storage import GetContext, Get, Put
from boa.code.builtins import concat, substr
from boa.blockchain.vm.System.ExecutionEngine import GetCallingScriptHash

"""
# TODO:
- "Seed" smart contract -> .latest might not yet exist -> fill with 0
- Error handling when "out of bounds" -> ex: post.1234 which does not exist
- Add user.post, user.xxx domains on every function (Get, Put)
- String -> int conversion and vice versa?
- GetIndexes(domaiName (ex: "post, user, category.categoryName")) returns latest index
- UpdateIndexes (Same as above - but updates it)

Example of domain trees
post.latest                     Latest index of a post in common
post.{postIndex}                Getting a post by index
post.data.{IPFS_PostHash}       Getting a post by Hash From IPFS
post.{IPFS_PostHash}            Getting post by Hash from IPFS (Optional)

category.{crypto}.latest        Latest index of a certain category
category.{crypto}.{postIndex}   Getting a post from a certain category by index

user.{userAddress}              User address of a user (Public key/hash)
user.{userAddress}.latest       Getting the latest post index of a certain user
user.{userAddress}.{postIndex}  Getting a post from a certain user by index

user.{userId}.{userName}        ex: user.{userId}.jeroenptrs: jeroenptrs is an example user id

==========================
===== MAIN FUNCTIONS =====
==========================
Storing a post hash on the BC
  :param args: list of arguments
    args[0] always sender hash
    args[1] post content hash on IPFS
  :param type: str
"""
def submitPost(args):
  # Default args
  user = args[0]
  postHash = args[1]

  # Creating domains
  postDomain = "post."
  userDomain = concat("user.", user)
  postLatestDomain = concat(postDomain, "latest")
  userLatestDomain = concat(userDomain, ".latest")

  """
  Adding to post domain
  post.latest                     Latest index of a post in common
  post.{postIndex}                Getting a post by index
  post.data.{IPFS_PostHash}       Getting a post by Hash From IPFS
  post.{IPFS_PostHash}            Getting post by Hash from IPFS (Optional)
  """
  # Setting post.latest = {postIndex} - increase afterwards
  latestPostIndex = Get(GetContext, postLatestDomain)
  newLatestPostIndex = -1
  if latestPostIndex == '':
    newLatestPostIndex = 0
    Put(GetContext, postLatestDomain, newLatestPostIndex)
  else:
    newLatestPostIndex = latestPostIndex + 1
    Put(GetContext, postLatestDomain, newLatestPostIndex)

  # Setting post.{postIndex} = {postHash}
  postIndexDomain = concat(postDomain, newLatestPostIndex)
  Put(GetContext, postIndexDomain, postHash)

  # Setting post.data.{postHash} = {postIndex}
  postDataDomainTemp = concat(postDomain, 'data.')
  postDataDomain = concat(postDataDomainTemp, postHash)
  Put(GetContext, postDataDomain, newLatestPostIndex)


  # Insert the post on domain "post.{index}"
  postKeyDomain = concat(postDomain, newLatestPostIndex)
  Put(GetContext, postKeyDomain, postHash)

  """
    Adding to user domain
    user.{userAddress}              User address of a user (Public key/hash)
    user.{userAddress}.latest       Getting the latest post index of a certain user
    user.{userAddress}.{postIndex}  Getting a post from a certain user by index
  """
  # Setting user.{userAddress}.latest = {postIndex}
  latestUserPostIndex = Get(GetContext, userLatestDomain)
  newLatestUserPostIndex = -1
  if latestUserPostIndex == '':
    newLatestUserPostIndex = 0
    Put(GetContext, userLatestDomain, newLatestUserPostIndex)
  else:
    newLatestUserPostIndex = latestUserPostIndex + 1
    Put(GetContext, userLatestDomain, newLatestUserPostIndex)

  # Setting user.{userAddress}.{postIndex} = {postHash}
  userIndexDomain = concat(userDomain, newLatestUserPostIndex)
  Put(GetContext, userIndexDomain, postHash)
  return True


"""
Add a post to a certain category
  :param args: list of arguments
    args[0] always sender hash
    args[1] post content hash on IPFS
    args[2..11] extra categories (max 3)
  :param type: str
"""
def addPostToCategory(args):
  # Default args
  user = args[0]
  postHash = args[1]

  # Getting all categories from args
  categoryList = getCategories(args)

  i = 0
  categoryList = []
  while i<len(categoryList):
    categoryName = categoryList[i]

    # Creating domains
    categoryDomainAndName = concat("category.", categoryName)
    categoryLatest = concat(categoryDomainAndName, ".latest")

    
    # Getting and increasing lastest index
    oldLatestIndex = Get(GetContext, categoryLatest)
    newLatestIndex = oldLatestIndex + 1
    Put(GetContext, categoryLatest, newLatestIndex)

    # Insert the post on domain "category.{categoryName}.{index}"
    categoryNewIndex = concat(".", newLatestIndex)
    category = concat(categoryDomainAndName, categoryNewIndex)
    Put(GetContext, category, postHash)
  return True


"""
==========================
==== HELPER FUNCTIONS ====
==========================
"""
def getCategories(args):
  i = 2
  categoryList = []

  argsLen = len(args) - 2

  while i<argsLen:
    element = args[i]
    categoryList = concat(',', element)
    i += 1
    
  return categoryList


def IncrementIndexes():
  print('Incrementing indexes..')
  return True

def getIndexes():
  print('Getting indexes..')
  return True



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

  
  authorized = CheckWitness(user)
  if not authorized:
    print("Not authorized")
    return False
  """
  user = args[0]
  result = GetCallingScriptHash()

  print('===')
  print(user)
  print('===')
  print(result)
  print('===')

  if operation != None:
    if operation == 'submitPost':
      submitPost(args)
      return True
    if operation == 'addPostToCategory':
      addPostToCategory(args)
      return True
