/**
 * TODO: wrapper for invoke functions
 */
import Neon, { sc, rpc, u } from "@cityofzion/neon-js";
import { assets } from "./../../config";
import { createInvoke, testInvoke, executeInvoke } from "./../../helpers/neo";
import { param } from "./../../helpers/conversion";

export const handleInvoke = async (
  host,
  contract,
  account,
  operation,
  args
) => {
  const invoke = createInvoke(contract, operation, args);
  const gasCost = 0;
  const intents = [
    {
      assetId: assets.GAS,
      value: 0.00000001,
      scriptHash: Neon.get.scriptHashFromAddress(account.address)
    }
  ];

  const testResponse = await testInvoke(host, invoke);
  if (testResponse.result.gas_consumed < 10) {
    const result = await executeInvoke(host, account, invoke, gasCost, intents);
  }
};
