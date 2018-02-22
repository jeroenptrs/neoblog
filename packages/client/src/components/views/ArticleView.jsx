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
  deserialize,
  getFromGateway
} from "@neoblog/sdk";

// Components
import { Link } from "mobx-router";
import Article from "./../Article/Article";
import NeoblogIdenticon from "./../Identicon/Identicon";

import views from "./views";

class ArticleView extends Component {
  async componentWillMount() {
    const { fileHash } = this.props.store.router.params;
    this.handleFetch(fileHash);
    this.handleUserData(fileHash);
  }

  handleFetch = async fileHash => {
    const { app } = this.props.store;
    const { data } = await getFromGateway(fileHash);
    app.currentArticle.content = data;
    app.states.fetchingArticles = false;
  };

  handleCat = async fileHash => {
    const node = new window.Ipfs();
    await series([
      cb => node.once("ready", cb),
      cb =>
        node.version((err, version) => {
          if (err) {
            console.log("error at version!");
            return cb(err);
          }
          console.log(`Version ${version.version}`);
          cb();
          return true;
        }),
      cb =>
        node.files.cat(fileHash, (err, data) => {
          if (err) {
            console.log("error at cat");
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
    const userAddress = scriptHashToAddress(formattedData[0]);
    currentArticle.info = [
      userAddress,
      unhex(formattedData[1]),
      hexToTimestamp(formattedData[2])
    ];
    states.fetchingArticleInfo = false;

    currentArticle.userName = await api.getUserData(userAddress);
  };

  renderContent = content => {
    const { fetchingArticles } = this.props.store.app.states;
    return fetchingArticles ? (
      <div>Loading...</div>
    ) : (
      <Article source={content} />
    );
  };

  renderInfo = (info, userName) => {
    const { fetchingArticleInfo } = this.props.store.app.states;
    return fetchingArticleInfo ? (
      <div>Loading info...</div>
    ) : (
      <div className="article">
        <div className="identicon">
          <NeoblogIdenticon address={info[0]} size={64} />
        </div>
        <div className="info">
          <Link
            view={views.userPage}
            params={{
              user: info[0],
              page: 1
            }}
            store={this.props.store}
          >
            {userName || info[0]}
          </Link>
          <Link
            view={views.categoryPage}
            params={{
              category: info[1],
              page: 1
            }}
            store={this.props.store}
          >
            {info[1]}
          </Link>
          <span>{info[2]}</span>
        </div>
      </div>
    );
  };

  render() {
    const { app } = this.props.store;
    const { content, info, userName } = app.currentArticle;

    return (
      <div className="text-content">
        {this.renderInfo(info, userName)}
        {this.renderContent(content)}
      </div>
    );
  }
}

export default inject("store")(observer(ArticleView));
