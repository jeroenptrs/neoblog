// Imports
import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { series } from "async";
import * as removeMd from "remove-markdown";
// import ReactMarkdown from "react-markdown";
// import { scriptHashToAddress } from "@neoblog/sdk";

import views from "./../views/views";

import "./Preview.css";

class Preview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      doneFetching: false,
      fileHash: undefined,
      article: undefined
    };
  }

  async componentWillMount() {
    const { article, fileHash } = await this.handleFetchHash();
    this.setState({
      doneFetching: true,
      fileHash,
      article
    });
  }

  goToPage = fileHash => {
    this.props.store.router.goTo(
      views.articleView,
      {
        fileHash
      },
      this.props.store
    );
  };

  handleFetchHash = async () => {
    const { domain, index, store: { api } } = this.props;
    const fileHash = await api.getArticle(domain, index);
    const article = await this.handleCat(fileHash);
    return {
      fileHash,
      article
    };
  };

  handleCat = async fileHash =>
    new Promise(async resolve => {
      const node = new window.Ipfs();
      await series([
        cb => node.once("ready", cb),
        cb =>
          node.version(err => {
            if (err) {
              return cb(err);
            }
            // console.log(`Version ${version.version}`);
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

  handleTitle = article => {
    const content = article.substr(article.indexOf("\n") + 1);
    const title = (
      <div className="title">
        {article.substr(1, article.indexOf("\n") - 1)}
      </div>
    );

    return { content, title };
  };

  handleStrip = article => {
    const stepOne = removeMd(article);
    const stepTwo = stepOne
      .substr(0, 200)
      .replace(/\n/g, " ")
      .replace(/\s\s+/g, " ")
      .trim();
    return <div className="content">{`${stepTwo}...`}</div>;
  };

  renderPreview = article => {
    const { title, content } = this.handleTitle(article);
    const strippedContent = this.handleStrip(content);
    return [title, strippedContent];
  };

  render() {
    const { doneFetching } = this.state;
    return doneFetching ? (
      <div
        className="preview"
        key={this.state.fileHash}
        role="link"
        onClick={() => this.goToPage(this.state.fileHash)}
        tabIndex={this.props.tabbing}
      >
        {this.renderPreview(this.state.article)}
      </div>
    ) : (
      <div className="previewGhost">
        <div className="title">&nbsp;</div>
        <div className="content">&nbsp;</div>
      </div>
    );
  }
}

export default inject("store")(observer(Preview));
