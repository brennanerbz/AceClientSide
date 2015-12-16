import axios from 'axios';
import moment from 'moment'; 
import request from 'superagent';

const server = require('./api'),
	  api_url = server.api_url;

export const SEARCH = 'SEARCH';
export function requestSearch() {
	return {
		type: SEARCH
	}
}
export const CLEAR_PAGES = 'CLEAR_PAGES';
export function clearPages() {
	return {
		type: CLEAR_PAGES
	}
}

/* ----------- Superagent pattern -----------------

request
  .post('/api/pet')
  .send({ name: 'Manny', species: 'cat' })
  .set('X-API-Key', 'foobar')
  .set('Accept', 'application/json')
  .end(function(err, res){
    // Calling the end function will send the request
  });

*/
 // /items/search/?search=knowledge&start=0&end=10

export const REQUEST_ITEMS = 'REQUEST_ITEMS';
export const RECEIVE_ITEMS_SUCCESS = 'RECEIVE_ITEMS_SUCCESS';
export const RECEIVE_ITEMS_FAILURE = 'RECEIVE_ITEMS_FAILURE';
export function searchItems(term, page_index) {
	return (dispatch, getState) => {
		if(getState().search.searchFlag) return;
		dispatch({ type: SEARCH })
		try {
			let items,
				count,
				query = term.toLowerCase().trim(),
				index;
			if(page_index !== undefined) {
				index = page_index
			} else {
				index = 0;
			}
			request
			.get(`${api_url}/items/search/?search=${term}&start=${index}`)
			.end((err, res) => { 
				console.log(res.body)
				count= res.body.total_items_count
				items = res.body.items 
				dispatch({type: RECEIVE_ITEMS_SUCCESS, items, count, query, index})
			})
		} catch(err) {
			dispatch({
				type: RECEIVE_ITEMS_FAILURE,
				error: Error(err)
			})
		}
	}
}

 // /sets/search/?search=knowledge&start=0&end=10
export const REQUEST_SETS = 'REQUEST_SETS';
export const RECEIVE_SETS_SUCCESS = 'RECEIVE_SETS_SUCCESS';
export const RECEIVE_SETS_FAILURE = 'RECEIVE_SETS_FAILURE';
export function searchSets(set_title, page_index) {
	return (dispatch, getState) => {
		if(getState().search.searchFlag) return;
		dispatch({ type: SEARCH })
		try {
			let sets,
				count,
				query = set_title.toLowerCase().trim(),
				index;
			if(page_index !== undefined) {
				index = page_index
			} else {
				index = 0;
			}
			request
			.get(`${api_url}/sets/search/?search=${set_title}&start=${index}`)
			.end((err, res) => { 
				sets = res.body.sets 
				count = res.body.total_sets_count
				dispatch({type: RECEIVE_SETS_SUCCESS, sets, count, query, index})
			})
		} catch(err) {
			dispatch({
				type: RECEIVE_SETS_FAILURE,
				error: Error(err)
			})
		}
	}
}

 // /users/search/?search=knowledge&start=0&end=10
export const REQUEST_USERS = 'REQUEST_USERS';
export const RECEIVE_USERS_SUCCESS = 'RECEIVE_USERS_SUCCESS';
export const RECEIVE_USERS_FAILURE = 'RECEIVE_USERS_FAILURE';
export function searchUsers(user, page_index) {
	return (dispatch, getState) => {
		if(getState().search.searchFlag) return;
		dispatch({ type: SEARCH })
		try {
			let users,
				count,
				query = user.toLowerCase().trim(),
				index;
			if(page_index !== undefined) {
				index = page_index
			} else {
				index = 0;
			}
			request
			.get(`${api_url}/users/search/?search=${user}&start=${index}`)
			.end((err, res) => {
				console.log(res.body)
				count = res.body.total_users_count
				users = res.body.users
				dispatch({type: RECEIVE_USERS_SUCCESS, users, count, query, index})
			})
		} catch(err) {
			dispatch({
				type: RECEIVE_USERS_FAILURE,
				error: Error(err)
			})
		}
	}
}


export const CLEAR = 'CLEAR';
export function clearSearch() {
	return {
		type: CLEAR
	}
}