// import { createStore, applyMiddleware, compose } from 'redux';
// import { routerMiddleware } from 'react-router-redux';
// import { createLogger } from 'redux-logger';
// import thunk from 'redux-thunk';
// import createHistory from 'history/createBrowserHistory';

// import rootReducer from './rootReducer';

// const history = createHistory();
// const logger = createLogger();
// const enhancers: any = [];
// const middleware = [logger, thunk, routerMiddleware(history)];

// // if (process.env.NODE_ENV === 'development') {
// //   const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION;

// //   if (typeof devToolsExtension === 'function') {
// //     enhancers.push(devToolsExtension());
// //   }
// // }

// const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

// const store = createStore(rootReducer, composedEnhancers);

// export default store;
