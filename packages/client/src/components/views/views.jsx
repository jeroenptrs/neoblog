import React from "react";

// models
import { Route } from "mobx-router";

import store from "./../../lib/store";

// views
import Home from "./Home";
import NewPost from "./NewPost";
import ArticleView from "./ArticleView";

const views = {
  home: new Route({
    path: "/",
    component: <Home />,
    beforeEnter: () => {
      store.app.states.fetchingArticles = true;
    }
  }),
  newPost: new Route({
    path: "/newPost",
    component: <NewPost />
  }),
  articleView: new Route({
    path: "/article/:fileHash",
    component: <ArticleView />,
    beforeEnter: () => {
      store.app.currentArticle = undefined;
    }
  })
};

export default views;
