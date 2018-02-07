// Imports
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import views from './views';

// Components
import { Button } from 'antd';

class Home extends Component {
  props: any;

  goToMarkdownEditor() {
    this.props.store.router.goTo(views.newPost, {...this.props.store.router.params}, this.props.store);
  }

  render() {
    return (
      <div>
        <br/>
        &emsp;Test content <Button onClick={() => this.goToMarkdownEditor()}>Markdown Editor</Button>
      </div>
    );
  }
}

export default inject('store')(observer(Home));
