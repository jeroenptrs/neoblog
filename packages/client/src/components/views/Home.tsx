import * as React from 'react';
import MobxComponent from './../MobxComponent';
import { inject, observer } from 'mobx-react';

// Components
import Button from 'antd/lib/button';

class Home extends MobxComponent {
  render() {
    const { title } = this.props.store.app;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{title}</h1>
        </header>
        <p className="App-intro">
          To get started, click this <Button type="primary">Button</Button>.
        </p>
      </div>
    );
  }
}

export default inject('store')(observer(Home));
