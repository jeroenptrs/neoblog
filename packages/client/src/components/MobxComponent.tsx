import * as React from 'react';
import { inject, observer } from 'mobx-react';

class MobxComponent extends React.Component {
  /* tslint:disable */props: any; /* tslint: enable */
  store = this.props.store;
  appState = this.store.appState;
  router = this.store.router;
}

export default inject('store')(observer(MobxComponent));
