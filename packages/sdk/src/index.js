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
import {
  processAuthentication,
  createAccount,
  generateJwt,
  decodeJwt
} from "./functions/neo/account";
import { scriptHashToAddress, param } from "./helpers/conversion";
import { determineKey } from "./helpers/neo";
import { submitPost } from "./functions/neo/setters";

export default class Neoblog {
  constructor(host, contract, account = undefined) {
    this.host = host;
    this.contract = contract;

    if (account) {
      const decodedAccount = decodeJwt(account);
      this.account = decodedAccount;
    } else this.account = undefined;

    this.getLatest = this.getLatest.bind(this);
    this.getLatestPost = this.getLatestPost.bind(this);
    this.getArticle = this.getArticle.bind(this);
    this.getArticleData = this.getArticleData.bind(this);
    this.getUserData = this.getUserData.bind(this);
    this.getAddressFromUserId = this.getAddressFromUserId.bind(this);
    this.processAuthentication = this.processAuthentication.bind(this);
  }

  executeGetter(getter, param) {
    return param
      ? getter(this.host, this.contract, param)
      : getter(this.host, this.contract);
  }

  executeSetter(setter, operation, args) {
    return setter(this.host, this.contract, this.account, operation, args);
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
    const WIF = processAuthentication(token, password);
    if (WIF) {
      const account = createAccount(WIF);
      const address = account.address;
      const privateKey = account.privateKey;
      this.account = { WIF, address, privateKey };

      if (typeof Storage !== "undefined") {
        const jwt = this.generateJwt(this.account);
        localStorage.setItem("neoblogAccount", jwt);
      }
      return true;
    }

    return false;
  }

  // createWallet(password) {
  //   return createWallet(password);
  // };

  generateJwt(userObject, secret = "neoblog") {
    return generateJwt(userObject, secret);
  }

  submitPost(postHash, category) {
    return this.executeSetter(submitPost, "submitPost", [
      param.string(this.account.address),
      param.string(postHash),
      param.string(category)
    ]);
  }
}
export { determineKey, scriptHashToAddress, getBestRPCNode };
