// Imports
import { u } from "@cityofzion/neon-js";
import { unhexlify } from "binascii";
import { getStorage } from "./../../helpers/neo";
import { addressToScriptHash } from "./../../helpers/conversion";

const { str2hexstring: s2h, int2hex: i2h, hexstring2str: h2s } = u;

export const getBestRPCNode = async host =>
  await api.neonDB.getRPCEndpoint(host);

export const getLatest = async (host, contract, domain) =>
  parseInt(await getStorage(host, contract, s2h(domain + "latest")), 16);

export const getLatestPost = async (host, contract) =>
  await getLatest(host, contract, "post.");

export const getArticle = async (host, contract, data) => {
  const { domainPre, index } = data;
  const domain = s2h(domainPre) + i2h(index);
  const result = await getStorage(host, contract, domain);
  return h2s(result);
};

export const getArticleData = async (host, contract, article) =>
  await getStorage(host, contract, s2h("post.data." + article));

export const getUserData = async (host, contract, user) => {
  const rawResult = await getStorage(
    host,
    contract,
    s2h("user." + addressToScriptHash(user))
  ).catch(error => undefined);

  return rawResult ? unhexlify(rawResult) : undefined;
};

export const getAddressFromUserId = async (host, contract, userId) => {
  const result = await getStorage(host, contract, s2h("user.userid." + userId));
  return scriptHashToAddress(result);
};
