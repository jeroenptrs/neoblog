from boa.blockchain.vm.Neo.Storage import GetContext, Get, Put
from boa.code.builtins import concat

"""
Sets {domain}.latest = {newLatest}
Sets {domain}.{newLatestIndex} = {postHash}
"""
def addToDomain(domain, postHash):
  latestDomain = concat(domain, ".latest")

  # Setting domainLatest = newLatestIndex
  latestIndex = Get(GetContext, latestDomain)
  if latestIndex == '':
    newLatestIndex = 1
  else:
    newLatestIndex = latestIndex + 1
  Put(GetContext, latestDomain, newLatestIndex)

  # Setting domain.newLatestIndex = {postHash}
  tempDomain = concat(domain, ".")
  indexDomain = concat(tempDomain, newLatestIndex)
  Put(GetContext, indexDomain, postHash)

  return True
  