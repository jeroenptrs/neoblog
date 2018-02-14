// Imports
import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import { scriptHashToAddress } from "@neoblog/sdk";
import { Pagination } from "antd";

import views from "./views";

// Components
import Preview from "../Preview/Preview";

const PAGE_COUNT = 2;

class DomainViewer extends Component {
  async componentDidMount() {
    await this.mountingComponent();
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
            `${nextDomain + (nextCategory || nextUser)}.`
          )
        : await this.handleFetchLatest(nextDomain);
    states.totalArticles = articleIndex;

    if (
      // Different domain
      propsDomain !== nextDomain ||
      // Same domain, different page
      (propsDomain === nextDomain &&
        (propsHome !== nextHome || propsPage !== nextPage))
    ) {
      states.fetchingArticles = true;

      const result = this.handleArticleIndex(
        articleIndex,
        nextHome ? 1 : nextPage
      );
      states.articleIndex = result.index;

      if (result.moveTo) {
        const newPath = window.location.href.replace(
          window.location.href.substr(window.location.href.indexOf("/page")),
          `/page/${result.moveTo}`
        );
        window.history.replaceState(window.history.state, "Neoblog", newPath);
        states.currentPage = result.moveTo;
      } else {
        states.currentPage = nextHome ? 1 : parseInt(nextPage, 10);
      }

      states.fetchingArticles = false;
    }
  }

  mountingComponent = async () => {
    const { domain, home, store } = this.props;
    const {
      app: { states },
      router: { params: { page, category, user } }
    } = store;

    const articleIndex =
      category || user
        ? await this.handleFetchLatest(`${domain + (category || domain)}.`)
        : await this.handleFetchLatest(domain);
    states.totalArticles = articleIndex;
    const result = this.handleArticleIndex(articleIndex, home ? 1 : page);
    states.articleIndex = result.index;

    if (result.moveTo) {
      const newPath = window.location.href.replace(
        window.location.href.substr(window.location.href.indexOf("/page")),
        `/page/${result.moveTo}`
      );
      window.history.replaceState(window.history.state, "Neoblog", newPath);
      states.currentPage = result.moveTo;
    } else {
      states.currentPage = home ? 1 : parseInt(page, 10);
    }

    states.fetchingArticles = false;
  };

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
      return { index: RESULT };
    } else if (page >= TOTAL_PAGES) {
      const RESULT =
        articleIndex % PAGE_COUNT > 0 ? articleIndex % PAGE_COUNT : PAGE_COUNT;
      return {
        index: RESULT,
        moveTo: page > TOTAL_PAGES ? TOTAL_PAGES : undefined
      };
      /**
       * If F.E. PAGE_COUNT = 5 and articleIndex % PAGE_COUNT equals 4,
       * that means that there are 4 articles left to list.
       * If the equasion equals 0 however, that means that there are FIVE (5) articles left to list!
       */
    } else if (page < 1) {
      page = 1; // Less than 1 => back to page 1
      const RESULT =
        articleIndex % PAGE_COUNT + PAGE_COUNT * (TOTAL_PAGES - page);
      return { index: RESULT, moveTo: page };
    }
    return articleIndex;
  };

  handleFetchLatest = async domain => {
    const { api } = this.props.store;
    const postIndex = await api.getLatest(domain);
    return postIndex;
  };

  handlePagination = async page => {
    const { router, app } = this.props.store;
    const { category, user } = router.params;
    router.goTo(
      category || user ? views.categoryPage : views.postPage,
      {
        ...router.params,
        page
      },
      this.props.store
    );
    app.states.fetchingArticles = true;
    await this.mountingComponent();
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
    const {
      fetchingArticles,
      articleIndex,
      totalArticles,
      currentPage
    } = this.props.store.app.states;

    return fetchingArticles || !articleIndex ? (
      <div className="text-overview">Loading articles...</div>
    ) : (
      <React.Fragment>
        <div className="text-overview">{this.renderPreviews(articleIndex)}</div>
        <div className="text-pagination">
          <Pagination
            defaultCurrent={currentPage}
            showTotal={total => `${total} articles`}
            onChange={this.handlePagination}
            pageSize={PAGE_COUNT}
            total={totalArticles}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default inject("store")(observer(DomainViewer));
