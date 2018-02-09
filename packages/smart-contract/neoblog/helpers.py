"""
==========================
==== HELPER FUNCTIONS ====
==========================
"""
def getCategories(args):
  i = 3 # Max category count
  categoryList = []

  argsLen = len(args) - 3

  while i<argsLen:
    element = args[i]
    categoryList = concat(',', element)
    i += 1
    
  return categoryList
