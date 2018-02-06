from boa.blockchain.vm.Neo.Runtime import CheckWitness
from boa.blockchain.vm.Neo.Storage import GetContext, Get, Put
from boa.code.builtins import concat, substr
***
TODO:
- "Seed" smart contract -> .latest might not yet exist -> fill with 0
- Error handling when "out of bounds" -> ex: post.1234 which does not exist
- Add user.post, user.xxx domains on every function (Get, Put)
- String -> int conversion and vice versa?
- GetIndexes(domaiName (ex: "post, user, category.categoryName")) returns latest index
- UpdateIndexes (Same as above - but updates it)

Example of domain trees
post.latest
post.123 123 is an example post index
post.data.1a2b 1a2b is an example IPFS file hash
category.crypto.latest
category.crypto.456 different post index
user.abcd abcd is an example user address
user.abcd.latest
user.abcd.789 different post index
user.userid.jeroenptrs jeroenptrs is an example user id

==========================
===== MAIN FUNCTIONS =====
==========================
Storing a post hash on the BC
  :param args: list of arguments
    args[0] always sender hash
    args[1] post content hash on IPFS
  :param type: str
***
def submitPost(args):
  # Default args
  user = args[0]
  postHash = args[1]

  # Creating domains
  postDomain = "post."
  postLatestDomain = concat(postDomain, "latest")

  # Getting and increasing lastest index
  latestPostIndex = Get(GetContext, postLatestDomain);
  newLatestPostIndex = latestPostIndex + 1
  Put(GetContext, postLatestDomain, latestPostIndex)

  # Insert the post on domain "post.{index}"
  postKeyDomain = concat(postDomain, latestPostIndex)
  Put(GetContext, postKey, postHash)
  return True



***
Add a post to a certain category
  :param args: list of arguments
    args[0] always sender hash
    args[1] post content hash on IPFS
    args[2..11] extra categories (max 10)
  :param type: str
***
def addPostToCategory(args):
  # Default args
  user = args[0]
  postHash = args[1]

  # Getting all categories from args
  categoryList = getCategories(args):

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
    Put(GetContext, categoryValueLatest, newLatestIndex)

    # Insert the post on domain "category.{categoryName}.{index}"
    categoryNewIndex = concat(".", newLatestIndex)
    category = concat(categoryDomainAndName, categoryNewIndex)
    Put(GetContext, category, FILE_HASH)
  return True


***
Getting the post by index from the BC
  :param args: list of arguments
    args[0] always sender hash
    args[1] post index
  :param type: str
***
def getPostByIndex(args):
  # Default args
  user = args[0]
  postIndex = args[1]

  # Getting the index and retrieving post
  postIndexDomain = concat("post.", postIndex)
  postByIndex = Get(GetContext, postIndexDomain)
  return postByIndex


***
Getting the latest post from the BC
***
def getLatestPost():
  # Get latest index
  latestIndex = Get(GetContext, "post.latest")

  # Getting the index and retrieving post
  lastestPostDomain = concat("post.", latestIndex)
  latestPost = Get(GetContext, lastestPostDomain)
  return latestPost



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
    if operation == 'addPostToCategory'
      addPostToCategory(args)
      return True
    if operation == 'getPost':
      getPost(args)
      return True
