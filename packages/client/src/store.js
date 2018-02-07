import { observable } from 'mobx';
import { RouterStore } from 'mobx-router';

const store = {
  app: observable({
    postMarkdown: '',
    postTitle: '',
  }),
  router: new RouterStore(),
};

export default store;
