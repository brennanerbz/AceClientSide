export const SHOW_ERROR = 'SHOW_ERROR';
export function showError() {
	return {
		type: SHOW_ERROR
	}
}

export const HIDE_ERROR = 'HIDE_ERROR';
export function hideError() {
	return {
		type: HIDE_ERROR
	}
}