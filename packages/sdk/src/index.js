// Babel
import "@babel/polyfill";

// Imports
import {
  getBestRPCNode,
  getLatest,
  getLatestPost,
  getArticle,
  getArticleData,
  getUserData,
  getAddressFromUserId
} from "./functions/neo/getters";
import { scriptHashToAddress } from "./helpers/conversion";
import { processAuthentication, createWallet } from "./functions/neo/account";

export default class Neoblog {
  constructor(host, contract) {
    this.host = host;
    this.contract = contract;

    this.getLatest = this.getLatest.bind(this);
    this.getLatestPost = this.getLatestPost.bind(this);
    this.getArticle = this.getArticle.bind(this);
    this.getArticleData = this.getArticleData.bind(this);
    this.getUserData = this.getUserData.bind(this);
    this.getAddressFromUserId = this.getAddressFromUserId.bind(this);
  }

  executeGetter(getter, param) {
    return param
      ? getter(this.host, this.contract, param)
      : getter(this.host, this.contract);
  }

  getLatest(domain) {
    return this.executeGetter(getLatest, domain);
  }

  getLatestPost() {
    return this.executeGetter(getLatestPost);
  }

  getArticle(domainPre, index) {
    const data = { domainPre, index };
    return this.executeGetter(getArticle, data);
  }

  getArticleData(article) {
    return this.executeGetter(getArticleData, article);
  }

  getUserData(user) {
    return this.executeGetter(getUserData, user);
  }

  getAddressFromUserId(userId) {
    return this.executeGetter(getAddressFromUserId, userId);
  }

  processAuthentication(token, password) {
    return processAuthentication(token, password);
  }

  createWallet(password) {
    return createWallet(password);
  }
}
export { scriptHashToAddress, getBestRPCNode, processAuthentication, createWallet };
