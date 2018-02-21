// Imports
import React, { Component } from "react";
import { observer } from "mobx-react";
import ReactMarkdown from "react-markdown";
import { Menu, Dropdown, Icon, Button, Row, Col, Layout } from "antd";

// Styles
import "./MarkdownEditor.css";

import categories from "./../../lib/categories";

// Components
const { Header } = Layout;

class MarkdownEditor extends Component {
  handleMarkdown = event => {
    const { newPost } = this.props;
    newPost.postMarkdown = event.target.value;
  };

  handleTitle = event => {
    const { newPost } = this.props;
    newPost.postTitle = event.target.value;
  };

  handleCategory = event => {
    const { newPost } = this.props;
    newPost.category = event.key;
  };

  renderMenuItems = () =>
    categories.map(category => (
      <Menu.Item key={category}>{category}</Menu.Item>
    ));

  render() {
    const { handlePost, newPost, submitting, disabled } = this.props;
    const fullArticle = `# ${newPost.postTitle}\n\n${newPost.postMarkdown}`;
    const menuItems = this.renderMenuItems();
    return (
      <React.Fragment>
        <Header className="markdownEditor" style={{ padding: "0" }}>
          <div className="title">
            <input
              type="text"
              placeholder="Your title goes here"
              value={newPost.postTitle}
              onChange={this.handleTitle}
              tabIndex={1}
              autoFocus
            />
          </div>
          <div className="options">
            <div className="category">
              <span>Category</span>
              <Dropdown
                overlay={<Menu onClick={this.handleCategory}>{menuItems}</Menu>}
              >
                <Button>
                  {newPost.category || "Select a category"} <Icon type="down" />
                </Button>
              </Dropdown>
            </div>
            <div className="submit">
              <Button
                loading={submitting}
                disabled={submitting || disabled}
                type="primary"
                onClick={() => handlePost(fullArticle)}
              >
                Post Article
              </Button>
            </div>
          </div>
        </Header>
        <Row className="markdownEditor">
          <Col span={12} className="input">
            <textarea
              className="ant-layout-content"
              placeholder="The content of your article goes here"
              value={newPost.postMarkdown}
              onChange={this.handleMarkdown}
              tabIndex={2}
            />
          </Col>
          <Col span={12} className="result">
            <ReactMarkdown
              className="ant-layout-content"
              source={fullArticle}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default observer(MarkdownEditor);
