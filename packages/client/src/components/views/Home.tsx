// Imports
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import views from './views';

// Components
import MobxComponent from './../MobxComponent';
import { Button } from 'antd';

class Home extends MobxComponent {
  goToMarkdownEditor() {
    this.router.goTo(views.newPost, {...this.router.params}, this.store);
  }

  render() {
    /* tslint:disable */console.log(this.props); /* tslint: enable */
    return (
      <div>
        <br/>
        &emsp;Test content <Button onClick={() => this.goToMarkdownEditor()}>Markdown Editor</Button>
      </div>
    );
  }
}

export default inject('store')(observer(Home));
