import Neoblog from "@neoblog/sdk";
import { observable } from "mobx";
import { RouterStore } from "mobx-router";

const host = "https://testnet-api.neonwallet.com";
const contract = "85e9cc1f18fcebf9eb8211a128807e38d094542a"; /* Check witness */

let account;
if (typeof Storage !== "undefined") {
  account = localStorage.getItem("neoblogAccount");
}

const store = {
  app: observable({
    newPost: {
      postMarkdown: "",
      postTitle: "",
      category: "",
      fileHash: undefined
    },
    currentArticle: {
      info: undefined,
      content: undefined,
      userName: undefined
    },
    states: {
      totalArticles: undefined,
      articleIndex: undefined,
      currentPage: undefined,
      fetchingArticles: true,
      fetchingArticleInfo: true,
      ipfsStates: {
        postingData: false,
        postingFinished: false
      },
      menuStates: {
        signedIn: account !== null,
        menuOpened: false,
        submitting: false,
        disabled: false
      }
    },
    user: {
      name: undefined,
      authentication: {
        key: undefined,
        passPhrase: undefined,
        signInType: undefined
      }
    }
  }),
  api: new Neoblog(host, contract, account),
  ipfsEndpoint: "https://ipfs.io/ipfs/",
  router: new RouterStore()
};

export default store;
