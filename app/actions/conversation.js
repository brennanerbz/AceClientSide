import axios from 'axios';
import moment from 'moment'; 
import request from 'superagent';
const server = require('./api'),
	  api_url = server.api_url;

/*
@params: user_id, set_id, assignment_id, sequence_id
@purpose: method that runs sequences and slots concurrently
*/
export const REQUEST_LEARN = 'REQUEST_LEARN';
export const RECEIVE_LEARN_SUCCESS = 'RECEIVE_LEARN_SUCCESS';
export const RECEIVE_LEARN_FAILURE = 'RECEIVE_LEARN_FAILURE';
export function fetchLearn(set_id, starred) {
	return (dispatch, getState) => {
		dispatch(clearLearn())
		dispatch({type: REQUEST_LEARN})
		if(getState().user.isFetchingUser || getState().sets.isFetchingAssignments) {
			setTimeout(() => {
				dispatch(fetchLearn(set_id, starred))
			}, 250)
			return;
		}
		let assignments = getState().sets.assignments,
			assignment = assignments.filter(a => Number(a.set_id) == Number(set_id))[0];
		if(assignment !== undefined) {
			dispatch(fetchSequence(assignment.id, starred))
		} else {
			dispatch(createAssignment(getState().user.user.id, set_id, starred))
		}
		// dispatch(fetchSlots())
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
export const RECEIVE_ASSIGNMENT_SUCCESS = 'RECEIVE_ASSIGNMENT_SUCCESS';
export const RECEIVE_ASSIGNMENT_FAILURE = 'RECEIVE_ASSIGNMENT_FAILURE'
export function createAssignment(user_id, set_id, starred) {
	return(dispatch, getState) => {
		let assignment = Object.assign({..._assignmenttemplate}, {
			set_id: Number(set_id),
			user_id: user_id
		})
		request
		.post(`${api_url}/assignments/`)
		.send(assignment)
		.end((err, res) => {
			if(res.ok) {
				dispatch(fetchSequence(res.body.id, starred))
				dispatch({type: RECEIVE_ASSIGNMENT_SUCCESS})
			} else {
				dispatch({type: RECEIVE_ASSIGNMENT_FAILURE})
			}
		})
	}
}

/*
@params: user_id, set_id, assignment_id, mode
@purpose: to GET the sequences for given user, set and send most recent/new to redux store
*/
export const REQUEST_SEQUENCE = 'REQUEST_SEQUENCE';
export const RECEIVE_SEQUENCE_SUCCESS = 'RECEIVE_SEQUENCE_SUCCESS';
export const RECEIVE_SEQUENCE_FAILURE = 'RECEIVE_SEQUENCE_FAILURE';
export function fetchSequence(assignment_id, starred) {
	return (dispatch, getState) => {
		dispatch({type: REQUEST_SEQUENCE})
		let sequence;
		request
		.get(`${api_url}/assignments/${assignment_id}/sequences/latest?stars=${starred}`)
		.end((err, res) => {
			if(res.ok) {
				sequence = res.body
				if(Object.keys(sequence).length !== 0 && !sequence.completed) {
					dispatch({type: RECEIVE_SEQUENCE_SUCCESS, sequence})
					dispatch(fetchSlots(sequence.id))
				} else {
					dispatch(newSequence(assignment_id, starred))
				}
			} else {
				dispatch({
					type: RECEIVE_SEQUENCE_FAILURE,
					error: Error(err)
				}) 
			}
		})	
	}
}

/*
@params: user_id, set_id, assignment_id, mode, format, timing, difficulty, adapation, chances, loop, reverse_cue, difficulty_chosen_by_user
@purpose: send a POST request to create a new sequence. On the response, it will also have the necessary slots. Will be able to dispatch receive slots success.
*/
export const NEW_SEQUENCE_FAILURE = 'NEW_SEQUENCE_FAILURE';
var _default_sequence = {
	assignment_id: null,
	stars: false,
	mode: 'learn',
	format: 'recall',
	timing: 'off',
	difficulty: 'intermediate',
	adapation: true,
	chances: true,
	loop: true,
	reverse_cue: false,
	difficulty_chosen_by_user: false
}
export function newSequence(assignment_id, starred) {
	return (dispatch, getState) => {
		dispatch({type: REQUEST_LEARN})
		let new_sequence = Object.assign({..._default_sequence}, {
			assignment_id: assignment_id,
			stars: starred
		})
		var sequence_id, sequence;
		request
		.post(`${api_url}/sequences/`)
		.send(new_sequence)
		.end(function (err, res) {
			if(res.ok) {
				sequence = res.body;
				sequence_id = res.body.id	
				dispatch({type: RECEIVE_SEQUENCE_SUCCESS, sequence})
				if(!getState().conversation.isFetchingSlots) {
					dispatch(fetchSlots(sequence.id))
				}
			} else {
				dispatch({
					type: NEW_SEQUENCE_FAILURE,
					error: Error(err)
				})
			}
		})
	}
}


/*
@params: sequence_id, position, compelted, abandoned, mode, format, timing, difficulty, adapation, chances, loop, reverse_cue, difficulty_chosen_by_user
@purpose: send a PUT request to the sequence id, most often updating the position and if the sequence was completed
*/
export const UPDATE_SEQUENCE = 'UPDATE_SEQUENCE';
export const UPDATE_SEQUENCE_SUCCESS = 'UPDATE_SEQUENCE_SUCCESS';
export const UPDATE_SEQUENCE_FAILURE = 'UPDATE_SEQUENCE_FAILURE';
export function updateSequence(_sequence) {
	return async(dispatch, getState) => {
		dispatch({type: UPDATE_SEQUENCE})
		try {
			let updated_sequence;
			
			updated_sequence = _sequence;
			
			for (var _seqprop in updated_sequence) {
				if (_seqprop == 'type') {
					delete updated_sequence[_seqprop]
				}
			}
			dispatch({type: UPDATING_STATE})
			await axios.put(`${api_url}/sequences/${_sequence.id}`, 
				updated_sequence
			).then(res => {
				const sequence = res.data;
				dispatch({type: UPDATE_SEQUENCE_SUCCESS, sequence}) 
				if(sequence.completed) {
					dispatch({type: SHOW_COMPLETED_SEQUENCE})
					dispatch(fetchSequenceStats(sequence.id))
				} else {
					dispatch(newTrial())
				}
			})
		} catch(err) {
			dispatch({
				type: UPDATE_SEQUENCE_FAILURE,
				error: Error(err)
			})
		}
	}
}

export const FETCH_SEQ_STATS = 'FETCH_SEQ_STATS';
export const FETCH_SEQ_STATS_SUCCESS = 'FETCH_SEQ_STATS_SUCCESS';
export function fetchSequenceStats(id) {
	return(dispatch, getState) => {
		dispatch({type: FETCH_SEQ_STATS})
		request
		.get(`${api_url}/sequences/${id}/stats/`)
		.end((err, res) => {
			if(res.ok) {
				let stats = res.body;
				dispatch({type: FETCH_SEQ_STATS_SUCCESS, stats})
			}
		})
	}
}

/*
@params: sequence_id
@purpose: send a GET request to collect the list of slots. include checker methods to make sure all haven't been completed.
*/

export const CREATE_SLOTS = 'CREATE_SLOTS';
export const CREATE_SLOTS_SUCCESS = 'CREATE_SLOTS_SUCCESS';
export const CREATE_SLOTS_FAILURE = 'CREATE_SLOTS_FAILURE';

export const REQUEST_SLOTS = 'REQUEST_SLOTS';
export const RECEIVE_SLOTS_SUCCESS = 'RECEIVE_SLOTS_SUCCESS';
export const RECEIVE_SLOTS_FAILURE = 'RECEIVE_SLOTS_FAILURE';
export function fetchSlots(sequence_id, isPreparing) {
	return (dispatch, getState) => {
		dispatch({type: REQUEST_SLOTS})
		var slots, start, end, seq_id, round;
		if(sequence_id == undefined) {
			seq_id = getState().conversation.current_sequence.id;
			if(seq_id == undefined) {
				setTimeout(() => {
					dispatch(fetchSlots())
				}, 150)
				return;
			}
		} else {
			seq_id = sequence_id
		}

		start = getState().conversation.start,
		end = getState().conversation.end

		let body;
		request
	    .get(`${api_url}/sequences/${seq_id}/slots/?start=${start}&end=${end}`)
	    .end(function(err, res){
	   		if(res.ok) {
	   			slots = res.body.slots
	   			body = res.body;
	   			if(slots.length === 0) {
	   				setTimeout(() => {
	   					dispatch(fetchSlots(seq_id))
	   				}, 150)
	   				return;
	   			}
	   			dispatch({type: RECEIVE_SLOTS_SUCCESS, slots, start, end})
	   			if(!isPreparing) {
	   				dispatch(fetchTrials())
	   			}
	   		} else {
	   			dispatch({
	   				type: RECEIVE_SLOTS_FAILURE,
	   				error: Error(err)
	   			})
	   		}
	   });	
	}
}

/*
@params: slot_id, completed, abandoned, format, reverse_cue, click_to_answer, flagged, hide
@purpose: send a PUT request to the slot_id, most often saying that it has been completed or changing the format
*/
export const UPDATE_SLOT = 'UPDATE_SLOT'
export const UPDATE_SLOT_SUCCESS = 'UPDATE_SLOT_SUCCESS'
export const UPDATE_SLOT_FAILURE = 'UPDATE_SLOT_FAILURE'
export function updateSlot(slot) {
	return async(dispatch, getState) => {
		dispatch({type: UPDATE_SLOT})
		try {
			await axios.put(`${api_url}/slots/${slot.id}`, 
				slot
			).then(res => {
				let slot = res.data;
				dispatch({type: UPDATE_SLOT_SUCCESS, slot})
			}).then(() => {
				if(getState().conversation.slots.filter(slot => !slot.completed).length === 0) {
					return;
				}
				let slot = getState().conversation.current_slot
				dispatch({ type: UPDATE_CURRENT_ROUND, slot })
			})			
		} catch(err) {
			dispatch({
				type: UPDATE_SLOT_FAILURE,
				error: Error(err)
			})
		}
	}
}


/*
@params: slot_id
@purpose: send a GET request to collect list of trials. If last trial is complete, show. If not, create new.
*/
export const REQUEST_TRIALS = 'REQUEST_TRIALS';
export const RECEIVE_TRIALS_SUCCESS = 'RECEIVE_TRIALS_SUCCESS';
export const RECEIVE_TRIALS_FAILURE = 'RECEIVE_TRIALS_FAILURE';
export function fetchTrials() {
	return (dispatch, getState) => {
		dispatch({type: REQUEST_TRIALS})
		let slots = getState().conversation.slots,
			trial = {},
			trials = [],
			slot_id;
		/* Poll for the trials */
		if(slots.length == 0) {
			setTimeout(() => {
				dispatch(fetchTrials())
			}, 25)
			return;
		}
		for(var t = 0; t < slots.length; t++) {
			slot_id = slots[t].id,
			axios.get(`${api_url}/slots/${slot_id}/trials/`)
			.then(res => { 
				trials = res.data.trials
				if(trials !== undefined && trials.length > 0) {
					dispatch({type: RECEIVE_TRIALS_SUCCESS, trials})
					trial = trials.slice(-1)[0]
					if(trial.slot_id == getState().conversation.current_slot.id) {
						dispatch(newTrial(null, slot_id))
					}
				}
			})
			.catch(err => {
				dispatch({
					type: RECEIVE_TRIALS_FAILURE,
					error: Error(err)
				})
			})
		}
	}
}

/*
@params: slot_id * required
@purpose: send a POST request to create a new trial.
*/
export const NEW_TRIAL = 'NEW_TRIAL';
export const NEW_TRIAL_SUCCESS = 'NEW_TRIAL_SUCCESS';
export const NEW_TRIAL_FAILURE = 'NEW_TRIAL_FAILURE';
// recall | pic | related | aug | nonemc | mc | stem | peek | copy
export function newTrial(trial, slot_id) {
	return (dispatch, getState) => {
		dispatch({type: NEW_TRIAL})
		let new_trial = {},
			state = getState().conversation,
			s = new Date(),
		  	start = s.toISOString().replace("T", " ").replace("Z", "");
		new_trial['slot_id'] = slot_id || getState().current_slot.id
		new_trial['start'] = start;
		/* Adjust trial object based on direct user control */
		if(trial !== null) {
			new_trial['help_chosen_by_user'] = true;
			new_trial['format'] = trial.type
		}
		/* Remove the trial type classifier */ 
		for(var _prop in new_trial) {
			if (_prop == 'type') {
				delete new_trial[_prop]
			}
		}
		axios.post(`${api_url}/trials/`, 
			new_trial
		).then(res => {
			let _trial = res.data;
			dispatch({type: NEW_TRIAL_SUCCESS, _trial})
		})
		.catch((err) => {
			dispatch({
				type: NEW_TRIAL_FAILURE,
				errorObj: err,
				error: Error(err)
			})
		})
	}
}

/*
@params: 
@purpose: update the current trial, and either create new trial w/adapt or show correct
*/
export const UPDATE_TRIAL = 'UPDATE_TRIAL';
export const UPDATE_TRIAL_SUCCESS = 'UPDATE_TRIAL_SUCCESS';
export const UPDATE_TRIAL_FAILURE = 'UPDATE_TRIAL_FAILURE';
export const GRADING = 'GRADING';
export const NEW_USER_MESSAGE = 'NEW_USER_MESSAGE';
export function updateTrial(response) {  
	return (dispatch, getState) => {
		dispatch({type: GRADING})
		let state = getState().conversation,
			current_trial = state.current_trial,
			current_slot = state.current_slot,
			trial_id = current_trial.id;
		dispatch({type: NEW_USER_MESSAGE, response})
		request
		.put(`${api_url}/trials/${trial_id}`)
		.send(response)
		.end((err, res) => {
			if(res.ok) {
				let updated_trial = res.body;
				dispatch({type: UPDATE_TRIAL_SUCCESS, updated_trial})
				if(updated_trial.correct) {
					current_slot['completed'] = true;
					dispatch(updateSlot(current_slot))
					dispatch({type: SHOW_CORRECT})
					dispatch(nextSlot('next'))
					return;
				} 
				dispatch(newTrial(null, current_slot.id))
			} else {
				dispatch({
					type: UPDATE_TRIAL_FAILURE,
					error: Error(err),
					typeerror: err
				})
			}
		})
	}
}

/* Helper for deciding which hint to show next */
export const NEW_HINT = 'NEW_HINT';
export const NEW_HINT_SUCCESS = 'NEW_HINT_SUCCESS';
export const NEW_HINT_FAILURE = 'NEW_HINT_FAILURE';
export function hint(response) {
	return (dispatch, getState) => {
		dispatch({type: NEW_HINT})
		let current_trial = getState().conversation.current_trial,
			id = current_trial.id,
			current_slot = getState().conversation.current_slot;
		axios.put(`${api_url}/trials/${id}`, 
			response
		).then((res) => {
			let updated_trial = res.data;
			dispatch({type: UPDATE_TRIAL_SUCCESS, updated_trial})
			current_trial['type'] = 'aug';
			dispatch(newTrial(current_trial))
		})
		.catch(() => {
			dispatch({
				type: NEW_HINT_FAILURE,
				error: Error(err)
			})
		})
	}
}


/*
@params:
@purpose: dispatch to store to update view to show correct view
*/
export const SHOW_CORRECT = 'SHOW_CORRECT';

/*
@params:
@purpose: dispatch to store to update view to show completed sequence (full)
*/
export const SHOW_COMPLETED_SEQUENCE = 'SHOW_COMPLETED_SEQUENCE';

/*
@params:
@purpose: with current index, find the unfinished slots, and move to that spot[/order]
*/
export const SKIP_SUCCESS = 'SKIP_SUCCESS';
export const SKIP_FAILURE = 'SKIP_FAILURE';
function findUnfinished(index, length, slots) {
	for(var _u = index; _u < length; _u++) {
		if (!slots[_u]['completed']) {
			return _u;
		}
	}
}
function skipToUnfinished(index, slots) {
	let length = slots.length;
	if (Number(index) == Number(length)) {		
		index = findUnfinished(0, length, slots)
	} else {
		index = findUnfinished(index, length, slots)
		if(index == undefined) {
			index = findUnfinished(0, length, slots)
		}
	}
	return index;
}
export function skipSlot() {
	return (dispatch, getState) => {
		try {
			let state = getState().conversation,
				current_slot = state.current_slot,
				current_sequence = state.current_sequence,
				slots = state.current_round,
				index = state.slot_index,
				new_index = skipToUnfinished(index, slots);
			if(new_index == undefined) {
				dispatch(showCompleteRound(current_sequence.id))
				return;
			}
			let	next_slot = slots[new_index],
				new_pos = next_slot.order;	
			dispatch({type: SKIP_SUCCESS, next_slot})
			if(next_slot.completed) {
				dispatch({type: SHOW_CORRECT})
			}
			current_sequence = Object.assign({...current_sequence}, {
				position: new_pos,
				type: 'updating_position'
			})
			dispatch(updateSequence(current_sequence))
		} catch(err) { 
			dispatch({
				type: SKIP_FAILURE,
				error: Error(err)
			})
		}
	}
}


/*
@params: 
@purpose: to move to the next slot. if the next slot is equal to the last order # or 1, just return
*/
export const MOVE_SLOT = 'MOVE_SLOT'
export const MOVE_SLOT_SUCCESS = 'MOVE_SLOT_SUCCESS'
export const MOVE_SLOT_FAILURE = 'MOVE_SLOT_FAILURE'
function findNext(dir, slots, pos) {
	let length = slots.length - 1;
	if(dir == 'next') {
		if(pos == length) {
			return pos;
		}
		return pos + 1;
	}
	if (dir == 'prev') {
		if (pos == 0) {
			return pos;
		}
		return pos - 1;
	}			
}
export function nextSlot(dir) {
	return (dispatch, getState) => {
		try {
			let state = getState().conversation,
				current_slot = state.current_slot,
				current_sequence = state.current_sequence,
				slots = state.current_round,
				pos = state.slot_index,
				next_pos = findNext(dir, slots, pos),		
				next_slot = slots[next_pos],
				new_pos = next_slot.order;
			if(pos == next_pos) {
				return;
			}
			// dispatch({type: MOVE_SLOT_SUCCESS, next_slot})
			// if(next_slot.completed) {
			// 	dispatch({type: SHOW_CORRECT})
			// }
			current_sequence = Object.assign({...current_sequence}, {
				position: new_pos,
				type: 'updating_position'
			})
			dispatch(updateSequence(current_sequence))
		} catch(err) {
			dispatch({
				type: MOVE_SLOT_FAILURE,
				error: Error(err)
			})
		}
	}
}


/*
@params:
@purpose: to clear the learn state for viewing/rendering
*/
export const CLEAR_LEARN = 'CLEAR_LEARN'
export function clearLearn() {
	return {
		type: CLEAR_LEARN
	}
}

export const SHOW_COMPLETE_ROUND = 'SHOW_COMPLETE_ROUND';
export const NEXT_ROUND = 'NEXT_ROUND';
export function showCompleteRound(seq_id) {
	return (dispatch, getState) => {
		dispatch({ type: SHOW_COMPLETE_ROUND })
		setTimeout(() => {
			let current_sequence = getState().conversation.current_sequence,
				pos = getState().conversation.position,
				length = getState().conversation.sequence_length;
			if(pos >= length) return;
			dispatch(fetchSlots(current_sequence.id, true))
		}, 50)
	}
}
export function nextRound() {
	return (dispatch, getState) => {
		let isFetchingSlots = getState().conversation.isFetchingSlots;
		if(isFetchingSlots) {
			setTimeout(() => {
				dispatch(nextRound())
			}, 50)
		}
		dispatch({type: NEXT_ROUND})
		let	new_position = getState().conversation.position,
			current_sequence = getState().conversation.current_sequence,
			sequence;
		console.log('pos:', new_position)
		console.log('cur_seq:', current_sequence)
		if(new_position >= current_sequence.length) {
			sequence = Object.assign({...current_sequence}, {completed: true, type: 'completed'})
		} else {
			sequence = Object.assign({...current_sequence}, {position: new_position, type: 'updating_position'})
		}
		dispatch(updateSequence(sequence))
	}
}

export const UPDATING_STATE = 'UPDATING_STATE';
export const UPDATE_CURRENT_ROUND = 'UPDATE_CURRENT_ROUND'



