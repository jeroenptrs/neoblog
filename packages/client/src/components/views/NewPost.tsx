// Imports
import * as React from 'react';
import { inject, observer } from 'mobx-react';

// Components
import MarkdownEditor from '../MarkdownEditor/MarkdownEditor';

class NewPost extends React.Component {
  props: any;

  render() {
    return (
      <MarkdownEditor />
    );
  }
}

export default inject('store')(observer(NewPost));
