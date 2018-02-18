// Imports
import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Layout } from "antd";
import { MobxRouter, startRouter, Link } from "mobx-router";

import store from "./lib/store";
import views from "./components/views/views";

// Components
import NeoLogo from "./components/icons/NeoLogo";
import MenuShell from "./components/MenuShell/MenuShell";

const { Content, Header, Footer } = Layout;

startRouter(views, store);

class App extends Component {
  onChange = () => {
    const { menuStates } = this.props.store.app.states;
    menuStates.menuOpened = !menuStates.menuOpened;
  };

  render() {
    const { signedIn, menuOpened } = this.props.store.app.states.menuStates;

    return (
      <Layout>
        <Header style={{ padding: "0 32px" }}>
          <Link view={views.home} store={store} className="neoblog-logo">
            Neo<span className="green">blog</span>
          </Link>
          <a
            className={signedIn ? "identicon" : "neo-logo"}
            onClick={this.onChange}
          >
            {signedIn ? "U" : <NeoLogo />}
          </a>
        </Header>
        {menuOpened ? <MenuShell /> : null}
        <Layout style={{ backgroundColor: "transparent" }}>
          <Content>
            <MobxRouter />
          </Content>
        </Layout>
        <Footer />
      </Layout>
    );
  }
}

export default inject("store")(observer(App));
