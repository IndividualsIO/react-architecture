import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';
import history from './history';

const composeEnhancers = compose;

const routerMiddle = routerMiddleware(history);

const configureStore = initialState =>
	createStore(
		rootReducer,
		initialState,
		composeEnhancers(applyMiddleware(thunk, routerMiddle))
	);

export default configureStore;
