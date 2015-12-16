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
export function fetchLearn(user_id, set_id, assignment_id) {
	return (dispatch, getState) => {
		dispatch(clearLearn())
		dispatch({type: REQUEST_LEARN})
		try {
			dispatch(fetchSequence(user_id, set_id, assignment_id))
			dispatch(fetchSlots())
		}
		catch (err) {
			dispatch({
				type: RECEIVE_LEARN_FAILURE,
				error: Error(err)
			})
		}
	}
}

/*
@params: user_id, set_id, assignment_id, mode
@purpose: to GET the sequences for given user, set and send most recent/new to redux store
*/
export const REQUEST_SEQUENCE = 'REQUEST_SEQUENCE';
export const RECEIVE_SEQUENCE_SUCCESS = 'RECEIVE_SEQUENCE_SUCCESS';
export const RECEIVE_SEQUENCE_FAILURE = 'RECEIVE_SEQUENCE_FAILURE';
function requestSequence() {		
	return {
		type: REQUEST_SEQUENCE
	}
}
export function fetchSequence(user_id, set_id, assignment_id, mode) {
	return (dispatch, getState) => {
		dispatch(requestSequence())
		let sequences, sequence;
		axios.get(`${api_url}/sequences/?user_id=${Number(user_id)}&set_id=${Number(set_id)}`)
		.then(res => {
			sequences = res.data.sequences
			if(sequences !== undefined) {
				let sorted_sequences = sequences.sort((s1, s2) => {
					return new Date(s2.creation) - new Date(s1.creation)
				});
				sequence = sorted_sequences[0]
				if(sequence !== undefined && !sequence.completed) {
					dispatch({type: RECEIVE_SEQUENCE_SUCCESS, sequence})
				} else {
					sequence = { type: 'noprior' }
					dispatch(newSequence(sequence, user_id, set_id, assignment_id))
				}
			} else {
				sequence = { type: 'noprior' }
				dispatch(newSequence(sequence, user_id, set_id, assignment_id))
			}
		}).catch(err => {
			dispatch({
				type: RECEIVE_SEQUENCE_FAILURE,
				error: Error(err)
			}) 
		})
					
	}
}

/*
@params: user_id, set_id, assignment_id, mode, format, timing, difficulty, adapation, chances, loop, reverse_cue, difficulty_chosen_by_user
@purpose: send a POST request to create a new sequence. On the response, it will also have the necessary slots. Will be able to dispatch receive slots success.
*/
export const NEW_SEQUENCE_FAILURE = 'NEW_SEQUENCE_FAILURE';
var _default_sequence = {
	user_id: null,
	set_id: null,
	assignment_id: null,
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
export function newSequence(prevsequence, user_id, set_id, assignment_id) {
	return (dispatch, getState) => {
		dispatch({type: REQUEST_LEARN})
		let new_sequence,
			current_sequence = getState().learn.current_sequence;
		if(prevsequence == null) {
			new_sequence = Object.assign({..._default_sequence}, {
				user_id: current_sequence.user_id,
				set_id: current_sequence.set_id,
				assignment_id: current_sequence.assignment_id !== undefined ? current_sequence.assignment_id : null
			})
		} else {
			if(prevsequence.type == 'noprior') {
				new_sequence = Object.assign({..._default_sequence}, {
					user_id: user_id,
					set_id: set_id,
					assignment_id: assignment_id !== undefined ? assignment_id : null
				})
			} else if(prevsequence.type == 'completed') {
				new_sequence = Object.assign({..._default_sequence}, {
					user_id: prevsequence.user_id,
					set_id: prevsequence.set_id,
					assignment_id: prevsequence.assignment_id !== undefined ? prevsequence.assignment_id : null
				})
			} 
		}
		var sequence_id, sequence;
		request
		.post(`${api_url}/sequences/no-slots/`)
		.send(new_sequence)
		.end(function (err, res) {
			if(res.ok) {
				sequence = res.body;
				sequence_id = res.body.id	
				dispatch({type: RECEIVE_SEQUENCE_SUCCESS, sequence})
				request
				.post(`${api_url}/sequences/${sequence_id}/slots/`)
				.timeout(150)
				.end(function(err, res) {
					if(res.ok) dispatch({type: CREATE_SLOTS_SUCCESS})
					else console.log('timedout')
				})
				setTimeout(() => {
					dispatch(fetchSlots())
				}, 50)
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
				} 
			}).then(() => {
				if(!getState().learn.current_sequence.completed) {
					let slot = getState().learn.current_slot
					dispatch(fetchTrials())
					dispatch({ type: UPDATE_CURRENT_ROUND, slot })
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
			seq_id = getState().learn.current_sequence.id;
			if(seq_id == undefined) {
				setTimeout(() => {
					dispatch(fetchSlots())
				}, 150)
				return;
			}
		} else {
			seq_id = sequence_id
		}
		let pos = getState().learn.position,
			current_round = getState().learn.current_round,
			length = getState().learn.sequence_length;

		start = Math.round(Math.floor((pos - 1)/5)) * 5,
		end = start + 5;

		round = start !== 0 ? Math.round((length/5) / (length/end)) : 1

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
	   			dispatch({type: RECEIVE_SLOTS_SUCCESS, slots, start, end, round})
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
				if(getState().learn.slots.filter(slot => !slot.completed).length === 0) {
					return;
				}
				let slot = getState().learn.current_slot
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
		let slot = getState().learn.current_slot,
			slot_id,
			trial = {},
			trials;
		/* Poll for the trials */
		if(Object.keys(slot).length == 0) {
			setTimeout(() => {
				dispatch(fetchTrials())
			}, 25)
			return;
		}
		slot_id = slot.id;
		axios.get(`${api_url}/slots/${slot_id}/trials/`)
		.then(res => { 
			trials = res.data.trials
			if(trials !== undefined && trials.length > 0) {
				dispatch({type: RECEIVE_TRIALS_SUCCESS, trials})
				trial = trials.slice(-1)[0]
				if(trial.correct && slot.completed) {
					dispatch({type: SHOW_CORRECT})
					dispatch({type: RECEIVE_LEARN_SUCCESS})
				} else {
					dispatch(newTrial())						
					return;
				}
			}
			if(!slot.completed) {
				dispatch(newTrial())
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

/*
@params: slot_id * required
@purpose: send a POST request to create a new trial.
*/
export const NEW_TRIAL = 'NEW_TRIAL';
export const NEW_TRIAL_SUCCESS = 'NEW_TRIAL_SUCCESS';
export const NEW_TRIAL_FAILURE = 'NEW_TRIAL_FAILURE';
// recall | pic | related | aug | nonemc | mc | stem | peek | copy
export function newTrial(trial) {
	return (dispatch, getState) => {
		dispatch({type: NEW_TRIAL})
		let new_trial = {},
			state = getState().learn,
			current_slot = state.current_slot,
			last_trial = state.trials.slice(-1)[0],
			s = new Date(),
		  	start = s.toISOString().replace("T", " ").replace("Z", "");
		if(current_slot.completed) {
			dispatch({type: SHOW_CORRECT})
			dispatch({type: RECEIVE_LEARN_SUCCESS})
			return;
		}
		new_trial['slot_id'] = current_slot.id
		new_trial['start'] = start;
		/* Adjust trial object based on direct user control */
		if(trial !== undefined) {
			new_trial['help_chosen_by_user'] = true;
			new_trial['format'] = trial.type
		}
		/* Remove the trial type classifier */
		for(var _prop in new_trial) {
			if (_prop == 'type') {
				delete new_trial[_prop]
			}
		}
		console.log(new_trial)
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
export function updateTrial(response) {  
	return (dispatch, getState) => {
		dispatch({type: GRADING})
		let state = getState().learn,
			current_trial = state.current_trial,
			current_slot = state.current_slot,
			trial_id = current_trial.id;
		console.log(response)
		axios.put(`${api_url}/trials/${trial_id}`, 
			response
		).then(res => {
			let updated_trial = res.data;
			dispatch({type: UPDATE_TRIAL_SUCCESS, updated_trial})
			/* TODO: Make the best decision on what to show based on accuracy, grading codes and .correct */
			if(updated_trial.correct) {
				current_slot['completed'] = true;
				dispatch(updateSlot(current_slot))
				dispatch({type: SHOW_CORRECT})
				return;
			} 
			dispatch(newTrial())
		})
		.catch(() => {
			dispatch({
				type: UPDATE_TRIAL_FAILURE,
				error: Error(err),
				typeerror: err
			})
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
		let current_trial = getState().learn.current_trial,
			id = current_trial.id,
			current_slot = getState().learn.current_slot;
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
			let state = getState().learn,
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
			let state = getState().learn,
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
			dispatch({type: MOVE_SLOT_SUCCESS, next_slot})
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
			let current_sequence = getState().learn.current_sequence,
				pos = getState().learn.position,
				length = getState().learn.sequence_length;
			if(pos >= length) return;
			dispatch(fetchSlots(current_sequence.id, true))
		}, 50)
	}
}
export function nextRound() {
	return (dispatch, getState) => {
		let isFetchingSlots = getState().learn.isFetchingSlots;
		if(isFetchingSlots) {
			setTimeout(() => {
				dispatch(nextRound())
			}, 50)
		}
		dispatch({type: NEXT_ROUND})
		let	new_position = getState().learn.position,
			current_sequence = getState().learn.current_sequence,
			sequence;
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



