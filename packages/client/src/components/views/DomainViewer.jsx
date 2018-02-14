// Imports
import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import { scriptHashToAddress } from "@neoblog/sdk";

import views from "./views";

// Components
import Preview from "../Preview/Preview";

const PAGE_COUNT = 5;

class DomainViewer extends Component {
  async componentDidMount() {
    const { domain, home, store } = this.props;
    const {
      app: { states },
      router: { params: { page, category, user } }
    } = store;

    const articleIndex =
      category || user
        ? await this.handleFetchLatest(
            category ? domain + category : domain + user
          )
        : await this.handleFetchLatest(domain);
    states.articleIndex = this.handleArticleIndex(
      articleIndex,
      home ? 1 : page
    );

    states.fetchingArticles = false;
  }

  async componentWillReceiveProps(nextProps) {
    const { domain: propsDomain, home: propsHome, store } = this.props;
    const { router: { params: { page: propsPage } } } = store;

    const { domain: nextDomain, home: nextHome, store: nextStore } = nextProps;
    const {
      app: { states },
      router: {
        params: { page: nextPage, category: nextCategory, user: nextUser }
      }
    } = nextStore;

    const articleIndex =
      nextCategory || nextUser
        ? await this.handleFetchLatest(
            nextCategory ? nextDomain + nextCategory : nextDomain + nextUser
          )
        : await this.handleFetchLatest(nextDomain);

    if (
      // Same domain, different page
      propsDomain === nextDomain &&
      (propsHome !== nextHome || propsPage !== nextPage)
    ) {
      states.fetchingArticles = true;

      states.articleIndex = this.handleArticleIndex(
        articleIndex,
        nextHome ? 1 : nextPage
      );

      states.fetchingArticles = false;
    } else if (propsDomain !== nextDomain) {
      // Different domain, so different page altogether
      states.fetchingArticles = true;

      states.articleIndex = this.handleArticleIndex(
        articleIndex,
        nextHome ? 1 : nextPage
      );

      states.fetchingArticles = false;
    }
  }

  goToMarkdownEditor = () => {
    this.props.store.router.goTo(
      views.newPost,
      { ...this.props.store.router.params },
      this.props.store
    );
  };

  handleArticleIndex = (articleIndex, unformattedPage) => {
    let page = parseInt(unformattedPage, 10);
    const TOTAL_PAGES =
      Math.floor(articleIndex / PAGE_COUNT) + articleIndex % PAGE_COUNT;

    if (page < TOTAL_PAGES && page > 0) {
      const RESULT =
        articleIndex % PAGE_COUNT + PAGE_COUNT * (TOTAL_PAGES - page);
      return RESULT;
    } else if (page < 1) {
      page = 1; // Less than 1 => back to page 1
      const RESULT =
        articleIndex % PAGE_COUNT + PAGE_COUNT * (TOTAL_PAGES - page);
      return RESULT;
    } else if (page >= TOTAL_PAGES) {
      page = TOTAL_PAGES; // Larger than total pages => total pages, this can be set in 1 if clause
      const RESULT =
        articleIndex % PAGE_COUNT > 0 ? articleIndex % PAGE_COUNT : PAGE_COUNT;
      return RESULT;
      /**
       * If F.E. PAGE_COUNT = 5 and articleIndex % PAGE_COUNT equals 4,
       * that means that there are 4 articles left to list.
       * If the equasion equals 0 however, that means that there are FIVE (5) articles left to list!
       */
    }
    return articleIndex;
  };

  handleFetchLatest = async domain => {
    const { api } = this.props.store;
    const postIndex = await api.getLatest(domain);
    return postIndex;
  };

  renderPreviews = index => {
    if (index > 0) {
      const previews = [];
      let tabIndex = 1;

      for (let i = index; i > 0 && i > index - PAGE_COUNT; i -= 1) {
        tabIndex += 1;
        previews.push(
          <Preview
            key={`post.${i}`}
            index={i}
            tabbing={tabIndex}
            domain="post."
          />
        );
      }

      return previews;
    }

    return "There are no articles yet";
  };

  render() {
    const { fetchingArticles, articleIndex } = this.props.store.app.states;

    return fetchingArticles || !articleIndex ? (
      <div className="text-overview">Loading articles...</div>
    ) : (
      <div className="text-overview">{this.renderPreviews(articleIndex)}</div>
    );
  }
}

export default inject("store")(observer(DomainViewer));
