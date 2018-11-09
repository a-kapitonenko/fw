import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import FrameSelection from './containers/FrameSelectionContainer';

import store from './configureStore';

import './styles/index.css';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/select" component={FrameSelection} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
