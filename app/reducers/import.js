import {
	IMPORT_TEXT,
	IMPORT_TEXT_SUCCESS,
	IMPORT_TEXT_FAILURE
} from '../actions/import';

const initial_importstate = {
	isImporting: false
}

export default function importView(state = initial_importstate, action) {
	switch(action.type) {
		case IMPORT_TEXT:
			return {
				...state,
				isImporting: true
			}
		case IMPORT_TEXT_SUCCESS:
		case IMPORT_TEXT_FAILURE:
			return {
				...state,
				isImporting: false
			}
		default: 
			return state;
	}
}	