from boa.blockchain.vm.Neo.Runtime import CheckWitness
from boa.blockchain.vm.Neo.Storage import GetContext, Get, Put
from boa.code.builtins import concat, substr

def Main(operation, args):
  print(operation)
  print(args)
  Put(GetContext,operation,args)
  return operation