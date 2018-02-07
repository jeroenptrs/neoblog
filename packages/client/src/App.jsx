// Imports
import React, { Component } from 'react';

// Mobx
import { Provider } from 'mobx-react';
import { MobxRouter, startRouter } from 'mobx-router';
import store from './store';
import views from './components/views/views';

// Components
import NeoLogo from './components/icons/NeoLogo';
import { Layout } from 'antd';
const { Content, Header } = Layout;

startRouter(views, store);

class App extends Component {
  render() {
    return (
      <Layout>
        <Header style={{ padding: '0 32px' }}>
          <span className="neoblog-logo">Neo<span className="green">blog</span></span>
          <span className="neo-logo">
            <NeoLogo />
          </span>
        </Header>
        <Layout style={{ backgroundColor: 'transparent' }}>
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
