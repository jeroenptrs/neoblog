import * as React from 'react';

import { Provider } from 'mobx-react';
const { MobxRouter, startRouter } = require('mobx-router');
import store from './store';
import views from './components/views/views';

// Components
import { Layout } from 'antd';
const { Content, Header } = Layout;

const logo = require('./logo.svg');

startRouter(views, store);

class App extends React.Component {
  render() {
    return (
      <Layout>
        <Header style={{ padding: '0 32px' }}>
          <span className="neoblog-logo">Neoblog</span>
          <span className="neo-logo">
            <img src={logo} alt="NEO logo" />
          </span>
        </Header>
        <Layout>
          <Content>
            <Provider store={store}>      
              <MobxRouter />
            </Provider>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;
