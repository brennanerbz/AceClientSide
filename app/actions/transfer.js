export const TRANSFER_STATE = 'TRANSFER_STATE';
export const TRANSFER_STATE_SUCCESS = 'TRANSFER_STATE_SUCCESS';
export const TRANSFER_STATE_FAILURE = 'TRANSFER_STATE_FAILURE';
export function transfer() {
	return (dispatch, getState) => {
		dispatch({ type: TRANSFER_STATE })
		try {
			let setView = getState().setView,
				set = setView.set,
				assignment = setView.assignment,
				items = setView.items,
				associations = setView.associations
			dispatch({ type: TRANSFER_STATE_SUCCESS, set, assignment, items, associations})
		} catch(err) {
			dispatch({
				type: TRANSFER_STATE_FAILURE,
				error: Error(err)
			})
		}
	}
}

export const CLEAR_TRANSFER_STATE = 'CLEAR_TRANSFER_STATE';
export function clearTransferState() {
	return {
		type: CLEAR_TRANSFER_STATE
	}
}