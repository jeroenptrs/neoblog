// Imports
import React from 'react';
import { Layout } from 'antd';
import { MobxRouter, startRouter, Link } from 'mobx-router';

import store from './lib/store';
import views from './components/views/views';

// Components
import NeoLogo from './components/icons/NeoLogo';

const { Content, Header } = Layout;

startRouter(views, store);

const App = () => (
  <Layout>
    <Header style={{ padding: '0 32px' }}>
      <Link
        view={views.home}
        store={store}
        className="neoblog-logo"
      >
        Neo<span className="green">blog</span>
      </Link>
      <span className="neo-logo">
        <NeoLogo />
      </span>
    </Header>
    <Layout style={{ backgroundColor: 'transparent' }}>
      <Content>
        <MobxRouter />
      </Content>
    </Layout>
  </Layout>
);

export default App;
