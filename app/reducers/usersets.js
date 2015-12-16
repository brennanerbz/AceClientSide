import assign from 'lodash/object/assign';

import {
	REQUEST_ASSIGNMENTS,
	RECEIVE_ASSIGNMENTS_SUCCESS,
	RECEIVE_ASSINGMENTS_FAILURE
} from '../actions/usersets';

let init_state = {
	isFetchingAssignments: false,
	assignmentsFlag: false,
	assignments: [],
	sets: []
};

export default function sets(state = init_state, action) {
	switch(action.type) {
		case REQUEST_ASSIGNMENTS:
			return {
				...state,
				isFetchingAssignments: true,
				assignmentsFlag: true
			}
		case RECEIVE_ASSIGNMENTS_SUCCESS:
			const sets_list = [];
			action.assignments.forEach(assignment => { sets_list.push(assignment.set) })
			return {
				...state,
				isFetchingAssignments: false,
				assignmentsFlag: false,
				sets: sets_list,
				assignments: action.assignments
			}
		case RECEIVE_ASSINGMENTS_FAILURE:
		default:
			return state;
	}
}






















