from boa.blockchain.vm.Neo.Storage import GetContext, Get, Put
from boa.code.builtins import concat
from neoblog.addToDomain import addToDomain

"""
Add a post to a certain category
  :param args: list of arguments
    args[0] always sender hash
    args[1] post content hash on IPFS
  :param type: array<str>

  This adds a post to a category, initializing a new category if necessary.

  TODO: check that the data is in fact a new category, so that there's no duplicate entry.
  This means all lowcaps vs capitalized data needs to be checked.
  Maybe also providing a max length of the category string (this also has implications on submitPost!!!)
  Also, the newest category needs to be added to the post.data.{postHash} data.
"""
def addPostToCategory(args):
  # Default args
  user = args[0]
  postHash = args[1]
  category = args[2]

  """
    Adding to category domain
    category.{category}.latest       Getting the latest post index of a certain category
    category.{category}.{postIndex}  Getting a post from a certain category by index
  """

  # Creating category domain
  categoryDomain = concat("category.", category)

  # Add to category domain
  submitPost(categoryDomain, postHash)
  
  return True
