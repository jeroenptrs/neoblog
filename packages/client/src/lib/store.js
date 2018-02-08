import { observable } from 'mobx';
import { RouterStore } from 'mobx-router';

const store = {
  app: observable({
    newPost: {
      postMarkdown: '',
      postTitle: '',
      fileHash: undefined,
    },
  }),
  ipfsEndpoint: 'https://ipfs.io/ipfs/',
  mockPost: 'QmQK9ucWGFjbo2hnJGK2C7nTJY5jF4QXnm131p2gq2u7sK',
  router: new RouterStore(),
};

export default store;
