const { RouterStore } = require('mobx-router');
import {observable} from 'mobx';

const store = {
  app: observable({
    postMarkdown: `Sample content`,
    postTitle: `Sample title`,
  }),
  router: new RouterStore()
};

export default store;
