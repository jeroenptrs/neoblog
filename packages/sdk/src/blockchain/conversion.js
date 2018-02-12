import { u } from '@cityofzion/neon-js';
import base58 from 'bs58';
import { ADDR_VERSION } from './config';

export const getAddressFromScriptHash = (scriptHash) => {
  const shaChecksum = u.hash256(ADDR_VERSION + scriptHash).substr(0, 8);
  return base58.encode(Buffer.from(ADDR_VERSION + scriptHash + shaChecksum, 'hex'));
};
