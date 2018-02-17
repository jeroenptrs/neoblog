import { wallet } from '@cityofzion/neon-js'
import jwt from 'jsonwebtoken';

export const processAuthentication = (key, password) => {
  return new Promise((resolve, reject) => {
    if(wallet.isNEP2(key)) {
      resolve(wallet.decrypt(key, password));
    } else if (wallet.isWIF(key)) {
      resolve(key);
    } else {
      reject('No valid NEP-2 or WIF entered.');
    }
  });
};

export const createWallet = (password) => {
  const privateKey = wallet.generatePrivateKey();
  const WIF = new wallet.Account(privateKey).WIF;
  return {
    WIF: WIF,
    NEP2: wallet.encrypt(WIF, password)
  };
};

export const generateJwt = (userObject, secret, expirationTime) => {
  jwt.sign({
    data: userObject
  }, secret, { expiresIn: expirationTime });
};