// Babel
import "@babel/polyfill";

// Imports
import * as axios from "axios";
import Neon, { api, rpc, tx, u, wallet } from "@cityofzion/neon-js";
const s2h = u.str2hexstring;
const sb = Neon.create.scriptBuilder;

/**
 * Gets the value out of a key from a contract on the NEO Blockchain
 * @param {string} host Host endpoint
 * @param {string} contract Contract address
 * @param {string} key Key - to - search
 */
export const getStorage = (host, contract, key) => {
  const query = Neon.create.query({
    method: "getstorage",
    params: [contract, key]
  });

  return new Promise((resolve, reject) => {
    api.neonDB.getRPCEndpoint(host).then(url => {
      const response = query
        .execute(url)
        .then(res => {
          if (res.result) resolve(res.result);
          else reject({ error: "No result found!" });
        })
        .catch(e => {
          console.log("error!");
          reject(e);
        });
    });
  });
};

/**
 * Queries the Blockchain DB for a user's current balance
 * @param {string} host Host endpoint
 * @param {string} neoAddress User address
 */
export const getBalance = async (host, neoAddress) => {
  const query = await axios.get(`${host}/v2/address/balance/${neoAddress}`);
  const { net, address } = query.data;

  // Create Balance object
  const balances = new wallet.Balance({ net, address });
  balances.addAsset("NEO", query.data.NEO);
  balances.addAsset("GAS", query.data.GAS);

  return balances;
};

/**
 * Create an invoke out of your params
 * @param {string} scriptHash Contract address
 * @param {string} operation Operation string
 * @param {array} args Argument array
 */
export const createInvoke = (scriptHash, operation, args) => {
  return { scriptHash, operation, args };
};

/**
 *
 * @param {string} host Host endpoint
 * @param {object} invoke Invoke data
 */
export const testInvoke = async (host, invoke) => {
  // Get local RPC
  const client = await api.neonDB.getRPCEndpoint(host);

  // Create SC script
  sb().emitAppCall(
    invoke.scriptHash,
    invoke.operation.value,
    invoke.args,
    false
  );

  // Execute
  return await rpc.Query.invokeScript(sb.str).execute(client);
};

/**
 *
 * @param {string} host Host endpoint
 * @param {object} account Account data
 * @param {object} invoke Invoke data
 * @param {number} gasCost Default 0
 * @param {array} intents Intent array
 */
export const executeInvoke = async (
  host,
  account,
  invoke,
  gasCost,
  intents
) => {
  // Get local RPC
  const client = await api.neonDB.getRPCEndpoint(host);

  // Create SC script
  sb().emitAppCall(
    invoke.scriptHash,
    invoke.operation.value,
    invoke.args,
    false
  );

  // toString()
  const script = sb.str;

  // Create TX
  const balances = await getBalance(account.address);
  const unsignedTx = tx.Transaction.createInvocationTx(
    balances,
    intents,
    script,
    gasCost,
    { version: 1 }
  );

  // Sign TX
  const signedTx = tx.signTransaction(unsignedTx, account.privateKey);

  // Invoke
  return rpc.queryRPC(client, {
    method: "sendrawtransaction",
    params: [tx.serializeTransaction(signedTx)],
    id: 1
  });
};

/* INVOKE SMART CONTRACT FUNCTIONS

import "@babel/polyfill";
import Neon, { sc, u } from "@cityofzion/neon-js";
import {
  createInvoke,
  executeInvoke,
  testInvoke,
  param
} from "./blockchain/contract";
import { scriptHash, privnetWif, localHost, assets } from "./blockchain/config";

const operation = param.string("testkey");
const args = param.string("testvalue");

export default async function main() {
  // Actual invoke params
  const account = Neon.create.account(privnetWif);
  const invoke = createInvoke(operation, args);
  const gasCost = 0;
  const intents = [
    {
      assetId: assets.GAS,
      value: 0.00000001,
      scriptHash: Neon.get.scriptHashFromAddress(account.address)
    }
  ];

  // Test invoke
  const testResponse = await testInvoke(invoke);
  if (testResponse.result.gas_consumed < 10) {
    const invokeResponse = await executeInvoke(
      account,
      invoke,
      gasCost,
      intents
    );
    console.log(invokeResponse);
  }
}

*/
