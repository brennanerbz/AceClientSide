import axios from 'axios';
import request from 'superagent';
var _Promise = require('promise');
var agent = require('superagent-promise')(require('superagent'), _Promise);
import moment from 'moment';
import keyMirror from 'key-mirror';

const server = require('./api'),
	  api_url = server.api_url;


export function checkCookies() {
	let user = {},
		cks = [],
		fid_index,
		token_index,
		ck;
	if(document.cookie.length > 0) {
		if(document.cookie.slice(0, 5) == 'email') return;
		let cookies = document.cookie.split(";")
		for(var c = 0; c < cookies.length; c++) {
			ck = cookies[c]
			if(ck.indexOf('__fid') !== -1) {
				fid_index = c
			}
			if(ck.indexOf('__ftkn') !== -1) {
				token_index = c
			}
		}
		if(fid_index !== undefined && fid_index !== -1 && token_index !== undefined && token_index !== -1) {
			user['id'] = cookies[fid_index].substr(6).replace('=', '')
			user['token'] = cookies[token_index].substr(8)
		} 
		return user;
	}
}


export const FETCH_TOKEN = 'FETCH_TOKEN'
export const FETCH_TOKEN_FAILURE = 'FETCH_TOKEN_FAILURE'
export const FETCH_TOKEN_SUCCESS = 'FETCH_TOKEN_SUCCESS'
export function getToken(email, password, pushState, logInPage) {
	return(dispatch, getState) => {
		if(getState().user.isFetchingToken) return;
		dispatch({type: FETCH_TOKEN})
		var token;
		request
		.get(`${api_url}/token`)
		.auth(email, password)
		.end((err, res) => {
			let emailError = false, passwordError = false;
			if(err) {
				document.cookie = "__fid=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
				document.cookie = "__ftkn=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
				if(!logInPage) {
					emailError = true;
					pushState(null, '/login')
				} else {
					emailError = true
					passwordError = true
				}
				dispatch({type: FETCH_TOKEN_FAILURE, emailError, passwordError})
			} else {
				token = res.body.token
				dispatch({type: FETCH_TOKEN_SUCCESS, token})
				dispatch(logIn(token, pushState))
			}
		})
	}
}

export function checkLoggedIn() {
	let user = checkCookies()
	if(user == undefined || Object.keys(user).length == 0) {
		noUserFound()
		return { 
			type: 'LOGIN_USER_FAILURE',
			user: null,
			logged_in: false 
		};
	}
	else {
		return { 
			type: 'LOGIN_USER_SUCCESS',
			user: user,
			logged_in: true 
		};
	}
}

export function noUserFound() {
	return ({
		type: RECEIVE_USER_FAILURE
	})
}

export const REQUEST_USER = 'REQUEST_USER'
export const RECEIVE_USER_SUCCESS = 'RECEIVE_USER_SUCCESS'
export const RECEIVE_USER_FAILURE = 'RECEIVE_USER_FAILURE'

export const REQUEST_ASSIGNMENTS = 'REQUEST_ASSIGNMENTS';
export const RECEIVE_ASSIGNMENTS_SUCCESS = 'RECEIVE_ASSIGNMENTS_SUCCESS';

export function fetchUser() {
	return (dispatch, getState) => {
		dispatch({type: REQUEST_USER})
		let user = checkCookies()
		if(user == undefined || Object.keys(user).length == 0) {
			dispatch({type: RECEIVE_USER_FAILURE})
			return;
		}
		request
		.get(`${api_url}/users/${user.id}`)
		.end((err, res) => {
			if(res.ok) {
				user = {}
				user = Object.assign({...res.body})
				delete user['password']
				dispatch({type: RECEIVE_USER_SUCCESS, user})
				dispatch({type: REQUEST_ASSIGNMENTS })
				request
				.get(`${api_url}/users/${user.id}/assignments/`) 
				.end((err, res) => {
					if(res.ok) {
						let assignments = res.body.assignments;
						dispatch({type: RECEIVE_ASSIGNMENTS_SUCCESS, assignments })
					}
				})
				return true
			}
			else {
				dispatch({
					type: RECEIVE_USER_FAILURE,
					error: Error(err)
				})
				return false;
			}
		})
	}
}


export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE'
export function updateUser(udpatedUser) {
	return (dispatch, getState) => {
		dispatch({type: REQUEST_USER})
		request
		.put(`${api_url}/users/${updatedUser.id}`)
		.send(udpatedUser)
		.end((err, res) => {
			if(res.ok) {
				user = {}
				user = Object.assign({...res.body})
				delete user['password']
				dispatch({type: RECEIVE_USER_SUCCESS, user})
				dispatch({type: REQUEST_ASSIGNMENTS })
				request
				.get(`${api_url}/users/${user.id}/assignments/`) 
				.end((err, res) => {
					if(res.ok) {
						let assignments = res.body.assignments;
						dispatch({type: RECEIVE_ASSIGNMENTS_SUCCESS, assignments })
					}
				})
				return true
			}
			else {
				dispatch({
					type: RECEIVE_USER_FAILURE,
					error: Error(err)
				})
				return false;
			}
		})
	}
}

export const UPLOAD_USER_PHOTO = 'UPLOAD_USER_PHOTO'
export const UPLOAD_USER_PHOTO_SUCCESS = 'UPLOAD_USER_PHOTO_SUCCESS'
export const UPLOAD_USER_PHOTO_FAILURE = 'UPLOAD_USER_PHOTO_FAILURE'
export function uploadUserPhoto(file) {
	return (dispatch, getState) => {
		dispatch({type: UPLOAD_USER_PHOTO})
		var req = request
		.put(`${api_url}/users/${getState().user.user.id}`)
		req.attach(file)
		.end((err, res) => {
			if(res.ok) {
				let user = res.body
				dispatch({type: UPLOAD_USER_PHOTO_SUCCESS, user})
			}
			else {
				dispatch({
					type: UPLOAD_USER_PHOTO_FAILURE,
					error: Error(err)
				})
			}
		})
	}
}


export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export function logIn(token, pushState) {
	return (dispatch, getState) => {
		dispatch({type: LOGIN_USER})
		request
		.get(`${api_url}/users/login`)
		.auth(token, '')
		.end((err, res) => {
			if(res.ok) {
				let user = Object.assign({...res.body})
				delete user['password']
				document.cookie = '__fid' + '=' + user.id + ";" 
				document.cookie = "__ftkn" + "=" + token + ";"
				dispatch({type: LOGIN_USER_SUCCESS, user}) 
				pushState(null, '/')
			}
			else {
				dispatch({
					type: LOGIN_USER_FAILURE,
					error: Error(err)
				})
			}
		})
	}
}

export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_FAILURE = 'LOGOUT_USER_FAILURE';
export function logOut(pushState) {
	return (dispatch, getState) => {
		dispatch({type: LOGOUT_USER})
		document.cookie = "__fid=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
		document.cookie = "__ftkn=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
		document.cookie = "_gat=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
		document.cookie = "_ga=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
		setTimeout(() => {
			if(document.cookie.length == 0) {
				dispatch({type: LOGOUT_USER_SUCCESS}) 
				pushState(null, '/')
			} else {
				dispatch({type: LOGOUT_USER_FAILURE}) 
			}
		}, 5)		
	}
}

export const CREATE_USER = 'CREATE_USER'
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS'
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE'
export function signUp(user_info, pushState) {
	return (dispatch, getState) => {
		dispatch({type: CREATE_USER})
		let new_user;
		for(var prop in user_info) {
			if(user_info.hasOwnProperty('email_error')) {
				delete user_info.email_error
			}
		}
		request
		.post(`${api_url}/users/`)
		.send(user_info)
		.end((err, res) => {
			if(res.ok) {
				new_user = {}
				new_user = Object.assign({...res.body}, {password: null})
				dispatch({type: CREATE_USER_SUCCESS, new_user})
				dispatch(getToken(user_info.email, user_info.password, new_user.id))
				pushState(null, '/')
			} else {
				dispatch({
					type: CREATE_USER_FAILURE,
					error: Error(err)
				})
			}
		})
	}
}

export const WAIT_LIST = 'WAIT_LIST'
export const WAIT_LIST_SUCCESS = 'WAIT_LIST_SUCCESS'
export const WAIT_LIST_FAILURE = 'WAIT_LIST_FAILURE'
export function signUpWaitList(user_info, pushState) {
	return (dispatch, getState) => {
		dispatch({type: CREATE_USER})
		let new_user;
		request
		.post(`${api_url}/users/waitlist`)
		.send(user_info)
		.end((err, res) => {
			if(res.ok) {
				dispatch({type: WAIT_LIST_SUCCESS})
			} else {
				dispatch({
					type: WAIT_LIST_FAILURE,
					error: Error(err)
				})
			}
		})
	}
}




