import '@babel/polyfill';
import Neon, { api, u } from '@cityofzion/neon-js';
import * as _ from 'lodash';
import * as compressjs from 'compressjs';


const url = 'http://localhost:5000/';
const scriptHash = '3ae687af46a8fbed9eb5ead2575918c822c91d1e'

const client = Neon.create.rpcClient(url);
const s2h = u.str2hexstring;
const algorithm = compressjs.Bzip2

const store_key = s2h('test01');

(async function main() {
  queryBlockchain().then((compressedRaw) => {
    const compressed = new Uint8Array(compressedRaw.map(raw => parseInt(raw)));
    const decompressed = algorithm.decompressFile(compressed);
    console.log(new Buffer(decompressed).toString('utf8'));
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
    api.neonDB.getRPCEndpoint('http://localhost:5000').then((url) => {
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
