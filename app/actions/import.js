import axios from 'axios';
import moment from 'moment'; 
import request from 'superagent';
const server = require('./api'),
	  api_url = server.api_url;

export function uploadDoc() {
	return (dispatch, getState) => {

	}
}

export const IMPORT_TEXT = 'IMPORT_TEXT';
export const IMPORT_TEXT_SUCCESS = 'IMPORT_TEXT_SUCCESS';
export const IMPORT_TEXT_FAILURE = 'IMPORT_TEXT_FAILURE';
export function importText(text, subject, pushState) {
	return(dispatch, getState) => {
		dispatch({type: IMPORT_TEXT})
		let assignment, 
		user = getState().user.user, 
		importData = { 
			creator_id: user.id,
			text: text,
			subjects: [subject]
		};
		console.log('importData: ', importData)
		request
		.post(`${api_url}/content/from-text`)
		.send(importData)
		.end((err, res) => {
			console.log(res)
			if(res.ok) {
				assignment = res.body;
				dispatch({type: IMPORT_TEXT_SUCCESS, assignment})
				setTimeout(() => {
					pushState(null, `/createset/${assignment.set_id}`)
				}, 500)
			} else {
				dispatch({
					type: IMPORT_TEXT_FAILURE
				})
			}
		})
	}
}