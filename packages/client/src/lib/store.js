import Neoblog from "@neoblog/sdk";
import { observable } from "mobx";
import { RouterStore } from "mobx-router";

const host = "http://localhost:5000";
const contract = "b18f46aaf8beb6f24b1fe1cb9bbe73cf795e0c24";

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
    currentArticle: undefined,
    states: {
      totalArticles: undefined,
      articleIndex: undefined,
      currentPage: undefined,
      fetchingArticles: true,
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
