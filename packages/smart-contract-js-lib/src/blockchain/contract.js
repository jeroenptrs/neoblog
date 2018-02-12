import Neon, { api, rpc, sc, tx, wallet } from '@cityofzion/neon-js';
import * as axios from 'axios';
import { getBalance } from './account';
import { scriptHash, localHost, privnetWif } from './config.js';

module.exports = {
  createInvoke: (operation, args) => { return { scriptHash, operation, args } },
  testInvoke: async (invoke) => {
    // Get local RPC 
    const client = await api.neonDB.getRPCEndpoint(localHost);
  
    // Create SC script
    const sb = Neon.create.scriptBuilder();
    sb.emitAppCall(invoke.scriptHash, invoke.operation.value, invoke.args, false);
    const script = sb.str;

    // Execute
    const response = await rpc.Query.invokeScript(script).execute(client);
    return response;
  },
  executeInvoke: async (account, invoke, gasCost, intents) => {
    // Get local RPC
    const client = await api.neonDB.getRPCEndpoint(localHost);

    // Create SC script
    const sb = Neon.create.scriptBuilder();
    sb.emitAppCall(invoke.scriptHash, invoke.operation.value, invoke.args, false);
    const script = sb.str;

    // Create TX
    const balances = await getBalance(account.address);
    const unsignedTx = tx.Transaction.createInvocationTx(balances, intents, script, gasCost, { version: 1 });
    const signedTx = tx.signTransaction(unsignedTx, account.privateKey);
    const hexTx = tx.serializeTransaction(signedTx);

    // Invoke
    return rpc.queryRPC(client, {
      method: 'sendrawtransaction',
      params: [hexTx],
      id: 1
    });
  },
  param: { 
    string: (c) => { return sc.ContractParam.string(c); }
  }
};
