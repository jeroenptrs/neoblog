// Imports
import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { series } from "async";
import { message } from "antd";

import views from "./../views/views";

// Components
import MarkdownEditor from "./../MarkdownEditor/MarkdownEditor";

class NewPost extends Component {
  handleFileHash = async file => {
    const { api, app: { newPost, states: { menuStates } } } = this.props.store;
    newPost.fileHash = file.hash;

    await api.submitPost(file.hash, newPost.category);
    menuStates.submitting = false;
    message.info(
      "Your article has been posted. It might take a while for the NEO Blockchain to store and verify these changes."
    );

    this.props.store.router.goTo(
      views.articleView,
      {
        ...this.props.store.router.params,
        fileHash: newPost.fileHash
      },
      this.props.store
    );
  };

  handlePost = async article => {
    const { menuStates } = this.props.store.app.states;
    menuStates.submitting = true;
    if (article) {
      const node = new window.Ipfs();

      await series([
        cb => node.once("ready", cb),
        cb =>
          node.version(err => {
            if (err) {
              return cb(err);
            }
            // console.log(`Version ${version.version}`);
            cb();
            return true;
          }),
        cb =>
          node.files.add(
            {
              /**
               * TODO: add wordphrase as article file name.
               * And figure out the use of adding a path.
               */
              path: `${"neoblog"}.md`,
              content: Buffer.from(article)
            },
            (err, filesAdded) => {
              // console.log(filesAdded[0]);
              this.handleFileHash(filesAdded[0]);
              cb(filesAdded[0].hash);
            }
          )
      ]);
    }
  };

  render() {
    const { submitting, disabled } = this.props.store.app.states.menuStates;
    return (
      <MarkdownEditor
        handlePost={this.handlePost}
        newPost={this.props.store.app.newPost}
        submitting={submitting}
        disabled={disabled}
      />
    );
  }
}

export default inject("store")(observer(NewPost));
