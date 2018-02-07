// Imports
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import ReactMarkdown from 'react-markdown';

// Styles
import './MarkdownEditor.css';

// Components
import { Button, Row, Col, Layout } from 'antd';
const { Header } = Layout;


class MarkdownEditor extends Component {
  handleMarkdown = (event) => {
    this.props.store.app.postMarkdown = event.target.value;
  }

  handleTitle = (event) => {
    this.props.store.app.postTitle = event.target.value;
  }

  render() {
    return (
      <React.Fragment>
        <Header className="markdownEditor" style={{ padding: '0' }}>
          <div className="title">
            <input
              type="text"
              value={this.props.store.app.postTitle}
              onChange={this.handleTitle}
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
              value={this.props.store.app.postMarkdown}
              onChange={this.handleMarkdown}
            />
          </Col>
          <Col span={12} className="result">
            <ReactMarkdown
              className="ant-layout-content"
              source={`# ${this.props.store.app.postTitle}\n\n${this.props.store.app.postMarkdown}`}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default inject('store')(observer(MarkdownEditor));
