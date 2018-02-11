from boa.blockchain.vm.Neo.Storage import GetContext, Get, Put
from boa.code.builtins import concat

"""
Storing a post hash on the BC
  :param args: list of arguments
    args[0] always sender hash (user)
    args[1] post content hash on IPFS (postHash)
    args[2] main category of the post - e.g. Finance, or Crypto, ... (category)
  :param type: array<str>
  
  This stores a brand new post to the blockchain, initializing it on the following domains:
    post
    user.{userAddress}
    category.{category}
  
  It does this by incrementing the .latest subdomain, which will become the post's index in our database.
  At this index - either post.{index}, user.{userAddress}.{index} or category.{category}.{index} - the postHash will be stored.
  At post.data.{postHash}, a serialized array of the post's data will be stored. This contains the following:
    [0]: postHash
    [1]: user
    [2]: creationDate (timestamp vs block?)
    [3]: category
"""
def submitPost(args):
  # Default args
  user = args[0]
  postHash = args[1]
  category = args[2]

  """
  Adding to post domain
  post.latest                     Latest index of a post in common
  post.{postIndex}                Getting a post by index
  post.data.{IPFS_PostHash}       Getting a post by Hash From IPFS
  """

  # Creating post domains
  postDomain = "post."
  postLatestDomain = "post.latest"

  # Setting post.latest = {postIndex} - increase afterwards
  latestPostIndex = Get(GetContext, postLatestDomain)
  if latestPostIndex == '':
    newLatestPostIndex = 1
  else:
    newLatestPostIndex = latestPostIndex + 1
  Put(GetContext, postLatestDomain, newLatestPostIndex)

  # Setting post.{postIndex} = {postHash}
  postIndexDomain = concat(postDomain, newLatestPostIndex)
  Put(GetContext, postIndexDomain, postHash)

  # Setting post.data.{postHash} = {postIndex}
  # TODO: serialize data from https://github.com/be-neo/neoblog/issues/1 into data
  postDataDomainTemp = concat(postDomain, 'data.')
  postDataDomain = concat(postDataDomainTemp, postHash)
  Put(GetContext, postDataDomain, newLatestPostIndex)

  """
    Adding to user domain
    user.{userAddress}              User address of a user (Public key/hash)
    user.{userAddress}.latest       Getting the latest post index of a certain user
    user.{userAddress}.{postIndex}  Getting a post from a certain user by index
  """

  # Creating user domains
  userDomain = concat("user.", user)
  userLatestDomain = concat(userDomain, ".latest")
  userDomain = concat(userDomain, ".")

  # Setting user.{userAddress}.latest = {postIndex}
  latestUserPostIndex = Get(GetContext, userLatestDomain)
  if latestUserPostIndex == '':
    newLatestUserPostIndex = 1
  else:
    newLatestUserPostIndex = latestUserPostIndex + 1
  Put(GetContext, userLatestDomain, newLatestUserPostIndex)

  # Setting user.{userAddress}.{postIndex} = {postHash}
  userIndexDomain = concat(userDomain, newLatestUserPostIndex)
  Put(GetContext, userIndexDomain, postHash)

  """
    Adding to category domain
    category.{category}.latest       Getting the latest post index of a certain category
    category.{category}.{postIndex}  Getting a post from a certain category by index
  """

  # Creating category domains
  categoryDomain = concat("category.", category)
  categoryLatestDomain = concat(categoryDomain, ".latest")
  categoryDomain = concat(categoryDomain, ".")

  # Setting category.{category}.latest = {postIndex}
  latestCategoryPostIndex = Get(GetContext, categoryLatestDomain)
  if latestCategoryPostIndex == '':
    newLatestCategoryPostIndex = 1
  else:
    newLatestCategoryPostIndex = latestCategoryPostIndex + 1
  Put(GetContext, categoryLatestDomain, newLatestCategoryPostIndex)

  # Setting category.{category}.{postIndex} = {postHash}
  categoryIndexDomain = concat(categoryDomain, newLatestCategoryPostIndex)
  Put(GetContext, categoryIndexDomain, postHash)

  return True
