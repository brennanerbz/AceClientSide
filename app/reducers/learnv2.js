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
	NEXT_ROUND

} from '../actions/learnv2';
import _ from 'lodash';

const initial_learnstate = {
	isGrading: false,
	isFetchingLearn: false,
	isFetchingSequence: false,
	isFetchingSlots: false,
	isFetchingTrials: false,
	isFetchingTrial: false,
	isChangingDifficulty: false,
	isShowingCorrect: false,
	isShowingCompletedSequence: false,
	isShowingFeedback: false,
	isShowingHint: false,
	isUpdatingState: false,
	isShowingCompletedRound: false,

	current_sequence: {},
	sequence_length: null,
	sequence_completed: false,
	sequence_id: null,
	position: null,
	start: 0,
	end: 5,

	slots: [],
	current_slot: {},
	slot_index: null,

	trials: [],
	previous_trial: {},
	user_answer: null,
	feedback: null,
	current_trial: {},
	trial: {},

	rounds: [],
	current_round: {},
	current_round_index: null,
		
}

export default function learn(state = initial_learnstate, action) {
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
				end: 5,
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
				feedback: null
			}
		case RECEIVE_SLOTS_SUCCESS:
			let slots = action.slots,
				state_slots = state.slots,
				slot = slots.filter(slot => slot.order === state.position)[0],	
				current_round = slots,
				rounds = state.rounds,
				slot_index = current_round.indexOf(slot),
				round_index;	
			slots.forEach(slot => {
				state_slots.push(slot)
			})
			rounds.push(current_round)
			round_index = rounds.indexOf(current_round)
			return {
				...state,
				isFetchingSlots: false,
				slots: state_slots,
				current_slot: slot,
				rounds: rounds,
				current_round: current_round,
				current_round_index: action.round,
				slot_index: slot_index,
				start: action.start,
				end: action.end,
				user_answer: null,
				feedback: null
			}
		case RECEIVE_TRIALS_SUCCESS: 
			return {
				...state,
				isFetchingTrials: false,
				trials: action.trials,
			}
		case NEW_TRIAL_SUCCESS:
			const _newtrials = state.trials.concat(action._trial);
			return {
				...state,
				isFetchingLearn: false,
				isFetchingTrials: false,
				isShowingCorrect: false,
				isShowingCompletedRound: false,
				trials: _newtrials,
				current_trial: action._trial,
			}
		case UPDATE_SEQUENCE_SUCCESS:
			let _slot = state.slots.filter(slot => slot.order === action.sequence.position)[0],
				  _correctslot;
			if(action.sequence.completed) {
				_correctslot = false
			} else {
				_correctslot = _slot.completed;
			}
			return {
				...state,
				isShowingCorrect: _correctslot,
				current_sequence: action.sequence,
				position: action.sequence.position,
				current_slot: _slot,
				isUpdatingState: false,
				previous_trial: action.sequence.position !== state.position ? {} : state.previous_trial
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
			return {
				...state,
				trials: state.trials.map((trial) => {
					return trial.id == action.updated_trial.id
					? action.updated_trial
					: trial
				}),
				current_trial: action.updated_trial,
				user_answer: action.updated_trial.answer,
				feedback: action.updated_trial.feedback
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
		case SHOW_COMPLETED_SEQUENCE: 
			return {
				...state,
				isShowingCompletedSequence: true,
				isShowingCompletedRound: false,
				isUpdatingState: false,
				isShowingCorrect: false
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
				...state = initial_learnstate
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

























