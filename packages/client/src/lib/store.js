import Neoblog from "@neoblog/sdk";
import { observable } from "mobx";
import { RouterStore } from "mobx-router";

const host = "http://localhost:5000";
// const contract = "080fee1b2e03a8c00fbf40e1f8e69eed4c3a0e1f"; /* No CW */
const contract = "2b736dccd46e4455a4a5f22e2615ec458da23ae0"; /* Check witness */

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
