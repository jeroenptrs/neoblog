import { wallet } from "@cityofzion/neon-js";
import jwt from "jsonwebtoken";

export const processAuthentication = (key, password) => {
  if (wallet.isNEP2(key)) {
    return wallet.decrypt(key, password);
  } else if (wallet.isWIF(key)) {
    return key;
  }
  return false;
};

export const createWallet = password => {
  const privateKey = wallet.generatePrivateKey();
  const WIF = new wallet.Account(privateKey).WIF;
  return {
    WIF: WIF,
    NEP2: wallet.encrypt(WIF, password)
  };
};

export const generateJwt = (userObject, secret, expirationTime) => {
  jwt.sign(
    {
      data: userObject
    },
    secret,
    { expiresIn: expirationTime }
  );
};
