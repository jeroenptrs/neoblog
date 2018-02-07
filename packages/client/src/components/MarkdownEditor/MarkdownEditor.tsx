// Imports
import * as React from 'react';
import { inject, observer } from 'mobx-react';
const ReactMarkdown = require('react-markdown');

// Components
import { Row, Col } from 'antd';
import MobxComponent from '../MobxComponent';

// Styles
import './MarkdownEditor.css';

class MarkdownEditor extends MobxComponent {
  /* tslint:disable */
  handleChange = (event: any) => {
    this.props.store.app.postMarkdown = event.target.value;
  }
  /*tslint:enable */

  render() {
    return (
      <Row className="markdownEditor">
        <Col span={12} className="input">
          <textarea
            className="ant-layout-content"
            value={this.props.store.app.postMarkdown}
            onChange={this.handleChange}
          />
        </Col>
        <Col span={12} className="result">
          <ReactMarkdown
            className="ant-layout-content"
            source={this.props.store.app.postMarkdown}
          />
        </Col>
      </Row>
    );
  }
}

export default inject('store')(observer(MarkdownEditor));
