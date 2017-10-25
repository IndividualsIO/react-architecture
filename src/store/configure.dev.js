import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

import rootReducer from '../reducers';
import history from './history';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
	? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
	: compose;

const routerMiddle = routerMiddleware(history);

const configureStore = initialState =>
	createStore(
		rootReducer,
		initialState,
		composeEnhancers(
			applyMiddleware(thunk, routerMiddle, reduxImmutableStateInvariant())
		)
	);

export default configureStore;
