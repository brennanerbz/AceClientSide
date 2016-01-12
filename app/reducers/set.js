import _ from 'lodash';
import assign from 'lodash/object/assign';

import {
	RECEIVE_SETVIEW_SUCCESS,

	REQUEST_SET,
	RECEIVE_SET_SUCCESS,
	RECEIVE_SET_FAILURE,

	REQUEST_ASSOCIATIONS,
	RECEIVE_ASSOCIATIONS_SUCCESS,	
	RECEIVE_ASSOCIATIONS_FAILURE,

	RECEIVE_ITEMS_SUCCESS,
	RECEIVE_ITEMS_FAILURE,

	REQUEST_ITEM,
	RECEIVE_ITEM_SUCCESS,
	RECEIVE_ITEM_FAILURE,

	CREATE_ASSIGNMENT,
	CREATE_ASSIGNMENT_SUCCESS,

	REQUEST_ASSIGNMENT,
	RECEIVE_ASSIGNMENT_SUCCESS,
	RECEIVE_ASSIGNMENT_FAILURE,
	HAS_NOT_STUDIED,

	UPDATE_ASSIGNMENT_SUCCESS,
	UPDATE_ASSIGNMENT_FAILURE,

	DELETE_ASSIGNMENT,
	DELETE_ASSIGNMENT_SUCCESS,
	DELETE_ASSIGNMENT_FAILURE,

	UPDATE_SET,
	UPDATE_SET_SUCCESS,
	UPDATE_SET_FAILURE,

	FETCH_CASES,
	FETCH_CASES_SUCCESS,
	FETCH_CASES_FAILURE,
	UPDATE_CASE_SUCCESS,
	UPDATE_CASE_FAILURE,

	SELECT_STARRED_ITEMS,

	CLEAR_SETVIEW
} from '../actions/set';

const initial_setstate = {
	isFetchingInstances: false,
	isFetchingSet: false,
	isFetchingAssociations: false,
	isCreatingAssignment: false,
	set: {},
	assignment: {},
	id: null,
	title: null,
	purpose: null,
	creator_username: null,
	creator_pic: null,
	member_count: null,
	item_count: null,
	start: 0,
	end: 0,
	associations: [],
	items: [],
	isFetchingSupplemental: false,
	cases: [], // organized by association id as key
	total_starred: 0,
	starred: false,
	subjects: [],
	doc: null,
	has_studied: null,
	default_diff: 'Beginner',
	url_link: null,
	editability: null,
	searchable: null,
	user_privacy: {},
	last_slot: {} // TODO: EVENTUALLY, DISPLAY LAST_SLOT
}

export default function setView(state = initial_setstate, action) {
	switch(action.type) {
		case REQUEST_SET:
			return {
				...state,
				isFetchingSupplemental: true,
				isFetchingSet: true
			}

		case RECEIVE_SET_SUCCESS:
			let set = action.set,
				subjects = [];
			set.subjects.forEach(sub => subjects.push(sub.name))
			return {
				...state,
				set: set,
				id: set.id,
				title: set.title,
				purpose: set.description,
				doc: set.creation,
				creator_username: set.creator.username,
				creator_pic: set.creator.profile_picture,
				subjects: subjects
			}
		case UPDATE_SET_SUCCESS:
			return {
				...state,
				set: action.set,
				title: action.set.title,
				purpose: action.set.description
			}
		case REQUEST_ASSOCIATIONS:
			return {
				...state,
				isFetchingAssociations: true
			}
		case RECEIVE_ASSOCIATIONS_SUCCESS:
			let items = state.items, current_associations = state.associations;
			action.associations.forEach(a => {
				current_associations.push(a)
				items.push(a.item)
			})
			return {
				...state,
				isFetchingAssociations: false,
				associations: current_associations,
				items: items,
				item_count: items.length,
				isFetchingSet: false,
				start: action.end,
				end: state.set.associations_count
			}
		case CREATE_ASSIGNMENT:
			return {
				...state,
				isCreatingAssignment: true
			}
		case CREATE_ASSIGNMENT_SUCCESS:
			return {
				...state,
				isCreatingAssignment: false,
				assignment: action.assignment
			}
		case RECEIVE_ASSIGNMENT_SUCCESS:
			let assignment = action.assignment,
				_associations = [],
				_items = [];
			// assignment.set.associations.associations.forEach(asc => { 
			// 	_associations.push(asc) 
			// 	_items.push(asc.item)
			// })
			return {
				...state,
				assignment: assignment,
				// associations: _associations,
				// items: _items,
				// item_count: _items.length,
				// isFetchingSet: false
			}
		case HAS_NOT_STUDIED:
			return {
				...state,
				has_studied: false
			}
		case RECEIVE_SETVIEW_SUCCESS:
			return {
				...state,
				isFetchingSet: false
			}
		case FETCH_CASES:
			return {
				...state,
				isFetchingInstances: true
			}
		case FETCH_CASES_SUCCESS:
			let total_starred = 0;
			for(var c = 0; c < action.cases.length; c++) {
				if(action.cases[c].starred) total_starred++
			}
			return {
				...state,
				isFetchingInstances: false,
				cases: action.cases,
				total_starred: total_starred
			}
		case UPDATE_CASE_SUCCESS:
			return {
				...state,
				cases: state.cases.map(_case => {
					return _case.id === action.updated_case.id
						   ? action.updated_case
						   : _case
				}),
				total_starred: action.updated_case.starred ? state.total_starred + 1 : state.total_starred - 1
			}
		case CLEAR_SETVIEW:
			return {
				...state = initial_setstate,
				associations: [],
				items: [],
				cases: []
			}
		case SELECT_STARRED_ITEMS:
			return {
				...state,
				starred: action.stars
			}
		case RECEIVE_SET_FAILURE:
		case RECEIVE_ASSOCIATIONS_FAILURE:
		case RECEIVE_ASSIGNMENT_FAILURE:
		case UPDATE_ASSIGNMENT_FAILURE:
		default:
			return state;
	}
}