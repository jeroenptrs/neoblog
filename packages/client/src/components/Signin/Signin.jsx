// Imports
import React from "react";
import { inject, observer } from "mobx-react";
import { determineKey } from "@neoblog/sdk";
import { Button, Icon, Input } from "antd";

// Styles
import "./Signin.css";

class SignIn extends React.Component {
  onKeyChange = e => {
    const { authentication } = this.props.store.app.user;
    const determination = determineKey(e.target.value);

    if (determination === "WIF") authentication.passPhrase = "";
    if (determination) authentication.signInType = determination;
    else authentication.signInType = undefined;

    authentication.key = e.target.value;
  };

  onPassChange = e => {
    const { authentication } = this.props.store.app.user;
    authentication.passPhrase = e.target.value;
  };

  handleClick = async e => {
    e.preventDefault();
    const { menuStates } = this.props.store.app.states;
    menuStates.submitting = true;
    await this.forceUpdate();
    setTimeout(() => {
      this.handleSubmit();
    }, 100);
  };

  handleSubmit = async () => {
    try {
      const { api, app: { user } } = this.props.store;
      const {
        states: { menuStates },
        user: { authentication }
      } = this.props.store.app;

      if (
        await api.processAuthentication(
          authentication.key,
          authentication.passPhrase
        )
      ) {
        menuStates.signedIn = true;
        menuStates.menuOpened = false;
        user.name = api.getAccount().userName;
      }

      menuStates.submitting = false;
    } catch (error) {
      /**
       * TODO catch en display error to the user
       * Possible errors:
       * not a valid token (No WIF or NEP2-token)
       * wrong password (when entering only a WIF)
       */
      console.log(error);
      const { menuStates } = this.props.store.app.states;
      menuStates.submitting = false;
    }
  };

  render() {
    const {
      user: { authentication },
      states: { menuStates }
    } = this.props.store.app;

    return (
      <React.Fragment>
        <Input
          prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
          style={{ marginBottom: "16px" }}
          placeholder="NEP-2 or WIF key"
          value={authentication.key}
          onChange={this.onKeyChange}
        />
        <Input
          prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
          style={{ marginBottom: "16px" }}
          type="password"
          placeholder={
            authentication.signInType === "WIF"
              ? "No password needed"
              : "Password"
          }
          disabled={authentication.signInType === "WIF"}
          value={authentication.passPhrase}
          onChange={this.onPassChange}
        />
        <Button
          loading={menuStates.submitting}
          disabled={menuStates.submitting}
          type="primary"
          htmlType="submit"
          className="login-form-button"
          style={{ width: "100%" }}
          onClick={this.handleClick}
        >
          Sign in
        </Button>
      </React.Fragment>
    );
  }
}

export default inject("store")(observer(SignIn));
