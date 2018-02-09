from boa.blockchain.vm.Neo.Runtime import CheckWitness
from boa.blockchain.vm.Neo.Storage import GetContext, Get, Put
from boa.code.builtins import concat, substr
from boa.blockchain.vm.System.ExecutionEngine import GetCallingScriptHash

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
  mainCategory = args[2]

  # Creating domain
  categoryDomain = 'category.'
  categoryWithNameDomain = concat(categoryDomain, mainCategory)
  categoryLatestDomain = concat(categoryWithNameDomain, '.latest')

  # Getting all categories from args
  categoryList = getCategories(args)

  """
    Adding to category domains
    category.{categoryName}.latest        Latest index of a certain category
    category.{CategoryName}.{postIndex}   Getting a post from a certain category by index
    post.{postHash}.{subCategories}       Subcategories/tags of the post
  """
  # Setting category.{categoryName}.latest = {postIndex}
  latestCategoryIndex = Get(GetContext, categoryLatestDomain)
  newLatestCategoryIndex = -1
  if latestCategoryIndex == '':
    newLatestCategoryIndex = 0
    Put(GetContext, categoryLatestDomain, newLatestCategoryIndex)
  else:
    newLatestCategoryIndex = latestCategoryIndex + 1
    Put(GetContext, categoryLatestDomain, newLatestCategoryIndex)


  # Setting category.{categoryName}.{postIndex} = {postHash}
  categoryWithNameIndexDomain = concat(categoryWithNameDomain, newLatestCategoryIndex)
  Put(GetContext, categoryWithNameIndexDomain, postHash)


  # Setting post.{postHash}.subCategories = [{s1,s2,..}]
  postSubcatsTempDomain = concat('post.', postHash)
  postSubcatsDomain = concat(postSubcatsTempDomain, '.subCategories')

  i = 0
  categoryListResult = []
  while i<len(categoryList):
    categoryName = categoryList[i]
    categoryListResultItem = concat(categoryName, ',')
    categoryListResult.pop(categoryListResultItem)
  
  Put(GetContext, postSubcatsDomain, categoryListResult)
  return True


"""
==========================
==== HELPER FUNCTIONS ====
==========================
"""
def getCategories(args):
  i = 3
  categoryList = []

  argsLen = len(args) - 3

  while i<argsLen:
    element = args[i]
    categoryList = concat(',', element)
    i += 1
    
  return categoryList

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
