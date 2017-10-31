import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import ajax from './ajaxStatusReducer';

const rootReducer = combineReducers({
	form: formReducer,
	ajax
});

export default rootReducer;
