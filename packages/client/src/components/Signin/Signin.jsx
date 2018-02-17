// Imports
import React from "react";
import { observer } from "mobx-react";
// Styles
import "./Signin.css";
// Import from SDK
import { processAuthentication } from "@neoblog/sdk";
// Ant imports
import { Button, Checkbox, Form, Icon, Input } from "antd";

const FormItem = Form.Item;

class SigninForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tokenChoiceNEP: true,
      tokenChoiceMessage: "Use NEP-2 Token"
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        try {
          const authResult = processAuthentication(
            values.token,
            values.password
          );
          console.log(authResult);
        } catch (e) {
          // TODO catch en display error to the user
          // Possible errors: not a valid token (No WIF or NEP2-token)
          //                  wrong password (when entering only a WIF)
          console.log(e);
        }
      }
    });
  };

  onChange = e => {
    const text = e.target.checked ? "Use NEP-2 Token" : "Use WIF";
    this.setState({
      tokenChoiceNEP: e.target.checked,
      tokenChoiceMessage: text
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8 }
    };
    const buttonItemLayout = {
      wrapperCol: { span: 8, offset: 0 }
    };

    return (
      <Form
        onSubmit={this.handleSubmit}
        className="login-form"
        layout={"horizontal"}
      >
        <FormItem {...formItemLayout}>
          {getFieldDecorator("token", {
            rules: [
              { required: true, message: "Please input NEP-2 or WIF token!" }
            ]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="NEP-2 or WIF token"
            />
          )}
        </FormItem>
        {this.state.tokenChoiceNEP && (
          <FormItem {...formItemLayout}>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </FormItem>
        )}

        <FormItem {...buttonItemLayout}>
          <Checkbox
            onChange={this.onChange}
            checked={this.state.tokenChoiceNEP}
          >
            {this.state.tokenChoiceMessage}
          </Checkbox>
          <br />
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          <br />
        </FormItem>
        <br />
      </Form>
    );
  }
}

const Signin = Form.create()(SigninForm);
export default observer(Signin);
