// Imports
import React, { Component } from "react";
import { observer } from "mobx-react";
import ReactMarkdown from "react-markdown";
import { Button, Row, Col, Layout } from "antd";

// Styles
import "./MarkdownEditor.css";

// Components
const { Header } = Layout;

class MarkdownEditor extends Component {
  /**
   * TODO: all handleX files should go to a separate library!
   */

  handleMarkdown = event => {
    const { newPost } = this.props;
    newPost.postMarkdown = event.target.value;
  };

  handleTitle = event => {
    const { newPost } = this.props;
    newPost.postTitle = event.target.value;
  };

  render() {
    const { handlePost, newPost } = this.props;
    const fullArticle = `# ${newPost.postTitle}\n\n${newPost.postMarkdown}`;
    console.log(newPost.postTitle);
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
            <Button type="primary" onClick={() => handlePost(fullArticle)}>
              Post Article
            </Button>
          </div>
        </Header>
        <Row className="markdownEditor">
          <Col span={12} className="input">
            <textarea
              className="ant-layout-content"
              placeholder="Your article's content goes here"
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
