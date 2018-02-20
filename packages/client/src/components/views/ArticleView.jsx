/**
 * Separated layer of Article Content and View.
 * This is so we can add loading components.
 */

// Imports
import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { series } from "async";
import {
  scriptHashToAddress,
  unhex,
  hexToTimestamp,
  deserialize
} from "@neoblog/sdk";

// Components
import Article from "./../Article/Article";
import NeoblogIdenticon from "./../Identicon/Identicon";

class ArticleView extends Component {
  async componentWillMount() {
    const { fileHash } = this.props.store.router.params;
    this.handleCat(fileHash);
    this.handleUserData(fileHash);
  }

  handleCat = async fileHash => {
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
          const { app } = this.props.store;
          app.currentArticle.content = new TextDecoder("utf-8").decode(data);
          app.states.fetchingArticles = false;
          return true;
        })
    ]);
  };

  handleUserData = async fileHash => {
    const { api, app: { currentArticle, states } } = this.props.store;
    const rawData = await api.getArticleData(fileHash);
    const formattedData = deserialize(rawData);
    currentArticle.info = [
      scriptHashToAddress(formattedData[0]),
      unhex(formattedData[1]),
      hexToTimestamp(formattedData[2])
    ];
    states.fetchingArticleInfo = false;
  };

  renderContent = content => {
    const { fetchingArticles } = this.props.store.app.states;
    return fetchingArticles ? (
      <div className="text-content">Loading...</div>
    ) : (
      <Article source={content} />
    );
  };

  renderInfo = info => {
    const { fetchingArticleInfo } = this.props.store.app.states;
    return fetchingArticleInfo ? (
      <div className="text-content">Loading info...</div>
    ) : (
      <div className="text-content" style={{ textAlign: "right" }}>
        <div>
          <span style={{ paddingRight: "16px" }}>{info[0]}</span>
          <NeoblogIdenticon address={info[0]} />
        </div>
        <div>
          <span style={{ paddingRight: "16px" }}>{info[1]}</span>
          <span>{info[2]}</span>
        </div>
      </div>
    );
  };

  render() {
    const { app } = this.props.store;
    const { content, info } = app.currentArticle;

    return (
      <React.Fragment>
        {this.renderInfo(info)}
        {this.renderContent(content)}
      </React.Fragment>
    );
  }
}

export default inject("store")(observer(ArticleView));
