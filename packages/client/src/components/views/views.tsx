import * as React from 'react';

// models
const { Route } = require('mobx-router');

// views
import Home from './Home';
import NewPost from './NewPost';

const views = {
  home: new Route({
    path: '/',
    component: <Home />
  }),
  newPost: new Route({
    path: '/newPost',
    component: <NewPost />
  })
};

export default views;
