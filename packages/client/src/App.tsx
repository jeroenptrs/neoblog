// Imports
import * as React from 'react';

// Mobx
import { Provider } from 'mobx-react';
const { MobxRouter, startRouter } = require('mobx-router');
import store from './store';
import views from './components/views/views';
startRouter(views, store);

// Components
import NeoLogo from './components/icons/NeoLogo';
import { Layout } from 'antd';
const { Content, Header } = Layout;

class App extends React.Component {
  render() {
    return (
      <Layout>
        <Header style={{ padding: '0 32px' }}>
          <span className="neoblog-logo">Neoblog</span>
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
