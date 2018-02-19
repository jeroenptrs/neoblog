import Neoblog from "@neoblog/sdk";
import { observable } from "mobx";
import { RouterStore } from "mobx-router";

const host = "http://localhost:5000";
const contract = "bc1546ae0b06cac336c7335c049f4a59849c3621";
// const contract = "d468a80f608973debd813fb5b496304fbea39b6d";

let account;
if (typeof Storage !== "undefined") {
  account = localStorage.getItem("neoblogAccount");
}

const store = {
  app: observable({
    newPost: {
      postMarkdown: "",
      postTitle: "",
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
        submitting: false
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
  mockPost: "QmQK9ucWGFjbo2hnJGK2C7nTJY5jF4QXnm131p2gq2u7sK",
  router: new RouterStore()
};

export default store;
