import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Button } from "antd";

import views from "./../views/views";

class Account extends Component {
  handleSignOut = () => {
    const { api } = this.props.store;
    api.account = null;
    if (typeof Storage !== "undefined")
      localStorage.removeItem("neoblogAccount");
    const { menuStates } = this.props.store.app.states;
    menuStates.signedIn = false;
  };

  handleNewPost = () => {
    this.props.store.app.states.menuStates.menuOpened = false;
    this.props.store.router.goTo(views.newPost, {}, this.props.store);
  };

  render() {
    return (
      <React.Fragment>
        <Button
          style={{ width: "100%", marginBottom: "16px" }}
          onClick={this.handleNewPost}
          type="primary"
          icon="plus"
        >
          New Post
        </Button>
        <Button
          type="danger"
          style={{ width: "100%" }}
          onClick={this.handleSignOut}
        >
          Sign out
        </Button>
      </React.Fragment>
    );
  }
}

export default inject("store")(observer(Account));
