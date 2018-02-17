import React from "react";

// models
import { Route } from "mobx-router";

import store from "./../../lib/store";

// views
// import Redirect from "./../Redirect/Redirect";
import DomainViewer from "./DomainViewer";
import NewPost from "./NewPost";
import ArticleView from "./ArticleView";
import SignInView from "./SigninView";

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
    component: <NewPost />
  }),
  articleView: new Route({
    path: "/article/:fileHash",
    component: <ArticleView />,
    beforeEnter: () => {
      store.app.currentArticle = undefined;
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
  signIn: new Route({
    path: "/signin",
    component: <SignInView domain="" />,
    beforeEnter: () => {
      store.app.states.fetchingArticles = false;
    }
  })
};

export default views;
