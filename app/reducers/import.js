
const initial_importstate = {
	isUploading: false
}

export default function upload(state = initial_importstate, action) {
	switch(action.type) {
		case 1:
			return {
				...state
			}
		default: 
			return state;
	}
}	