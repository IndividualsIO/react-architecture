import { BEGIN_AJAX_CALL, AJAX_CALL_FAILURE } from './types';

export function beginAjaxCall() {
	return { type: BEGIN_AJAX_CALL };
}

export function ajaxFailure() {
	return { type: AJAX_CALL_FAILURE };
}
