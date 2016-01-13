import assign from 'lodash/object/assign';

import {
	REQUEST_ASSIGNMENTS,
	RECEIVE_ASSIGNMENTS_SUCCESS,
	RECEIVE_ASSINGMENTS_FAILURE,
} from '../actions/usersets';

import {
	CREATE_ASSIGNMENT_SUCCESS
} from '../actions/createset';

import {
	IMPORT_TEXT_SUCCESS
} from '../actions/import';

import {
	CLEAR_ALL
} from '../actions/user';

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
		case CREATE_ASSIGNMENT_SUCCESS:
			let assignments = state.assignments,
				assignment = action.assignment,
				sets = [];
			if(assignments.length === 0) {
				assignments.push(assignment)
			} else {
				let add = assignments.forEach(a => {
					if(a.id == assignment.id) return false
				})
				if(add) assignments.push(assignment)
			}
			assignments.forEach(a => {
				sets.push(a.set)
			})
			return {
				...state,
				assignments: assignments,
				sets: sets
			}
		case IMPORT_TEXT_SUCCESS:
			let a = state.assignments, s = state.sets;
			a.push(action.assignment)
			a.forEach(a => {
				s.push(a.set)
			})
			return {
				...state,
				assignments: a,
				sets: s
			}
		case CLEAR_ALL:
			return {
				...state = init_state,
				assignments: [],
				sets: []
			}
		case RECEIVE_ASSINGMENTS_FAILURE:
		default:
			return state;
	}
}






















