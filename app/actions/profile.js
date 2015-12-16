import axios from 'axios';
import moment from 'moment';
import keyMirror from 'key-mirror';

const server = require('./api'),
	  api_url = server.api_url;

export const REQUEST_PROFILE_FAILURE = 'REQUEST_PROFILE_FAILURE';
export function fetchProfilePage(user_id) {
	return async(dispatch, getState) => {
		try {
			await axios.all([dispatch(fetchProfile(user_id)), dispatch(fetchUserAssignments(user_id))])
				  .then(axios.spread((user, assignments) => {
				  	dispatch({type: RECEIVE_PROFILE_SUCCESS, user})
				  	dispatch({type: RECEIVE_USER_ASSIGNMENTS_SUCCESS, assignments, user})
				  }))
		} catch(err) {
			dispatch({
				type: REQUEST_PROFILE_FAILURE,
				error: Error(err)
			})
		}
	}
}

/* 
@params user_id
*/
export const REQUEST_PROFILE = 'REQUEST_PROFILE';
export const RECEIVE_PROFILE_SUCCESS = 'RECEIVE_PROFILE_SUCCESS';
export const RECEIVE_PROFILE_FAILURE = 'RECEIVE_PROFILE_FAILURE';
export function fetchProfile(user_id) {
	return async(dispatch, getState) => {
		dispatch({type: REQUEST_PROFILE})
		try {
			let user;
			await axios.get(`${api_url}/users/${user_id}`).then((res) => user = res.data)
			return user;
		} catch(err) {
			dispatch({
				type: RECEIVE_PROFILE_FAILURE,
				error: Error(err)
			})
		}
	}
}


/*
@params user_id
*/
export const REQUEST_USER_ASSIGNMENTS = 'REQUEST_USER_ASSIGNMENTS';
export const RECEIVE_USER_ASSIGNMENTS_SUCCESS = 'RECEIVE_USER_ASSIGNMENTS_SUCCESS';
export const RECEIVE_USER_ASSIGNMENTS_FAILURE = 'RECEIVE_USER_ASSIGNMENTS_FAILURE';
export function fetchUserAssignments(user_id) {
	return async(dispatch, getState) => {
		dispatch({type: REQUEST_USER_ASSIGNMENTS})
		try {
			let assignments;
			// TODO: ADD LOGGED-IN USER OBJECT STATE
			// if(user_id === getState().user.id) {
			// 	assignments = getState().user.assignments
			// 	return assignments;
			// }
			await axios.get(`${api_url}/users/${user_id}/assignments/`).then((res) => assignments = res.data.assignments)
			return assignments
		} catch(err) {
			dispatch({
				type: RECEIVE_USER_ASSIGNMENTS_FAILURE,
				error: Error(err)
			})
		}
	}
}



export const CLEAR_PROFILE = 'CLEAR_PROFILE';
export function clearProfile() {
	return {
		type: CLEAR_PROFILE
	}
}



