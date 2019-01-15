import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const composeEnhancers = compose;

const configureStore = initialState =>
	createStore(
		rootReducer,
		initialState,
		composeEnhancers(applyMiddleware(thunk))
	);

export default configureStore;
