import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, Switch, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import FrameSelection from './containers/FrameSelectionContainer';

import store from './configureStore';

import './styles/index.css';
// import '../node_modules/semantic-ui-css/semantic.min.css'

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path="/select" component={FrameSelection} />
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
