import Neon, { wallet } from "@cityofzion/neon-js";
import jwt from "jsonwebtoken";
import { determineKey } from "./../../helpers/neo";

export const processAuthentication = (key, password) => {
  const determination = determineKey(key);
  if (determination === "NEP2") return wallet.decrypt(key, password);
  if (determination) return key;
  return determination;
};

export const createAccount = WIF => {
  if (wallet.isWIF(WIF)) return Neon.create.account(WIF);
  return WIF;
};

export const generateJwt = (account, secret) => {
  return jwt.sign(account, secret);
};

export const decodeJwt = token => {
  return jwt.decode(token);
};
