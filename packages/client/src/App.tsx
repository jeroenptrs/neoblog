import * as React from 'react';
import { Provider } from 'mobx-react';

const {MobxRouter, RouterStore, startRouter} = require('mobx-router');
// import { store } from 'store';
import views from './components/views/views';

const store = {
  app: {
    title: 'Welcome to Neoblog',
    user: null
  },
  router: new RouterStore()
};

startRouter(views, store);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>      
        <MobxRouter />
      </Provider>
    );
  }
}

export default App;
