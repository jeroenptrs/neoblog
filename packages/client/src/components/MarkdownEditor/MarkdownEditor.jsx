// Imports
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import ReactMarkdown from 'react-markdown';
import { Button, Row, Col, Layout } from 'antd';

// Styles
import './MarkdownEditor.css';

// Components
const { Header } = Layout;


class MarkdownEditor extends Component {
  handleMarkdown = (event) => {
    const { app } = this.props.store;
    app.postMarkdown = event.target.value;
  }

  handleTitle = (event) => {
    const { app } = this.props.store;
    app.postTitle = event.target.value;
  }

  render() {
    const { app } = this.props.store;

    return (
      <React.Fragment>
        <Header className="markdownEditor" style={{ padding: '0' }}>
          <div className="title">
            <input
              type="text"
              placeholder="Your title goes here"
              value={app.postTitle}
              onChange={this.handleTitle}
              tabIndex={1}
              autoFocus
            />
          </div>
          <div className="options">
            <Button type="primary">Post Article</Button>
          </div>
        </Header>
        <Row className="markdownEditor">
          <Col span={12} className="input">
            <textarea
              className="ant-layout-content"
              placeholder="Your article's content goes here"
              value={app.postMarkdown}
              onChange={this.handleMarkdown}
              tabIndex={2}
            />
          </Col>
          <Col span={12} className="result">
            <ReactMarkdown
              className="ant-layout-content"
              source={`# ${app.postTitle}\n\n${app.postMarkdown}`}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default inject('store')(observer(MarkdownEditor));
