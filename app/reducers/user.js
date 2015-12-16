import {
	REQUEST_USER,
	RECEIVE_USER_SUCCESS,
	RECEIVE_USER_FAILURE,

	CREATE_USER_SUCCESS,
	CREATE_USER_FAILURE,

	FETCH_TOKEN,
	FETCH_TOKEN_SUCCESS,
	FETCH_TOKEN_FAILURE,

	LOGIN_USER,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAILURE,

	LOGOUT_USER,
	LOGOUT_USER_SUCCESS,
	LOGOUT_USER_FAILURE

} from '../actions/user';

var _userinitialstate = {
	isFetchingUser: false,
	isFetchingToken: false,
	token: null,
	user: {},
	logged_in: false
}
export default function user(state = _userinitialstate, action) {
	switch(action.type) {
		case FETCH_TOKEN:
			return {
				...state,
				isFetchingToken: true
			}
		case REQUEST_USER:
			return {
				...state,
				isFetchingUser: true
			}
		case FETCH_TOKEN_SUCCESS: 
			return {
				...state,
				isFetchingToken: false
			}
		case RECEIVE_USER_SUCCESS:
			return {
				...state,
				isFetchingUser: false,
				user: action.user,
				logged_in: true
			}
		case CREATE_USER_SUCCESS:
			return {
				...state,
				isFetchingUser: false,
				user: action.new_user,
				logged_in: true
			}
		case LOGIN_USER_SUCCESS:
			let user = action.user || {}
			return {
				...state,
				user: user,
				logged_in: true
			}
		case LOGOUT_USER_SUCCESS:
			return {
				...state,
				user: {},
				logged_in: false
			}
		case RECEIVE_USER_FAILURE:
			return {
				...state,
				isFetchingUser: false,
				logged_in: false
			}
		case FETCH_TOKEN_FAILURE:
			return {
				...state,
				isFetchingToken: false
			}
		case LOGOUT_USER_FAILURE:
		case CREATE_USER_FAILURE:
		default:
			return state;
	}
}