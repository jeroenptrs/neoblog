// Imports
import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { addressToScriptHash } from "@neoblog/sdk";
import { Pagination } from "antd";

import views from "./views";

// Components
import Preview from "../Preview/Preview";
import NeoblogIdenticon from "../Identicon/Identicon";

const PAGE_COUNT = 5;

class DomainViewer extends Component {
  async componentDidMount() {
    await this.mountingComponent();
  }

  async componentWillReceiveProps(nextProps) {
    const { domain: propsDomain, home: propsHome, store } = this.props;
    const { router: { params: { page: propsPage, user } } } = store;

    const { domain: nextDomain, home: nextHome, store: nextStore } = nextProps;
    const {
      app: { states },
      router: { params: { page: nextPage, category: nextCat, user: nextUsr } }
    } = nextStore;

    const nextCategory = nextCat ? nextCat.replace(/%20| /g, " ") : undefined;
    const nextUser = nextUsr ? addressToScriptHash(nextUsr) : undefined;
    const articleQuery =
      nextDomain +
      (nextCategory || nextUser ? `${nextCategory || nextUser}.` : "");

    const articleIndex = await this.handleFetchLatest(articleQuery);
    states.totalArticles = articleIndex;

    if (articleIndex > 0) {
      if (
        // Different domain
        propsDomain !== nextDomain ||
        // Same domain, different page
        (propsDomain === nextDomain &&
          (propsHome !== nextHome || propsPage !== nextPage))
      ) {
        states.fetchingArticles = true;

        if (nextUsr !== user) store.app.currentArticle.userName = undefined;

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

        store.app.currentArticle.userName =
          nextUsr !== user ? await store.api.getUserData(nextUsr) : undefined;
      }
    }
  }

  mountingComponent = async () => {
    const { domain, home, store } = this.props;
    const {
      app: { states },
      router: { params: { page, category: cat, user: usr } }
    } = store;

    const category = cat ? cat.replace(/%20| /g, " ") : undefined;
    const user = usr ? addressToScriptHash(usr) : undefined;
    const articleQuery =
      domain + (category || user ? `${category || user}.` : "");

    const articleIndex = await this.handleFetchLatest(articleQuery);
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

    store.app.currentArticle.userName = usr
      ? await store.api.getUserData(usr)
      : undefined;
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
      Math.floor(articleIndex / PAGE_COUNT) +
      (articleIndex % PAGE_COUNT > 0 ? 1 : 0);

    if (articleIndex === 0) {
      return { index: 0 };
    }

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
    try {
      const { api } = this.props.store;
      const postIndex = await api.getLatest(domain);
      return postIndex;
    } catch (e) {
      return 0;
    }
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

      const { domain, store } = this.props;
      const { router: { params: { category: cat, user: usr } } } = store;

      const category = cat ? cat.replace(/%20| /g, " ") : undefined;
      const user = usr ? addressToScriptHash(usr) : undefined;
      const articleQuery =
        domain + (category || user ? `${category || user}.` : "");

      for (let i = index; i > 0 && i > index - PAGE_COUNT; i -= 1) {
        tabIndex += 1;
        previews.push(
          <Preview
            key={articleQuery + i}
            index={i}
            tabbing={tabIndex}
            domain={articleQuery}
          />
        );
      }

      return previews;
    }

    return <div style={{ textAlign: "center" }}>There are no articles yet</div>;
  };

  render() {
    const {
      fetchingArticles,
      articleIndex,
      totalArticles,
      currentPage
    } = this.props.store.app.states;
    const { category: cat, user } = this.props.store.router.params;
    const category = cat ? cat.replace(/%20| /g, " ") : undefined;
    const { userName } = this.props.store.app.currentArticle;

    return fetchingArticles || (articleIndex !== 0 && !articleIndex) ? (
      <div className="text-overview">Loading articles...</div>
    ) : (
      <React.Fragment>
        {category || user ? (
          <div className="text-overview">
            {category ? (
              <h1>{category}</h1>
            ) : (
              <div className="userDetails">
                <div className="identicon">
                  <NeoblogIdenticon size={64} address={user} />
                </div>
                <div>{userName || user}</div>
              </div>
            )}
          </div>
        ) : null}
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
