// Imports
import React from 'react';
import { inject, observer } from 'mobx-react';

// Components
import MarkdownEditor from './../MarkdownEditor/MarkdownEditor';

const NewPost = () => <MarkdownEditor />;

export default inject('store')(observer(NewPost));
