// Imports
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import ReactMarkdown from 'react-markdown';
import { Button, Row, Col, Layout } from 'antd';
import * as IPFS from 'ipfs';
import { series } from 'async';

// Styles
import './MarkdownEditor.css';

// Components
const { Header } = Layout;

class MarkdownEditor extends Component {
  /**
   * TODO: all handleX files should go to a separate library!
   */

  handleMarkdown = (event) => {
    const { newPost } = this.props.store.app;
    newPost.postMarkdown = event.target.value;
  }

  handleTitle = (event) => {
    const { newPost } = this.props.store.app;
    newPost.postTitle = event.target.value;
  }

  handleFileHash = (file) => {
    console.log('\nAdded file:', file.path, file.hash);

    const { newPost } = this.props.store.app;
    newPost.fileHash = file.hash;

    /**
     * TODO: handle posting to blockchain!
     */
  }

  handlePost = async (article) => {
    /**
     * TODO: State management in between various stages of IPFS communication
     */
    if (article) {
      const node = new IPFS();

      await series([
        cb => node.on('ready', cb),
        cb => node.version((err, version) => {
          if (err) { return cb(err); }
          console.log(`Version ${version.version}`);
          cb();
          return true;
        }),
        cb => node.files.add({
          /**
           * TODO: add wordphrase as article file name.
           * And figure out the use of adding a path.
           */
          path: `${'neoblog'}.md`,
          content: Buffer.from(article),
        }, (err, filesAdded) => {
          this.handleFileHash(filesAdded[0]);
          cb(filesAdded[0].hash);
        }),
      ]);
    }
  }

  render() {
    const { newPost } = this.props.store.app;
    const fullArticle = `# ${newPost.postTitle}\n\n${newPost.postMarkdown}`;

    return (
      <React.Fragment>
        <Header className="markdownEditor" style={{ padding: '0' }}>
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
            <Button type="primary" onClick={() => this.handlePost(fullArticle)}>Post Article</Button>
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

export default inject('store')(observer(MarkdownEditor));
