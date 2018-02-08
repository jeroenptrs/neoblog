// Imports
import React from 'react';
import { inject, observer } from 'mobx-react';
import ReactMarkdown from 'react-markdown';
// import { Button, Row, Col, Layout } from 'antd';
// import * as IPFS from 'ipfs';
// import { series } from 'async';

// Styles
import './Article.css';

const Article = props => <ReactMarkdown source={props.source} />;

export default inject('store')(observer(Article));
