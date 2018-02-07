// Imports
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

// Components
import { Button } from 'antd';

import views from './views';

class Home extends Component {
  goToMarkdownEditor = () => {
    this.props.store.router.goTo(
      views.newPost,
      { ...this.props.store.router.params },
      this.props.store,
    );
  }

  render() {
    return (
      <div>
        <br />
        &emsp;Test content
        <Button onClick={() => this.goToMarkdownEditor()}>
          Markdown Editor
        </Button>
      </div>
    );
  }
}

export default inject('store')(observer(Home));
