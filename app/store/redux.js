import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import { reduxReactRouter, 
		 routerStateReducer, 
		 ReduxRouter } from 'redux-router';

import createHistory from 'history/lib/createBrowserHistory';
import routes from '../routes';
import reducers from '../reducers';

import persistState from 'redux-localstorage';

let middleware = [thunk];
middleware.push(createLogger({
	collapsed: true
}))

var store = compose(	
	applyMiddleware(...middleware),
	reduxReactRouter({
		createHistory
	}),
	// persistState(['user'], {key: 'data'})
)(createStore)(reducers);
if(module.hot) {
  const nextReducer = require('../reducers');
  module.hot.accept('../reducers',
  () => { store.replaceReducer(nextReducer); });
}

export default store;