from boa.blockchain.vm.Neo.Storage import GetContext, Get, Put
from boa.code.builtins import concat

"""
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
  if latestPostIndex == '':
    newLatestPostIndex = 0
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

  """
    Adding to user domain
    user.{userAddress}              User address of a user (Public key/hash)
    user.{userAddress}.latest       Getting the latest post index of a certain user
    user.{userAddress}.{postIndex}  Getting a post from a certain user by index
  """
  # Setting user.{userAddress}.latest = {postIndex}
  latestUserPostIndex = Get(GetContext, userLatestDomain)
  if latestUserPostIndex == '':
    newLatestUserPostIndex = 0
  else:
    newLatestUserPostIndex = latestUserPostIndex + 1
  Put(GetContext, userLatestDomain, newLatestUserPostIndex)

  # Setting user.{userAddress}.{postIndex} = {postHash}
  userIndexDomain = concat(userDomain, newLatestUserPostIndex)
  Put(GetContext, userIndexDomain, postHash)

  return True
