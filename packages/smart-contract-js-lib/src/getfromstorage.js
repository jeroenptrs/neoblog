import '@babel/polyfill';
import Neon, { api, u } from '@cityofzion/neon-js';
import { scriptHash, localHost } from './blockchain/config';

const client = Neon.create.rpcClient(localHost);
const s2h = u.str2hexstring;

const store_key = u.str2hexstring('post.')+u.int2hex(1);

/* (async function main() {
  queryBlockchain(store_key).then((result) => {
    console.log(result);
  }).catch((e) => {
    console.log(e);
  });
})(); */

export default function queryBlockchain(key) {
  const query = Neon.create.query({
    'method': 'getstorage',
    'params': [
      scriptHash,
      key
    ]
  });

  return new Promise((resolve, reject) => {
    api.neonDB.getRPCEndpoint(localHost).then((url) => {
      const response = query.execute(url)
        .then(res => {
          if (res.result) resolve(res.result);
          else reject({ error: 'No result found!' })
        })
        .catch(e => {
          console.log('error!');
          reject(e);
        })
      })
  })
}
