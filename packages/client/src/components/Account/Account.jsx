import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Button, Input } from "antd";

import views from "./../views/views";

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: true,
      icon: "lock",
      userName: this.props.store.app.user.name
    };
  }

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

  toggleManageAccount = () => {
    this.setState({ disabled: !this.state.disabled }, () =>
      this.handleUpdatedState()
    );
  };

  handleUsername = e => {
    this.setState({ userName: e.target.value });
  };

  handleUpdatedState = () => {
    const { user } = this.props.store.app;
    console.log(this.state);
    if (this.state.disabled) {
      this.setState({ icon: "lock" });
      user.name = this.state.userName;
      console.log(this.props);
    } else {
      this.setState({ icon: "unlock" });
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
          value={this.state.userName}
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
