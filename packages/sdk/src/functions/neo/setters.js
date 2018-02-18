/**
 * TODO: wrapper for invoke functions
 */
import Neon, { sc, rpc, u } from "@cityofzion/neon-js";
import { assets } from "./../../config";
import { createInvoke, testInvoke } from "./../../helpers/neo";
import { param } from "./../../helpers/conversion";

export const submitPost = async (host, contract, account, operation, args) => {
  const formattedOperation = param.string(operation);
  const formattedArgs = param.array(args);
  const invoke = createInvoke(contract, formattedOperation, formattedArgs);
  const gasCost = 0;
  const intents = [
    {
      assetId: assets.GAS,
      value: 0.00000001,
      scriptHash: Neon.get.scriptHashFromAddress(account.address)
    }
  ];

  console.log("setters");
  const testResponse = await testInvoke(host, invoke);

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

// export default async function main() {
//   // Actual invoke params
//   const account = Neon.create.account(privnetWif);
//   const invoke = createInvoke(operation, args);
//   const gasCost = 0;
//   const intents = [
//     {
//       assetId: assets.GAS,
//       value: 0.00000001,
//       scriptHash: Neon.get.scriptHashFromAddress(account.address)
//     }
//   ];

//   // Test invoke
//   const testResponse = await testInvoke(invoke);
//   if (testResponse.result.gas_consumed < 10) {
//     const invokeResponse = await executeInvoke(
//       account,
//       invoke,
//       gasCost,
//       intents
//     );
//     console.log(invokeResponse);
//   }
// }
