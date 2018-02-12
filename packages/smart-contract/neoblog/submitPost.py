from boa.blockchain.vm.Neo.Storage import GetContext, Get, Put
from boa.code.builtins import concat
from neoblog.lib.addToDomain import addToDomain

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

  # Add to post domain
  addToDomain("post", postHash)

  # Setting post.data.{postHash} = {postIndex}
  # TODO: serialize data from https://github.com/be-neo/neoblog/issues/1 into data
  postDataDomain = concat("post.data.", postHash)
  Put(GetContext, postDataDomain, user)
  # Temporarily storing user hash till it's a serialized array


  """
    Adding to user domain
    user.{userAddress}              User address of a user (Public key/hash)
    user.{userAddress}.latest       Getting the latest post index of a certain user
    user.{userAddress}.{postIndex}  Getting a post from a certain user by index
  """

  # Creating user domain 
  userDomain = concat("user.", user)

  # Add to user domain - {user}.latest && {user}.{latestIndex}
  addToDomain(userDomain, postHash)

  """
    Adding to category domain
    category.{category}.latest       Getting the latest post index of a certain category
    category.{category}.{postIndex}  Getting a post from a certain category by index
  """

  # Creating category domain
  categoryDomain = concat("category.", category)

  # Add to category domain - {category}.latest && {category}.{latestIndex}
  addToDomain(categoryDomain, postHash)

  return True
