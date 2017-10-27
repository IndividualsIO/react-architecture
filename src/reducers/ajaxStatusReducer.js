import * as types from '../actions/actionTypes';
import initialState from './initialState';

function actionTypeEndsInSuccess(type) {
	return type.substring(type.length - 8) === '_SUCCESS';
}

export default function ajaxStatusReducer(state = initialState.ajax, action) {
	if (action.type === types.BEGIN_AJAX_CALL) {
		return {
			...state,
			inProgress: state.inProgress + 1
		};
	} else if (
		action.type === types.AJAX_CALL_FAILURE ||
		actionTypeEndsInSuccess(action.type)
	) {
		const error = action.error;
		return {
			...state,
			inProgress: state.inProgress - 1,
			error: error || {}
		};
	}

	return state;
}
