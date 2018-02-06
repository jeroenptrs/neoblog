import * as React from 'react';

// models
const { Route } = require('mobx-router');

// views
import Home from './Home';

const views = {
  home: new Route({
    path: '/',
    component: <Home />
  })
};

export default views;
