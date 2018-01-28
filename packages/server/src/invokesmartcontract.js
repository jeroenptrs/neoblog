import '@babel/polyfill';
import Neon, { sc, u } from '@cityofzion/neon-js';
import * as _ from 'lodash';
import { createInvoke, executeInvoke, testInvoke, param } from './blockchain/contract';
import { scriptHash, privnetWif, localHost } from './blockchain/config';

const operation = param.string('testkey');
const args = param.string('testvalue');

(async function main() {
  // Actual invoke params
  const account = Neon.create.account(privnetWif);
  const invoke = createInvoke(operation, args);
  const gasCost = 1;
  const intents = [];

  // Test invoke
  const testResponse = await testInvoke(invoke);
  if (testResponse.result.state === 'HALT, BREAK') {
    const invokeResponse = await executeInvoke(account, invoke, gasCost, intents);
    console.log(invokeResponse);
  }
})();
