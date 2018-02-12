import { observable } from "mobx";
import { RouterStore } from "mobx-router";
import Neoblog from "@neoblog/sdk";

const store = {
  app: observable({
    newPost: {
      postMarkdown: "",
      postTitle: "",
      fileHash: undefined
    },
    currentArticle: undefined,
    states: {
      ipfsStates: {
        postingData: false,
        postingFinished: false,
        fetchingArticles: true // RE-SET THIS TO TRUE BEFORE ENTERING!
      }
    }
  }),
  ipfsEndpoint: "https://ipfs.io/ipfs/",
  mockPost: "QmQK9ucWGFjbo2hnJGK2C7nTJY5jF4QXnm131p2gq2u7sK",
  router: new RouterStore(),
  instance: new Neoblog(
    "http://localhost:5000",
    "41c6042a48c1e1d172fb5da08adf707f3c0609bf"
  )
};

export default store;
