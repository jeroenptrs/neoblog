import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Button, Input, message } from "antd";

import views from "./../views/views";

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: true,
      icon: "edit",
      prevUsername: undefined
    };
  }

  componentDidMount() {
    const { api, app: { user } } = this.props.store;
    user.name = api.getAccount().userName;
  }

  handleSignOut = () => {
    const { api } = this.props.store;
    api.account = null;
    if (typeof Storage !== "undefined")
      localStorage.removeItem("neoblogAccount");
    const { menuStates } = this.props.store.app.states;
    menuStates.signedIn = false;

    this.props.store.router.goTo(views.home, {}, this.props.store);
  };

  handleNewPost = () => {
    this.props.store.app.states.menuStates.menuOpened = false;
    this.props.store.router.goTo(views.newPost, {}, this.props.store);
  };

  toggleManageAccount = () => {
    this.setState({ disabled: !this.state.disabled }, () =>
      this.handleUpdatedState()
    );
  };

  handleUsername = e => {
    const { user } = this.props.store.app;
    user.name = e.target.value;
  };

  handleUpdatedState = () => {
    const { api, app: { user } } = this.props.store;

    if (this.state.disabled) {
      this.setState({ icon: "edit" });
      if (user.name !== this.state.prevUsername)
        api.updateUsername(user.name, this.state.prevUsername);
      message.info(
        "Your user info has been stored locally in the application. It might take a while for the NEO Blockchain to store and verify these changes."
      );
    } else {
      this.setState({
        icon: "check",
        prevUsername: user.name
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <Input
          style={{ width: "75%", marginBottom: "16px", border: "none" }}
          disabled={this.state.disabled}
          placeholder="Set a username"
          onPressEnter={this.toggleManageAccount}
          onChange={this.handleUsername}
          value={this.props.store.app.user.name}
        />
        <Button
          style={{ width: "15%", marginBottom: "16px", marginLeft: "10px" }}
          type="primary"
          shape="circle"
          icon={this.state.icon}
          onClick={this.toggleManageAccount}
        />
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
