// Imports
import React, { Component } from "react";
import { inject, observer } from "mobx-react";

// Components
import { Button } from "antd";

import views from "./views";

class Home extends Component {
  goToMarkdownEditor = () => {
    this.props.store.router.goTo(
      views.newPost,
      { ...this.props.store.router.params },
      this.props.store
    );
  };

  goToMockPage = () => {
    this.props.store.router.goTo(
      views.articleView,
      {
        ...this.props.store.router.params,
        fileHash: this.props.store.mockPost
      },
      this.props.store
    );
  };

  render() {
    return (
      <div>
        <br />
        <Button onClick={() => this.goToMockPage()}>Article</Button>
        <Button onClick={() => this.goToMarkdownEditor()}>
          Markdown Editor
        </Button>
      </div>
    );
  }
}

export default inject("store")(observer(Home));
