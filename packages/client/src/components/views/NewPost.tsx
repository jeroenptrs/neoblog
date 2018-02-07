// Imports
import * as React from 'react';
import { inject, observer } from 'mobx-react';

// Components
import MarkdownEditor from '../MarkdownEditor/MarkdownEditor';
import MobxComponent from './../MobxComponent';

class NewPost extends MobxComponent {
  render() {
    /* tslint:disable */console.log(this.props); /* tslint: enable */
    return (
      <MarkdownEditor />
    );
  }
}

export default inject('store')(observer(NewPost));
