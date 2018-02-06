// Imports
import * as React from 'react';
import { inject, observer } from 'mobx-react';

// Components
import MobxComponent from './../MobxComponent';

class MarkdownEditor extends MobxComponent {
  render() {
    return (
      <div>
        This is the markdown editor!
      </div>
    );
  }
}

export default inject('store')(observer(MarkdownEditor));
