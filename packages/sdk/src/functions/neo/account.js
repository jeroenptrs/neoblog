import { wallet } from '@cityofzion/neon-js'

export const processAuthentication = (key, password) => {
  if(wallet.isNEP2(key)) {
    return wallet.decrypt(key, password);
  } else if (wallet.isWIF(key)) {
    return key;
  } else {
    throw new Error('No valid NEP-2 or WIF entered.')
  }
};

export const createWallet = (password) => {
  const privateKey = wallet.generatePrivateKey();
  const WIF = new wallet.Account(privateKey).WIF;
  return {
    WIF: WIF,
    NEP2: wallet.encrypt(WIF, password)
  };
};