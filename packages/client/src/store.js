import { observable } from 'mobx';
import { RouterStore } from 'mobx-router';

const store = {
  app: observable({
    postMarkdown: `Sample content`,
    postTitle: `Sample title`,
  }),
  router: new RouterStore()
};

export default store;
