// Imports
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

// Components
import MarkdownEditor from '../MarkdownEditor/MarkdownEditor';

class NewPost extends Component {
  render() {
    return (
      <MarkdownEditor />
    );
  }
}

export default inject('store')(observer(NewPost));
