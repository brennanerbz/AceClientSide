import {
	TRANSFER_STATE,
	TRANSFER_STATE_SUCCESS,
	TRANSFER_STATE_FAILURE,
	CLEAR_TRANSFER_STATE
} from '../actions/transfer';


var transferstate = { 
	set: null,
	assignment: null,
	items: null,
	associations: null
}

export default function transfer (state = transferstate, action) {
	switch(action.type) {
		case TRANSFER_STATE:
			return {
				...state
			}
		case TRANSFER_STATE_SUCCESS:
			return {
				...state,
				set: action.set,
				assignment: action.assignment,
				items: action.items,
				associations: action.associations
			}
		case CLEAR_TRANSFER_STATE:
			return {
				...state = transferstate
			}
		case TRANSFER_STATE_FAILURE:	
		default: 
			return state
	}
}