// Imports
import React from "react";
import { inject, observer } from "mobx-react";
import { processAuthentication, determineKey } from "@neoblog/sdk";
import { Button, Form, Icon, Input } from "antd";

// Styles
import "./Signin.css";

const FormItem = Form.Item;

class SigninForm extends React.Component {
  handleSubmit = e => {
    const { app } = this.props.store;
    const { menuStates } = app.states;
    menuStates.submitting = true;
    e.preventDefault();

    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          app.user.WIF = await processAuthentication(
            values.token,
            values.password
          );
          console.log(app.user.WIF);
          this.endSubmit();
        } catch (error) {
          /**
           * TODO catch en display error to the user
           * Possible errors:
           * not a valid token (No WIF or NEP2-token)
           * wrong password (when entering only a WIF)
           */
          console.log(error);
          this.endSubmit();
        }
      }
    });
  };

  endSubmit = () => {
    const { menuStates } = this.props.store.app.states;
    menuStates.submitting = false;
    this.forceUpdate();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { signInType, states: { menuStates } } = this.props.store.app;

    return (
      <Form
        onSubmit={this.handleSubmit}
        className="login-form"
        layout="horizontal"
      >
        <FormItem style={{ marginBottom: "16px" }}>
          {getFieldDecorator("token", {
            rules: [{ required: true, message: "Use your WIF or NEP-2 key" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="NEP-2 or WIF key"
            />
          )}
        </FormItem>
        <FormItem style={{ marginBottom: "16px" }}>
          {getFieldDecorator("password", {
            rules: [
              {
                required: signInType === "NEP2",
                message:
                  signInType === "NEP2" ? "Please input your Password!" : ""
              }
            ]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder={
                signInType === "WIF" ? "No password needed" : "Password"
              }
              disabled={signInType === "WIF"}
            />
          )}
        </FormItem>

        <FormItem style={{ marginBottom: "0px", textAlign: "right" }}>
          <Button
            loading={menuStates.submitting}
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: "100%" }}
          >
            Sign in
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const Signin = Form.create({
  onFieldsChange(props, changedFields) {
    if (changedFields.token) {
      const token = changedFields.token.value;
      const determination = determineKey(token);
      if (determination) props.store.app.signInType = determination;
      else props.store.app.signInType = undefined;
    }
  }
})(SigninForm);
export default inject("store")(observer(Signin));
