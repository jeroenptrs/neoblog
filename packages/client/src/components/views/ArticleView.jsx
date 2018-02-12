/**
 * Separated layer of Article Content and View.
 * This is so we can add loading components.
 */

// Imports
import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { series } from "async";

// Components
import Article from "./../Article/Article";

class ArticleView extends Component {
  async componentWillMount() {
    const { fileHash } = this.props.store.router.params;
    this.handleCat(fileHash);
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
          app.currentArticle = new TextDecoder("utf-8").decode(data);
          app.states.loadingArticles = false;
          return true;
        })
    ]);
  };

  render() {
    const { app } = this.props.store;
    const { loadingArticles } = app.states;
    const { currentArticle } = app;

    return loadingArticles ? (
      <div>Loading...</div>
    ) : (
      <Article source={currentArticle} />
    );
  }
}

export default inject("store")(observer(ArticleView));
