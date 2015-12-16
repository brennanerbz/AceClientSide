import axios from 'axios';
import moment from 'moment';
import keyMirror from 'key-mirror';
import request from 'superagent';

const server = require('./api'),
	  api_url = server.api_url;

/* Assignments for given user */ 
export const REQUEST_ASSIGNMENTS = 'REQUEST_ASSIGNMENTS';
export const RECEIVE_ASSIGNMENTS_SUCCESS = 'RECEIVE_ASSIGNMENTS_SUCCESS';
export const RECEIVE_ASSINGMENTS_FAILURE = 'RECEIVE_ASSINGMENTS_FAILURE';

export function fetchAssignments(user_id) {
	return async(dispatch, getState) => {
		if(getState().sets.assignmentsFlag) return;
		let id;
		if(user_id == undefined) {
			id = getState().user.user.id
		} else {
			id = user_id
		}
		dispatch({type: REQUEST_ASSIGNMENTS});
		try {
			let assignments;
			request
			.get(`${api_url}/users/${id}/assignments/`)
			.end((err, res) => { 
				assignments = res.body.assignments 
				dispatch({type: RECEIVE_ASSIGNMENTS_SUCCESS, assignments })
			})
		} catch (err) {
			dispatch({
				type: RECEIVE_ASSINGMENTS_FAILURE,
				error: Error('Can\'t fetch sets')
			})
		}
	}
}

export function pollAssignments(user_id) {
	return (dispatch, getState) => {
		let assignments;
		request
		.get(`${api_url}/users/${user_id}/assignments/`)
		.end((err, res) => {
			if(res.ok) {
				assignments = res.body.assignments 
				dispatch({type: RECEIVE_ASSIGNMENTS_SUCCESS, assignments })
			} else {
				dispatch({type: RECEIVE_ASSINGMENTS_FAILURE})
			}
		})
	}
}

