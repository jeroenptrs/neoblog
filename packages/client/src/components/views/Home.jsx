// Imports
import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { series } from "async";
import ReactMarkdown from "react-markdown";
// import { scriptHashToAddress } from "@neoblog/sdk";

// Components
import { Button } from "antd";

import views from "./views";

class Home extends Component {
  async componentWillMount() {
    const { states } = this.props.store.app;
    const data = await this.handleFetchLatest();
    this.data = data;
    states.fetchingArticles = false;
  }

  goToMarkdownEditor = () => {
    this.props.store.router.goTo(
      views.newPost,
      { ...this.props.store.router.params },
      this.props.store
    );
  };

  goToMockPage = () => {
    this.props.store.router.goTo(
      views.articleView,
      {
        ...this.props.store.router.params,
        fileHash: this.props.store.mockPost
      },
      this.props.store
    );
  };

  handleFetchLatest = async () => {
    const { api } = this.props.store;
    const postIndex = await api.getLatestPost();
    const postHash = await api.getArticle(postIndex);
    return this.handleCat(postHash);
  };

  handleCat = async fileHash =>
    new Promise(async resolve => {
      const node = new window.Ipfs();
      await series([
        cb => node.once("ready", cb),
        cb =>
          node.version((err, version) => {
            if (err) {
              return cb(err);
            }
            console.log(`Version ${version.version}`);
            cb();
            return true;
          }),
        cb =>
          node.files.cat(fileHash, (err, data) => {
            if (err) {
              return cb(err);
            }
            resolve(new TextDecoder("utf-8").decode(data));
            return true;
          })
      ]);
    });

  render() {
    const { fetchingArticles } = this.props.store.app.states;
    return fetchingArticles ? (
      <div className="text-content">
        <Button onClick={() => this.goToMockPage()}>Article</Button>
        &emsp;
        <Button onClick={() => this.goToMarkdownEditor()}>
          Markdown Editor
        </Button>
      </div>
    ) : (
      <div className="text-content">
        <ReactMarkdown source={this.data} />
      </div>
    );
  }
}

export default inject("store")(observer(Home));
