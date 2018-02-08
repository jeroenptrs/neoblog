import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import store from './lib/store';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
