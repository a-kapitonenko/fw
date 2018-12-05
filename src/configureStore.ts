import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware  from 'redux-saga';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { rootReducer, rootSaga } from './store';

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();
const history = createHistory();
const enhancers = [];
const middleware = [logger, sagaMiddleware, thunk, routerMiddleware(history)];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore(rootReducer, composedEnhancers);

sagaMiddleware.run(rootSaga);

export default store;
