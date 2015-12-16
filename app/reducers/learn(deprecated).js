import {
	REQUEST_LEARN,

	RECEIVE_SEQ_SUCCESS,
	RECEIVE_SEQ_FAILURE,
	NEW_SEQ_FAILURE,

	RECEIVE_QS_SUCCESS,
	RECEIVE_QS_FAILURE, 

	RECEIVE_TRIALS_SUCCESS,
	RECEIVE_TRIALS_FAILURE,
	RECEIVE_TRIAL_SUCCESS,
	RECEIVE_TRIAL_FAILURE,
	RECEIVE_LEARN,

	ADAPT_DIFF,
	ADAPT_ERROR,
	GIVE_FEEDBACK,

	UPDATE_SLOT,
	SHOW_CORRECT,
	SHOW_COMPLETED_SEQ,

	MOVE_SLOT,
	MOVE_ERROR,

	CLEAR_LEARN
} from '../actions/learn';

const init_learn = {
	is_fetching_learn: false,
	show_correct: false,
	show_completed_seq: false,
	show_feedback: false,
	curr_seq: {},
	queue_list: [],
	curr_pos: null,
	curr_q: {},
	trials: [],
	last_trial: {},
	trial: {
		id: null,
		user_id: null,
		set_id: null,
		item_id: null,
		queue_id: null,
		start: null,
		reaction_time: null,
		response_time: null,
		answer: null,
		target: null,
		cue: null,
		pic: null,
		accuracy: null,
		difficulty: null,
		grading: null,
		augitem_id: null,
		augcue: null,
		related: null,
		choices: null,
		none: null,
		stem: null,
		feedback: null,
		praise: null
	}
}

export default function learn(state = init_learn, action) {
	switch(action.type) {
		case REQUEST_LEARN:			
			return {
				...state,
				is_fetching_learn: true
			}
		case RECEIVE_LEARN:
			return {
				...state,
				is_fetching_learn: false
			}
		case RECEIVE_SEQ_SUCCESS:
			const cp = action.curr_seq['position']
			return {
				...state,
				show_correct: false,
				show_completed_seq: false,
				show_feedback: false,
				curr_seq: action.curr_seq,
				curr_pos: cp
			}
		case RECEIVE_QS_SUCCESS:						
			return {
				...state,
				queue_list: action.q_list,
				curr_q: action.q
			}
		case RECEIVE_TRIALS_SUCCESS:
			const lt = action.trials.slice(-1)[0]
			return { 
				...state,
				trials: action.trials,
				last_trial: lt
			}
		case RECEIVE_TRIAL_SUCCESS:	
			let feedback = action.trial.feedback		
			if (feedback !== null && feedback.length > 0) {
				var should_show_feedback = true
			}
			return {
				...state,
				trial: action.trial,
				show_feedback: should_show_feedback
			}
		case GIVE_FEEDBACK:
			const new_fb = action.updated_trial['feedback'];
			const new_praise = action.updated_trial['praise'];
			const answer = action.updated_trial['answer'];
			return {
				...state,
				trial: Object.assign({...state.trial}, {feedback: new_fb, praise: new_praise, answer: answer }),
				show_feedback: true
			}
		case ADAPT_DIFF:
			const old_fb = state.trial['feedback'];
			const old_praise = state.trial['praise'];
			return {
				...state,
				trial: Object.assign({...action.trial}, {feedback: old_fb, praise: old_praise})
			}
		case MOVE_SLOT:
			const new_pos = action.new_pos
			const new_q = state.queue_list.filter(q => q['order'] === new_pos)[0]
			console.log(new_q)
			return {
				...state,
				show_correct: false,
				show_feedback: false,
				curr_seq: Object.assign({...state.curr_seq}, {position: action.new_pos}),
				curr_pos: action.new_pos,
				curr_q: new_q
			}
		case CLEAR_LEARN: 
			return {
				...state = init_learn				
			}
		case SHOW_CORRECT:
			return {
				...state,
				show_correct: true				
			}
		case UPDATE_SLOT:
			return {
				...state,
				queue_list: state.queue_list.map(q => {
					return q.id == action.data.id ? Object.assign({...state.curr_q}, { completion: action.data.completion }) : q
				}),
				curr_q: Object.assign({...state.curr_q}, {completion: action.data.completion})
			}
		case SHOW_COMPLETED_SEQ: 
			return {
				...state,
				show_correct: false,
				show_completed_seq: true
			}
		case NEW_SEQ_FAILURE:
		case MOVE_ERROR:
		case RECEIVE_SEQ_FAILURE:
		case RECEIVE_QS_FAILURE:
		case RECEIVE_TRIALS_FAILURE:
		case RECEIVE_TRIAL_FAILURE:
		case ADAPT_ERROR:
		default:
			return state;
	}
}






































