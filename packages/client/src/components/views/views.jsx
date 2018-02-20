import React from "react";

// models
import { Route } from "mobx-router";

import store from "./../../lib/store";

// views
// import Redirect from "./../Redirect/Redirect";
import DomainViewer from "./DomainViewer";
import NewPost from "./NewPost";
import ArticleView from "./ArticleView";

const views = {
  home: new Route({
    path: "/",
    component: <DomainViewer domain="post." home />,
    beforeEnter: () => {
      store.app.states.fetchingArticles = true;
    }
  }),
  newPost: new Route({
    path: "/newPost",
    component: <NewPost />,
    beforeEnter: (route, params, propStore) =>
      propStore.app.states.menuStates.signedIn
  }),
  articleView: new Route({
    path: "/article/:fileHash",
    component: <ArticleView />,
    beforeEnter: () => {
      store.app.states.fetchingArticles = true;
      store.app.states.fetchingArticleInfo = true;
      store.app.currentArticle.content = undefined;
      store.app.currentArticle.info = undefined;
    }
  }),
  postPage: new Route({
    path: "/posts/page/:page",
    component: <DomainViewer domain="post." />,
    beforeEnter: () => {
      store.app.states.fetchingArticles = true;
    }
  }),
  categoryPage: new Route({
    path: "/category/:category/page/:page",
    component: <DomainViewer domain="category." />,
    beforeEnter: () => {
      store.app.states.fetchingArticles = true;
    }
  }),
  userPage: new Route({
    path: "/user/:user/page/:page",
    component: <DomainViewer domain="iser." />,
    beforeEnter: () => {
      store.app.states.fetchingArticles = true;
    }
  })
};

export default views;
