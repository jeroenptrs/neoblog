import '@babel/polyfill';
import Neon, { api, u } from '@cityofzion/neon-js';
import * as _ from 'lodash';
import { scriptHash, localHost } from './blockchain/config';

const client = Neon.create.rpcClient(localHost);
const s2h = u.str2hexstring;
const algorithm = compressjs.Bzip2

const store_key = u.str2hexstring('testkey');

(async function main() {
  queryBlockchain().then((result) => {
    console.log(result);
  }).catch((e) => {
    console.log(e);
  });
})();

function queryBlockchain() {
  const query = Neon.create.query({
    'method': 'getstorage',
    'params': [
      scriptHash,
      store_key
    ]
  });

  return new Promise((resolve, reject) => {
    api.neonDB.getRPCEndpoint(localHost).then((url) => {
      const response = query.execute(url)
        .then(res => {
          if (res.result) resolve(u.hexstring2str(res.result).split(','));
          else reject({ error: 'No result found!' })
        })
        .catch(e => {
          console.log('error!');
          reject(e);
        })
      })
  })
}
