// Imports
import React from "react";
import { observer } from "mobx-react";
import { processAuthentication } from "@neoblog/sdk";
import { Button, Checkbox, Form, Icon, Input } from "antd";
import views from "../views/views";

// Styles
import "./Signin.css";

const FormItem = Form.Item;

class SigninForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tokenChoiceNEP: true,
      tokenChoiceMessage: "Use NEP-2 Token"
    };
  }

  onChange = e => {
    const text = e.target.checked ? "Use NEP-2 Token" : "Use WIF";
    this.setState({
      tokenChoiceNEP: e.target.checked,
      tokenChoiceMessage: text
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { router, app } = this.props.store;

    this.props.form.validateFields((err, values) => {
      if (!err) {
        try {
          app.user.WIF = processAuthentication(values.token, values.password);

          router.goTo(
            views.home,
            {
              ...router.params
            },
            this.props.store
          );
          console.log(authResult);
        } catch (error) {
          // TODO catch en display error to the user
          // Possible errors: not a valid token (No WIF or NEP2-token)
          //                  wrong password (when entering only a WIF)
          console.log(error);
        }
      }
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
        layout="horizontal"
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
        <span>
          Testing purposes - WIF:
          L3BiBoAuPj4AFbWry6n7wTqzbP28kZPX1RUgDgrrZq2Z6WuFtup7
        </span>
      </Form>
    );
  }
}

const Signin = Form.create()(SigninForm);
export default observer(Signin);
