from boa.blockchain.vm.Neo.Storage import GetContext, Get, Put
from boa.code.builtins import concat
from neoblog.helpers import getCategories

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
    # categoryListResult.pop(categoryListResultItem)
    i = i + 1
  
  Put(GetContext, postSubcatsDomain, categoryListResult)
  return True