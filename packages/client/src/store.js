const { RouterStore } = require('mobx-router');

const store = {
  appState: {
    title: 'Welcome to Neoblog'
  },
  router: new RouterStore()
};

export default store;
