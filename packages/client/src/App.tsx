import * as React from 'react';
import Button from 'antd/lib/button';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, click this <Button type="primary">Button</Button>.
        </p>
      </div>
    );
  }
}

export default App;
