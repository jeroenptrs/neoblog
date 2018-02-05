import '@babel/polyfill';
import Neon, { sc, u } from '@cityofzion/neon-js';
import * as _ from 'lodash';
import { createInvoke, executeInvoke, testInvoke, param } from './blockchain/contract';
import { scriptHash, privnetWif, localHost, assets } from './blockchain/config';

const operation = param.string('testkey');
const args = param.string('testvalue');

export default async function main() {
  // Actual invoke params
  const account = Neon.create.account(privnetWif);
  const invoke = createInvoke(operation, args);
  const gasCost = 0;
  const intents = [
    { assetId: assets.GAS, value: 0.00000001, scriptHash}
  ];

  // Test invoke
  const testResponse = await testInvoke(invoke);
  if (testResponse.result.state === 'HALT, BREAK' && testResponse.result.gas_consumed < 10) {
    const invokeResponse = await executeInvoke(account, invoke, gasCost, intents);
    console.log(invokeResponse);
  }
};
