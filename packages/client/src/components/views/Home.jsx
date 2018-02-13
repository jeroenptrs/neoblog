// Imports
import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import { scriptHashToAddress } from "@neoblog/sdk";

import views from "./views";

// Components
import Preview from "../Preview/Preview";

class Home extends Component {
  async componentDidMount() {
    const { states } = this.props.store.app;
    const articleIndex = await this.handleFetchLatest();
    this.articleIndex = articleIndex;
    states.fetchingArticles = false;
  }

  goToMarkdownEditor = () => {
    this.props.store.router.goTo(
      views.newPost,
      { ...this.props.store.router.params },
      this.props.store
    );
  };

  handleFetchLatest = async () => {
    const { api } = this.props.store;
    const postIndex = await api.getLatestPost();
    return postIndex;
  };

  renderPreviews = index => {
    if (index > 0) {
      const previews = [];
      for (let i = index; i > 0; i -= 1)
        previews.push(<Preview key={`post.${i}`} index={i} domain="post." />);
      return previews;
    }

    return "There are no articles yet";
  };

  render() {
    const { fetchingArticles } = this.props.store.app.states;
    return fetchingArticles && !this.articleIndex ? (
      <div className="text-overview">Loading articles...</div>
    ) : (
      <div className="text-overview">
        {this.renderPreviews(this.articleIndex)}
      </div>
    );
  }
}

export default inject("store")(observer(Home));
