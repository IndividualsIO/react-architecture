import { combineReducers } from 'redux';
import ajax from './ajaxStatusReducer';

const rootReducer = combineReducers({
	ajax
});

export default rootReducer;
