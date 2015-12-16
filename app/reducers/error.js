import {
	SHOW_ERROR,	
	HIDE_ERROR
} from '../actions/error';

var error_state = {
	show_error: false
}

export default function error(state = error_state, action) {
	switch(action.type) {
		case SHOW_ERROR:
			return {
				...state,
				show_error: true
			}
		case HIDE_ERROR:
			return {
				...state,
				show_error: false
			}
		default: 
			return state;
	}
}