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
export function updateAssignent(id) {
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


export const FETCH_CASES_SUCCESS = 'FETCH_CASES_SUCCESS';
export const FETCH_CASES_FAILURE = 'FETCH_CASES_FAILURE';
export function fetchCases(assignment_id) {
	return (dispatch, getState) => {
		let cases;
		request
		.get(`${api_url}/assignments/${assignment_id}/instances`)
		.end((err, res) => {
			cases = res.body.instances
			dispatch({type: FETCH_CASES_SUCCESS, cases })
			console.log(cases)
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

 
export const CLEAR_SETVIEW = 'CLEAR_SETVIEW';
export function clearSetView() {
	return {
		type: CLEAR_SETVIEW
	}
}
