const { RouterStore } = require('mobx-router');
import {observable} from 'mobx';

const store = {
  app: observable({
    postMarkdown: ``,
  }),
  router: new RouterStore()
};

export default store;
