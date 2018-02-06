import * as React from 'react';

// models
const { Route } = require('mobx-router');

// views
import Home from './Home';
import MarkdownEditor from './MarkdownEditor';

const views = {
  home: new Route({
    path: '/',
    component: <Home />
  }),
  newPost: new Route({
    path: '/newPost',
    component: <MarkdownEditor />
  })
};

export default views;
