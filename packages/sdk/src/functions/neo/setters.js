/**
 * TODO: wrapper for invoke functions
 */
import Neon, {sc, rpc} from '@cityofzion/neon-js'

export const submitPost = async (host, contract, operation, args) => {

  Neon.create.query({method: operation, params: args})
    .execute('http://localhost:30333') // Neon.CONST.DEFAULT_RPC.MAIN // Tried host, http://localhost:5000/v2/network/nodes - none work
    .then((res) => {
      console.log(Neon.serialize.tx(res.result))
    })

  /*
  const props: Neon.scriptParams = {
    scriptHash: contract,
    operation: operation,
    args: args,
    useTailCall: false
  };

  // Returns a hexstring
  const vmScript = Neon.sc.createScript(props);

  const invokeOperation = Neon.create.contractParam('String', 'operation');

  const invokeArgs = sc.ContractParam.array(args);


  return new Promise((resolve, reject) => {
    rpc.Query.invoke(contract, invokeOperation, invokeArgs)
      .then((res) => {
        console.log(res)
      })
  });
  */
};

