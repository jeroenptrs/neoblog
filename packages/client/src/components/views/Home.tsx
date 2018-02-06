import * as React from 'react';
import MobxComponent from './../MobxComponent';
import { inject, observer } from 'mobx-react';

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

export default inject('store')(observer(Home));
