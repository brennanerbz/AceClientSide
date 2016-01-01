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
export function importText(text, pushState) {
	return(dispatch, getState) => {
		dispatch({type: IMPORT_TEXT})
		let set;
		request
		.post(`${api_url}/import`)
		.send(text)
		.end((err, res) => {
			if(res.ok) {
				set = res.body;
				dispatch({type: IMPORT_TEXT_SUCCESS, set})
				setTimeout(() => {
					pushState(null, `/createset/${set.id}`)
				}, 500)
			} else {
				dispatch({
					type: IMPORT_TEXT_FAILURE
				})
			}
		})
	}
}