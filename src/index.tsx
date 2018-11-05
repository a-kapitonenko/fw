import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, Switch, HashRouter } from 'react-router-dom';

import FrameSelection from './containers/FrameSelection';

import './styles/index.css';
import '../node_modules/semantic-ui-css/semantic.min.css'

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route path="/select" component={FrameSelection} />
    </Switch>
  </HashRouter>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Route, Switch, HashRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
// import Home from './containers/Home';
// import store from './store';
// import theme from './theme';
// import './styles/index.css';

// ReactDOM.render(
//   <Provider store={store}>
//     <MuiThemeProvider theme={theme}>
//       <HashRouter>
//         <Switch>
//           <Route path="/" component={Home} />
//         </Switch>
//       </HashRouter>
//     </MuiThemeProvider>
//   </Provider>,
//   document.getElementById('react-container'),
// );
