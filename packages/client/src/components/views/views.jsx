import React from 'react';

// models
import { Route } from 'mobx-router';
// views
import Home from './Home';
import NewPost from './NewPost';
import ArticleView from './ArticleView';

const views = {
  home: new Route({
    path: '/',
    component: <Home />,
  }),
  newPost: new Route({
    path: '/newPost',
    component: <NewPost />,
  }),
  articleView: new Route({
    path: '/article/:fileHash',
    component: <ArticleView />,
  }),
};

export default views;
