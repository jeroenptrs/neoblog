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
import { scriptHashToAddress } from "./helpers/conversion";
import { determineKey } from "./helpers/neo";

export default class Neoblog {
  constructor(host, contract, account = undefined) {
    this.host = host;
    this.contract = contract;

    if (account) {
      const decodedAccount = decodeJwt(account);
      console.log(decodedAccount);
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
      this.account = { WIF, address };

      if (typeof Storage !== "undefined") {
        const jwt = this.generateJwt(this.account);
        localStorage.setItem("neoblogAccount", jwt);
      }

      return true;
    }

    return WIF;
  }

  // createWallet(password) {
  //   return createWallet(password);
  // };

  generateJwt(userObject, secret = "neoblog") {
    return generateJwt(userObject, secret);
  }
}
export { determineKey, scriptHashToAddress, getBestRPCNode };
