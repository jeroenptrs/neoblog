import * as React from 'react';
import MobxComponent from './../MobxComponent';

class Home extends MobxComponent {
  render() {
    /* tslint:disable */console.log(this.props); /* tslint: enable */
    return (
      <div>
        Test content
      </div>
    );
  }
}

export default Home;
