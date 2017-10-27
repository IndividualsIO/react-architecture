import { BEGIN_AJAX_CALL, AJAX_CALL_FAILURE } from './types';

export function beginAjaxCall() {
	return { type: BEGIN_AJAX_CALL };
}

export function ajaxFailure(error) {
	return { type: AJAX_CALL_FAILURE, error };
}
