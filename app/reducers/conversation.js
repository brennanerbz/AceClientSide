import moment from 'moment';
import {
	REQUEST_LEARN,
	RECEIVE_LEARN_SUCCESS,
	RECEIVE_LEARN_FAILURE,

	REQUEST_SEQUENCE,
	RECEIVE_SEQUENCE_SUCCESS,
	RECEIVE_SEQUENCE_FAILURE,

	NEW_SEQUENCE_FAILURE,

	UPDATE_SEQUENCE,
	UPDATE_SEQUENCE_SUCCESS,
	UPDATE_SEQUENCE_FAILURE,

	REQUEST_SLOTS,
	RECEIVE_SLOTS_SUCCESS,
	RECEIVE_SLOTS_FAILURE,

	UPDATE_SLOT,
	UPDATE_SLOT_SUCCESS,
	UPDATE_SLOT_FAILURE,

	TRANSFORM_5_SLOTS,
	COMPLETED_5_SLOTS,

	REQUEST_TRIALS,
	RECEIVE_TRIALS_SUCCESS,
	RECEIVE_TRIALS_FAILURE,

	NEW_TRIAL,
	NEW_TRIAL_SUCCESS,
	NEW_TRIAL_FAILURE,

	CHANGE_FORMAT,

	NEW_HINT,
	NEW_HINT_SUCCESS,
	NEW_HINT_FAILURE,

	GRADING,

	UPDATE_TRIAL,
	UPDATE_TRIAL_SUCCESS,
	UPDATE_TRIAL_FAILURE,

	ADAPT,
	ADAPT_SUCCESS,
	ADAPT_FAILURE,

	SHOW_CORRECT,

	SHOW_COMPLETED_SEQUENCE,
	FETCH_SEQ_STATS,
	FETCH_SEQ_STATS_SUCCESS,

	SKIP_SUCCESS,
	SKIP_FAILURE,

	MOVE_SLOT,
	MOVE_SLOT_SUCCESS,
	MOVE_SLOT_FAILURE,

	CLEAR_LEARN,

	UPDATING_STATE,

	UPDATE_CURRENT_ROUND,

	COMPLETED_ROUND,
	SHOW_COMPLETE_ROUND,
	NEXT_ROUND,

	NEW_USER_MESSAGE

} from '../actions/conversation';
import _ from 'lodash';

const initial_convostate = {
	isGrading: false,
	isFetchingLearn: false,
	isFetchingSequence: false,
	isFetchingSlots: false,
	isFetchingTrials: false,
	isShowingCorrect: false,
	isShowingCompletedSequence: false,
	isFetchingSequenceStats: false,
	isUpdatingState: false,
	isShowingCompletedRound: false,

	set_name: null,
	set_id: null,

	current_sequence: {},
	sequence_length: null,
	sequence_completed: false,
	sequence_stats: null,
	sequence_id: null,
	position: null,
	start: 0,
	end: 5,

	slots: [],
	current_slot: {},
	last_slot_id: 0,
	slot_index: null,

	trials: [],
	previous_trial: {},
	user_answer: null,
	feedback: null,
	current_trial: {},
	trial: {},

	messages: [],
	messages_length: 0,
	
	rounds: [],
	current_round: {},
	current_round_index: null,
		
}


function buildMessages(trial) {
	let messages = [], msg, m = 0,
	content = false, answer = false, reply = false;
	while(m < 3) {
		if(trial.start !== null && trial.content !== null && trial.content.length > 0 && !content) {
			msg = buildMessage(trial, 'content')
			content = true;
		}
		if(trial.response_time !== null && trial.answer !== null && trial.answer.length > 0 && !answer) {
			msg = buildMessage(trial, 'answer')
			answer = true;
		} 
		if(trial.reply_displayed !== null && trial.reply !== null && trial.reply.length > 0 && !reply) {
			msg = buildMessage(trial, 'reply')
			reply = true;
		}
		messages.push(msg)
		m++
	}
	return messages;
}
function buildMessage(trial, type) {
	var message = {
		type: '',
		subtype: '',
		user: '',
		text: '',
		ts: ''
	}
	if(type == 'content') {
		message.type = trial.content_type
		message.subtype = trial.content_subtype
		message.user = 'acubot'
		message.text = trial.content
		message.ts = moment.utc(trial.start)
	}
	if(type == 'answer') {
		message.type = 'answer'
		message.user = trial.user_id || 'user'
		message.text = trial.answer
		message.ts = moment.utc(trial.response_time)
	}
	if(type == 'reply') {
		message.type = 'reply'
		message.user = 'acubot'
		message.text = trial.reply
		message.ts = moment.utc(trial.reply_displayed)
	}
	return message;
}


function flatten(arr) {
    var ret = [];
    for(var i = 0; i < arr.length; i++) {
        if(Array.isArray(arr[i])) {
            ret = ret.concat(flatten(arr[i]));
        } else {
            ret.push(arr[i]);
        }
    }
    return ret;
};

export default function conversation(state = initial_convostate, action) {
	switch(action.type) {
		case UPDATING_STATE: 
			return {
				...state,
				isUpdatingState: true
			}
		case UPDATE_CURRENT_ROUND:
			let _newslot = action.slot,
				_newslotid = _newslot.id,
			    _currminiseq = state.current_round,
			    _round_length = _currminiseq.length,
			    _updatedminiseq;
			function findIndex(){
				for(var _in = 0; _in < _round_length; _in++) {
					if(_currminiseq[_in].id === _newslotid) {
						return _in
					}
				}
			}
			let index = findIndex()	
			_currminiseq[index] = _newslot
			return {
				...state,
				slot_index: index,
				current_round: _currminiseq,
				isUpdatingState: false
			}
		case REQUEST_LEARN:
			return {
				...state,
				isFetchingLearn: true
			}
		case REQUEST_SEQUENCE:
			return {
				...state,
				isFetchingSequence: true
			}
		case REQUEST_SLOTS:
			return {
				...state,
				isFetchingSlots: true
			}
		case REQUEST_TRIALS:
			return {
				...state,
				isFetchingTrials: true
			}		
		case RECEIVE_SEQUENCE_SUCCESS:
			return {
				...state,
				isFetchingSequence: false,
				isShowingCompletedRound: false,
				isShowingCompletedSequence: action.sequence.completed,
				current_sequence: action.sequence,
				sequence_length: action.sequence.length,
				sequence_completed: action.sequence.completed,
				sequence_id: action.sequence.id,
				position: action.sequence.position,
				start: 0,
				end: action.sequence.length,
				slots: [],
				current_slot: {},
				trials: [],
				current_trial: {},
				trial: {},
				slot_index: null,
				rounds: [],
				current_round: {},
				current_round_index: null,
				user_answer: null,
				feedback: null,
				set_name: action.sequence.set.title,
				set_id: action.sequence.set_id
			}
		case RECEIVE_SLOTS_SUCCESS:
			let slots = action.slots,
				state_slots = state.slots,
				slot = slots.filter(slot => slot.order === state.position)[0],	
				slot_index = slots.indexOf(slot),
				round_index;	
			slots.forEach(slot => {
				state_slots.push(slot)
			})
			return {
				...state,
				isFetchingSlots: false,
				slots: state_slots,
				current_slot: slot,
				slot_index: slot_index,
				start: action.start,
				end: action.end,
				last_slot_id: slots.slice(-1)[0].id
			}
		case RECEIVE_TRIALS_SUCCESS: 
			let trials = action.trials,
				messages = state.messages;
			for(var m = 0; m < trials.length; m++) {
				let trial = trials[m]
				let message = buildMessages(trial)
				messages.push(message)
			}
			messages = flatten(messages)
			messages.forEach((m, i) => {
				if(m == undefined) messages.splice(i)
			})
			return {
				...state,
				isFetchingTrials: false,
				trials: action.trials,
				messages: messages,
				messages_length: messages.length
			}
		case NEW_TRIAL_SUCCESS:
			let new_trial = action._trial,
				current_trials = state.trials.concat(new_trial),
				msgs = state.messages,
				msg = buildMessage(new_trial, 'content');
			msgs.push(msg)
			return {
				...state,
				isFetchingLearn: false,
				isFetchingTrials: false,
				isShowingCorrect: false,
				isShowingCompletedRound: false,
				trials: current_trials,
				current_trial: new_trial,
				messages: msgs,
				messages_length: state.messages_length + 1
			}
		case NEW_USER_MESSAGE:
			let answer_message = buildMessage(action.response, 'answer'), 
				_msgs = state.messages;
				_msgs.push(answer_message)
			return {
				...state,
				messages: _msgs,
				messages_length: state.messages_length + 1
			}
		case UPDATE_SEQUENCE_SUCCESS:
			let _slot = state.slots
						.filter(slot => slot.order === action.sequence.position)[0];
			return {
				...state,
				current_sequence: action.sequence,
				position: action.sequence.position,
				current_slot: _slot,
				slot_index: state.slots.indexOf(_slot),
				isUpdatingState: false
			}
		case UPDATE_SLOT_SUCCESS:
			return {
				...state,
				isGrading: false,
				current_slot: action.slot,
				slots: state.slots.map(slot => {
					return slot.id === action.slot.id 
					? action.slot
					: slot
				})
			}
		case GRADING:
			return {
				...state,
				isGrading: true
			}
		case UPDATE_TRIAL_SUCCESS:
			let current_msgs = state.messages,
				reply_msg = buildMessage(action.updated_trial, 'reply')
			current_msgs.push(reply_msg)
			return {
				...state,
				trials: state.trials.map((trial) => {
					return trial.id == action.updated_trial.id
					? action.updated_trial
					: trial
				}),
				current_trial: action.updated_trial,
				messages: current_msgs
			}
		case SHOW_CORRECT:
			return {
				...state,
				isShowingCorrect: true,
				isUpdatingState: false,
				// current_trial: {}
			}
		case SHOW_COMPLETE_ROUND:
			return {
				...state,
				isShowingCorrect: false,
				isShowingCompletedRound: true,
				position: state.end + 1,
				user_answer: null,
				feedback: null
			}
		case NEXT_ROUND:
			return {
				...state,
				isShowingCompletedRound: false
			}
		case FETCH_SEQ_STATS:
			return {
				...state,
				isFetchingSequenceStats: true
			}
		case SHOW_COMPLETED_SEQUENCE: 
			return {
				...state,
				isShowingCompletedSequence: true,
				isShowingCompletedRound: false,
				isUpdatingState: false,
				isShowingCorrect: false
			}
		case FETCH_SEQ_STATS_SUCCESS:
			return {
				...state,
				sequence_stats: action.stats,
				isFetchingSequenceStats: false
			}
		case SKIP_SUCCESS:
		case MOVE_SLOT_SUCCESS:
			let next_correct;
			if(action.next_slot.completed == false) {
				next_correct = false;
			} else {
				next_correct = true;
			}
			return {
				...state,
				isShowingCorrect: next_correct,
				current_slot: action.next_slot,
				current_trial: {},
				user_answer: null,
				feedback: null
			}
		case RECEIVE_LEARN_SUCCESS:
			return {
				...state,
				isFetchingLearn: false
			}
		case CLEAR_LEARN:
			return {
				...state = initial_convostate
			}
		case RECEIVE_SEQUENCE_FAILURE:
		case RECEIVE_SLOTS_FAILURE:
		case RECEIVE_TRIALS_FAILURE:
		case NEW_SEQUENCE_FAILURE:
		case NEW_TRIAL_FAILURE:
		case NEW_HINT_FAILURE:
		case UPDATE_SEQUENCE_FAILURE:
		case UPDATE_SLOT_FAILURE:
		case UPDATE_TRIAL_FAILURE:
		case SKIP_FAILURE:
		case MOVE_SLOT_FAILURE:
		default:
			return state;
	}
}

























