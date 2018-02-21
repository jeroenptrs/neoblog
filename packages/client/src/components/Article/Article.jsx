// Imports
import React from "react";
import { inject, observer } from "mobx-react";
import ReactMarkdown from "react-markdown";

// Styles
import "./Article.css";

const Article = props => <ReactMarkdown source={props.source} />;

export default inject("store")(observer(Article));
