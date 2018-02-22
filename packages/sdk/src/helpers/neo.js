// Imports
import * as axios from "axios";
import Neon, { api, rpc, tx, u, wallet } from "@cityofzion/neon-js";
import { queryHttpsProxy } from "@be-neo/neo-https-proxy";
const s2h = u.str2hexstring;
const sb = Neon.create.scriptBuilder;

const httpsProxy =
  "https://wt-eb8e8a5788a32c0054649520e12aca04-0.sandbox.auth0-extend.com/neo-https-proxy";

export const determineKey = key => {
  if (wallet.isNEP2(key)) return "NEP2";
  if (wallet.isWIF(key)) return "WIF";
  return false;
};

/**
 * Gets the value out of a key from a contract on the NEO Blockchain
 * @param {string} host Host endpoint
 * @param {string} contract Contract address
 * @param {string} key Key - to - search
 */
export const getStorage = async (host, contract, key) => {
  // Get local RPC
  const client = await api.neonDB.getRPCEndpoint(host);

  return new Promise(async (resolve, reject) => {
    try {
      const response = await queryHttpsProxy(
        client,
        {
          method: "getstorage",
          params: [contract, key]
        },
        httpsProxy
      );

      // const response = await rpc.queryRPC(client, {
      //   method: "getstorage",
      //   params: [contract, key]
      // });

      if (response.result) resolve(response.result);
      else reject({ error: "No result found!" });
    } catch (e) {
      console.log("error!");
      reject(e);
    }
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
  const vmScript = sb().emitAppCall(
    invoke.scriptHash,
    invoke.operation,
    invoke.args,
    false
  );

  // Execute
  return queryHttpsProxy(
    client,
    {
      method: "invokescript",
      params: [vmScript.str]
    },
    httpsProxy
  );
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
  const script = sb().emitAppCall(
    invoke.scriptHash,
    invoke.operation,
    invoke.args,
    false
  );

  // Create TX
  const balances = await getBalance(host, account.address);
  const unsignedTx = tx.Transaction.createInvocationTx(
    balances,
    intents,
    script.str,
    gasCost,
    { version: 1 }
  );

  // Sign TX
  const signedTx = tx.signTransaction(unsignedTx, account.privateKey);

  // Invoke
  return queryHttpsProxy(
    client,
    {
      method: "sendrawtransaction",
      params: [tx.serializeTransaction(signedTx)],
      id: 1
    },
    httpsProxy
  );

  // return rpc.queryRPC(client, {
  //   method: "sendrawtransaction",
  //   params: [tx.serializeTransaction(signedTx)],
  //   id: 1
  // });
};
