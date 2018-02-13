// Imports
import { u } from "@cityofzion/neon-js";
import { getStorage } from "./../../helpers/neo";
import { scriptHashToAddress } from "./../../helpers/conversion";
const { str2hexstring: s2h, int2hex: i2h, hexstring2str: h2s } = u;

export const getBestRPCNode = async host => await api.neonDB.getRPCEndpoint(host);

export const getLatest = async (host, contract, domain) =>
  parseInt(await getStorage(host, contract, s2h(domain + "latest")));

export const getLatestPost = async (host, contract) =>
  await getLatest(host, contract, "post.");

export const getArticle = async (host, contract, index) => {
  const domain = s2h("post.") + i2h(index);
  const result = await getStorage(host, contract, domain);
  return h2s(result);
};

export const getArticleData = async (host, contract, article) =>
  await getStorage(host, contract, s2h("post.data." + article));

export const getUserData = async (host, contract, user) =>
  await getStorage(host, contract, s2h("user.") + user);

export const getAddressFromUserId = async (host, contract, userId) => {
  const result = await getStorage(host, contract, s2h("user.userid." + userId));
  return criptHashToAddress(result);
};
