import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

import rootReducer from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
	? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
	: compose;

const configureStore = initialState =>
	createStore(
		rootReducer,
		initialState,
		composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
	);

export default configureStore;
