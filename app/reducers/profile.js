import {
	REQUEST_PROFILE,
	RECEIVE_PROFILE_SUCCESS,
	RECEIVE_PROFILE_FAILURE,
	REQUEST_USER_ASSIGNMENTS,
	RECEIVE_USER_ASSIGNMENTS_SUCCESS,
	RECEIVE_USER_ASSIGNMENTS_FAILURE,
	CLEAR_PROFILE
} from '../actions/profile';

const initial_profilestate = {
	isFetchingProfile: false,
	user: {},
	id: '',
	username: '',
	full_name: '',
	profile_pic: '',
	school: '',
	assignments: [],
	studied_sets: [],
	created_sets: [],
	studiedset_count: 0,
	createdset_count: 0,
	createditems_count: 0
}

export default function profile(state = initial_profilestate, action) {
	switch(action.type) {
		case REQUEST_PROFILE:
			return {
				...state,
				isFetchingProfile: true
			}
		case RECEIVE_PROFILE_SUCCESS:
			let user = action.user;
			return {
				...state,
				user: user,
				id: user.id,
				username: user.username,
				full_name: user.first_name + " " + user.last_name,
				user_pic: user.profile_picture,
				school: user.school !== null ? user.school : null
				// TODO: when stat routes are up, use them
			}
		case RECEIVE_USER_ASSIGNMENTS_SUCCESS:
			let studied = [],
				s_count = 0,
				created = [],
				c_count = 0,
				_user = action.user,
				assignments = action.assignments.filter(a => a.set.finalized !== null);
			for(var i = 0; i < assignments.length; i++) {
				let assignment = assignments[i]
				if(assignment.studied !== null) {
					studied.push(assignment)
					s_count++
				}
				if(assignment.set.creator_id === _user.id) {
					created.push(assignment)
					c_count++
				}
			}
			return {
				...state,
				isFetchingProfile: false,
				assignments: assignments,
				studied_sets: studied,
				studiedset_count: s_count,
				created_sets: created,
				createdset_count: c_count
			}
		case CLEAR_PROFILE:
			return {
				...state = initial_profilestate
			}
		case RECEIVE_PROFILE_FAILURE:
		case RECEIVE_USER_ASSIGNMENTS_FAILURE:
		default:
			return state;
	}
}