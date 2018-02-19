// Imports
import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { series } from "async";

// import views from "./../views/views";

// Components
import MarkdownEditor from "./../MarkdownEditor/MarkdownEditor";

class NewPost extends Component {
  handleFileHash = async file => {
    const { api, app: { newPost, states: { menuStates } } } = this.props.store;
    newPost.fileHash = file.hash;

    await api.submitPost(file.hash, "NeObLoG");
    menuStates.submitting = false;
    /**
     * TODO: handle posting to blockchain!
     */
    console.log(newPost.fileHash);

    // this.props.store.router.goTo(
    //   views.articleView,
    //   {
    //     ...this.props.store.router.params,
    //     fileHash: newPost.fileHash
    //   },
    //   this.props.store
    // );
  };

  handlePost = async article => {
    const { menuStates } = this.props.store.app.states;
    menuStates.submitting = true;
    /**
     * TODO: State management in between various stages of IPFS communication
     */
    if (article) {
      const node = new window.Ipfs();

      await series([
        cb => node.once("ready", cb),
        cb =>
          node.version((err, version) => {
            if (err) {
              return cb(err);
            }
            console.log(`Version ${version.version}`);
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
              console.log(filesAdded[0]);
              this.handleFileHash(filesAdded[0]);
              cb(filesAdded[0].hash);
            }
          )
      ]);
    }
  };

  render() {
    const { submitting } = this.props.store.app.states.menuStates;
    return (
      <MarkdownEditor
        handlePost={this.handlePost}
        newPost={this.props.store.app.newPost}
        submitting={submitting}
      />
    );
  }
}

export default inject("store")(observer(NewPost));
