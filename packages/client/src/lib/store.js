import Neoblog from "@neoblog/sdk";
import { observable } from "mobx";
import { RouterStore } from "mobx-router";

const host = "http://localhost:5000";
const contract = "ab2bb39fa618f497999806a688c81fcf23ce0275";

const store = {
  app: observable({
    newPost: {
      postMarkdown: "",
      postTitle: "",
      fileHash: undefined
    },
    currentArticle: undefined,
    states: {
      menuOpened: false,
      signedIn: false,
      totalArticles: undefined,
      articleIndex: undefined,
      currentPage: undefined,
      fetchingArticles: true,
      ipfsStates: {
        postingData: false,
        postingFinished: false
      }
    }
  }),
  api: new Neoblog(host, contract),
  ipfsEndpoint: "https://ipfs.io/ipfs/",
  mockPost: "QmQK9ucWGFjbo2hnJGK2C7nTJY5jF4QXnm131p2gq2u7sK",
  router: new RouterStore()
};

export default store;
