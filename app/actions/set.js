import axios from 'axios';
import moment from 'moment';
import keyMirror from 'key-mirror';
import request from 'superagent';

const server = require('./api'),
	  api_url = server.api_url;

/*
@params set_id 
*/
export const REQUEST_SET = 'REQUEST_SET';
export const RECEIVE_SET_SUCCESS = 'RECEIVE_SET_SUCCESS';
export const RECEIVE_SET_FAILURE = 'RECEIVE_SET_FAILURE';
export const RECEIVE_ASSIGNMENTS_SUCCESS = 'RECEIVE_ASSIGNMENTS_SUCCESS';
export function fetchSet(set_id) {
	return (dispatch, getState) => {
		if(getState().sets.isFetchingAssignments || getState().user.isFetchingUser) {
			setTimeout(() => {
				dispatch(fetchSet(set_id))
			}, 5)
			return;
		}
		dispatch({type: REQUEST_SET})
		let set,
			user = getState().user.user;
		axios.get(`${api_url}/sets/${set_id}`).then((res) => { 
			set = res.data
			dispatch({
				type: RECEIVE_SET_SUCCESS,
				set
			})
		}).catch((err) => {
			dispatch({
				type: RECEIVE_SET_FAILURE,
				error: Error(err),
				err: err
			})
		})
	}
}

var set_update_values = {
	source_id: null,
	targets_lang_id: null,
	cues_lang_id: null,
	title: null,
	description: null,
	has_images: null,
	official: null,
	visibility: null,
	editability: null,
	finalized: null
}

export const UPDATE_SET = 'UPDATE_SET';
export const UPDATE_SET_SUCCESS = 'UPDATE_SET_SUCCESS';
export const UPDATE_SET_FAILURE = 'UPDATE_SET_FAILURE';
export function updateSet(_set, ...args) {
	return (dispatch, getState) => {
		dispatch({type: UPDATE_SET})
		let set = Object.assign({}, set_update_values);
		for(var key in set) {
			if(_set[key]) {
				set[key] = _set[key]
			}
		}
		if(args !== null && args.length > 0) {
			for(var i = 0; i < args.length; i++) {
				let arg = args[i],
					name = arg.name,
					prop = arg.prop;
				if(set.hasOwnProperty(name)) {
					set[name] = prop
				}
			}
		}
		request
		.put(`${api_url}/sets/${_set.id}`)
		.send(set)
		.end((err, res) => {
			if(res.ok) {
				set = res.body
				dispatch({type: UPDATE_SET_SUCCESS, set})	
			} else {
				dispatch({
					type: UPDATE_SET_FAILURE,
					error: Error(err)
				})
			}
		})
	}
}

/*
@params set_id
GET /sets/<id>/associations/?start=0&end=99
*/
export const REQUEST_ASSOCIATIONS = 'REQUEST_ASSOCIATIONS';
export const RECEIVE_ASSOCIATIONS_SUCCESS = 'RECEIVE_ASSOCIATIONS_SUCCESS';
export const RECEIVE_ASSOCIATIONS_FAILURE = 'RECEIVE_ASSOCIATIONS_FAILURE';
export function fetchAssociations(set_id) {
	return (dispatch, getState) => {
		dispatch({type: REQUEST_ASSOCIATIONS})
		if(getState().sets.isFetchingAssignments || getState().user.isFetchingUser) {
			setTimeout(() => {
				dispatch(fetchAssociations(set_id))
			}, 5)
			return;
		}
		let associations;
		axios.get(`${api_url}/sets/${set_id}/associations/?start=${0}&end=${99}`)
		.then((res) => {
			associations = res.data.associations
			dispatch({
				type: RECEIVE_ASSOCIATIONS_SUCCESS,
				associations
			})
		}).catch(err => {
			dispatch({
				type: RECEIVE_ASSOCIATIONS_FAILURE,
				error: Error(err),
				err: err
			})
		})
	}
}


/*
@params assignment_id
*/
export const REQUEST_ASSIGNMENT = 'REQUEST_ASSIGNMENT';
export const RECEIVE_ASSIGNMENT_SUCCESS = 'RECEIVE_ASSIGNMENT_SUCCESS';
export const RECEIVE_ASSIGNMENT_FAILURE = 'RECEIVE_ASSIGNMENT_FAILURE';
export const HAS_NOT_STUDIED = 'HAS_NOT_STUDIED';
export function fetchAssignment(set_id) {
	return (dispatch, getState) => {
		dispatch({type: REQUEST_ASSIGNMENT})
		if(getState().sets.isFetchingAssignments || getState().user.isFetchingUser) {
			setTimeout(() => {
				dispatch(fetchAssignment(set_id))
			}, 5)
			return;
		}
		let assignment = getState().sets.assignments
			.filter(assignment => Number(assignment.set_id) === Number(set_id))
			[0],
			assignment_id;
		if(assignment !== undefined) {
			assignment_id = assignment.id
			dispatch(fetchCases(assignment_id))
			request
			.get(`${api_url}/assignments/${assignment_id}`)
			.end((err, res) => {
				if(res.ok) {
					assignment = res.body
					dispatch({type: RECEIVE_ASSIGNMENT_SUCCESS, assignment})
				}
				else {
					dispatch({
						type: RECEIVE_ASSIGNMENT_FAILURE,
						error: Error(err)
					})
				}
			})
		} else {
			dispatch({type: RECEIVE_ASSOCIATIONS_FAILURE})
		}
	}
}

var _assignmenttemplate = {
	user_id: null,
	set_id: null,
	new_sequence_difficulty: 'intermediate',
	starred: false,
	deadline: null,
	wallpaper: null,
	permission: 'nonadmin',
	privacy: 'public'
}
export const CREATE_ASSIGNMENT = 'CREATE_ASSIGNMENT';
export const CREATE_ASSIGNMENT_SUCCESS = 'CREATE_ASSIGNMENT_SUCCESS';
export const CREATE_ASSIGNMENT_FAILURE = 'CREATE_ASSIGNMENT_FAILURE';
export function createAssignment(set_id, permission) { 
	return (dispatch, getState) => {
		dispatch({type: CREATE_ASSIGNMENT})
		let user_id = getState().user.user.id,
			assignment = Object.assign({..._assignmenttemplate}, {
				user_id: user_id,
				set_id: set_id,
				permission: permission || 'nonadmin'
			}) 
		request
		.post(`${api_url}/assignments/`)
		.send(assignment)
		.end((err, res) => {
			if(res.ok) {
				assignment = res.body
				dispatch({type: CREATE_ASSIGNMENT_SUCCESS, assignment})
				dispatch(fetchCases(assignment.id))
			}
			else {
				dispatch({
					type: CREATE_ASSIGNMENT_FAILURE,
					error: Error(err)
				})
			}
		})
	}
}



/*
@params user_id, set_id
*/
export const UPDATE_ASSIGNMENT_SUCCESS = 'UPDATE_ASSIGNMENT_SUCCESS';
export const UPDATE_ASSIGNMENT_FAILURE = 'UPDATE_ASSIGNMENT_FAILURE';
export function updateAssignment(id) {
	return async(dispatch, getState) => {
		try {
			await axios.put(`${api_url}/assignments${id}`).then((res) => {
				let new_assignment = res.data;
				dispatch({type: UPDATE_ASSIGNMENT_SUCCESS, new_assignment })
			})
		} catch(err) {
			dispatch({
				type: UPDATE_ASSIGNMENT_FAILURE,
				error: Error(err)
			})
		}
	}
}

export const DELETE_ASSIGNMENT = 'DELETE_ASSIGNMENT';
export const DELETE_ASSIGNMENT_SUCCESS = 'DELETE_ASSIGNMENT_SUCCESS';
export const DELETE_ASSIGNMENT_FAILURE = 'DELETE_ASSIGNMENT_FAILURE';
export function deleteAssignment(assignment_id, pushState) {
	return (dispatch, getState) => {
		dispatch({ type: DELETE_ASSIGNMENT })
		request
		.put(`${api_url}/assignments/${assignment_id}`)
		.send({deleted: true})
		.end((err, res) => {
			if(res.ok) {
				let deletedSet = res.body;
				dispatch({type: DELETE_ASSIGNMENT_SUCCESS, deletedSet})
				pushState(null, '/')
			} else {
				dispatch({
					type: DELETE_ASSIGNMENT_FAILURE,
					error: Error(err)
				})
			}
		})
	}
}


export const FETCH_CASES_SUCCESS = 'FETCH_CASES_SUCCESS';
export const FETCH_CASES_FAILURE = 'FETCH_CASES_FAILURE';
export function fetchCases(assignment_id) {
	return (dispatch, getState) => {
		let cases;
		request
		.get(`${api_url}/assignments/${assignment_id}/instances`)
		.end((err, res) => {
			if(res.ok) {
				cases = res.body.instances
				dispatch({type: FETCH_CASES_SUCCESS, cases })
			}
		})
	}
}	


var default_case = {
	starred: false,
	hidden: false,
	message: null
}
export const UPDATE_CASE_SUCCESS = 'UPDATE_CASE_SUCCESS';
export const UPDATE_CASE_FAILURE = 'UPDATE_CASE_FAILURE';
export function updateCase(_case, ...args) {
	return (dispatch, getState) => {
		let updated_case = Object.assign({}, default_case)
		if(args.length > 0) {
			for(var i = 0; i < args.length; i++) {
				if(args[i].hasOwnProperty('starred')) {
					updated_case.starred = args[i].starred
				}
			}
		}
		request
		.put(`${api_url}/instances/${_case.id}`)
		.send(updated_case)
		.end((err, res) => {
			if(res.ok) {
				updated_case = res.body
				dispatch({type: UPDATE_CASE_SUCCESS, updated_case })
			} else {
				dispatch({type: UPDATE_CASE_FAILURE})
			}
		})
	}
}

export const SELECT_STARRED_ITEMS = 'SELECT_STARRED_ITEMS';
export function selectStarredItems(stars) {
	return {
		type: SELECT_STARRED_ITEMS,
		stars
	}
}


 
export const CLEAR_SETVIEW = 'CLEAR_SETVIEW';
export function clearSetView() {
	return {
		type: CLEAR_SETVIEW
	}
}
