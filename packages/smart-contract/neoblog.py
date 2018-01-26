from boa.blockchain.vm.Neo.Runtime import CheckWitness
from boa.blockchain.vm.Neo.Storage import GetContext, Get, Put
from boa.code.builtins import concat, substr

def Main(key, value):
  output = value
  print(key)
  Put(GetContext,key,value)
  return key