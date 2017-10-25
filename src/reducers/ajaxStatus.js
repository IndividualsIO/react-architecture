import * as types from '../actions/types';
import initialState from './initialState';

function actionTypeEndsInSuccess(type) {
	return type.substring(type.length - 8) == '_SUCCESS';
}

export default function ajaxStatusReducer(
	state = initialState.ajaxCallsInProgress,
	action
) {
	if (action.type == types.BEGIN_AJAX_CALL) {
		return state++;
	} else if (
		action.type == types.AJAX_CALL_FAILURE ||
		actionTypeEndsInSuccess(action.type)
	) {
		return state--;
	}

	return state;
}
