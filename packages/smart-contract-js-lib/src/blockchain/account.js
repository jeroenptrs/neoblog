import { wallet, u } from '@cityofzion/neon-js';
import * as axios from 'axios';
import { localHost, ADDR_VERSION } from './config';

module.exports = {
  getBalance: async (neoAddress) => {
    const query = await axios.get(`${localHost}/v2/address/balance/${neoAddress}`);
    const { net, address } = query.data;

    // Create Balance object
    const balances = new wallet.Balance({ net, address });
    balances.addAsset('NEO', query.data.NEO);
    balances.addAsset('GAS', query.data.GAS);
    
    return balances;
  }
}