'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.fetchLearn = fetchLearn;
exports.fetchSequence = fetchSequence;
exports.newSequence = newSequence;
exports.updateSequence = updateSequence;
exports.fetchSlots = fetchSlots;
exports.updateSlot = updateSlot;
exports.transformSlots = transformSlots;
exports.completed5Slots = completed5Slots;
exports.fetchTrials = fetchTrials;
exports.newTrial = newTrial;
exports.newFormat = newFormat;
exports.hint = hint;
exports.updateTrial = updateTrial;
exports.adapt = adapt;
exports.skipSlot = skipSlot;
exports.nextSlot = nextSlot;
exports.clearLearn = clearLearn;
exports.showCompleteRound = showCompleteRound;
exports.nextRound = nextRound;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var api_url = 'http://127.0.0.1:5000/webapi/v2.0';

/*
@params: user_id, set_id, assignment_id, sequence_id
@purpose: method that runs sequences and slots concurrently
*/
var REQUEST_LEARN = 'REQUEST_LEARN';
exports.REQUEST_LEARN = REQUEST_LEARN;
var RECEIVE_LEARN_SUCCESS = 'RECEIVE_LEARN_SUCCESS';
exports.RECEIVE_LEARN_SUCCESS = RECEIVE_LEARN_SUCCESS;
var RECEIVE_LEARN_FAILURE = 'RECEIVE_LEARN_FAILURE';
exports.RECEIVE_LEARN_FAILURE = RECEIVE_LEARN_FAILURE;

function fetchLearn(user_id, set_id, assignment_id) {
	return function (dispatch, getState) {
		dispatch(clearLearn());
		dispatch({ type: REQUEST_LEARN });
		try {
			dispatch(fetchSequence(user_id, set_id, assignment_id));
			dispatch(fetchSlots());
		} catch (err) {
			dispatch({
				type: RECEIVE_LEARN_FAILURE,
				error: Error(err)
			});
		}
	};
}

/*
@params: user_id, set_id, assignment_id, mode
@purpose: to GET the sequences for given user, set and send most recent/new to redux store
*/
var REQUEST_SEQUENCE = 'REQUEST_SEQUENCE';
exports.REQUEST_SEQUENCE = REQUEST_SEQUENCE;
var RECEIVE_SEQUENCE_SUCCESS = 'RECEIVE_SEQUENCE_SUCCESS';
exports.RECEIVE_SEQUENCE_SUCCESS = RECEIVE_SEQUENCE_SUCCESS;
var RECEIVE_SEQUENCE_FAILURE = 'RECEIVE_SEQUENCE_FAILURE';
exports.RECEIVE_SEQUENCE_FAILURE = RECEIVE_SEQUENCE_FAILURE;
function requestSequence() {
	return {
		type: REQUEST_SEQUENCE
	};
}

function fetchSequence(user_id, set_id, assignment_id, mode) {
	return function (dispatch, getState) {
		dispatch(requestSequence());
		var sequences = undefined;
		_axios2['default'].get(api_url + '/sequences/?user_id=' + Number(user_id) + '&set_id=' + Number(set_id)).then(function (res) {
			sequences = res.data.sequences;
			var sorted_sequences = sequences.sort(function (s1, s2) {
				return new Date(s2.creation) - new Date(s1.creation);
			}),
			    sequence = sorted_sequences[0];
			if (!sequence.completed) {
				dispatch({ type: RECEIVE_SEQUENCE_SUCCESS, sequence: sequence });
			} else {
				var _sequence2 = { type: 'noprior' };
				dispatch(newSequence(_sequence2, user_id, set_id, assignment_id));
			}
		})['catch'](function (err) {
			dispatch({
				type: RECEIVE_SEQUENCE_FAILURE,
				error: Error(err)
			});
		});
	};
}

/*
@params: user_id, set_id, assignment_id, mode, format, timing, difficulty, adapation, chances, loop, reverse_cue, difficulty_chosen_by_user
@purpose: send a POST request to create a new sequence. On the response, it will also have the necessary slots. Will be able to dispatch receive slots success.
*/
var NEW_SEQUENCE_FAILURE = 'NEW_SEQUENCE_FAILURE';
exports.NEW_SEQUENCE_FAILURE = NEW_SEQUENCE_FAILURE;
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
};

function newSequence(prevsequence, user_id, set_id, assignment_id) {
	return function (dispatch, getState) {
		dispatch({ type: REQUEST_LEARN });
		var new_sequence = undefined,
		    current_sequence = getState().learn.current_sequence;
		if (prevsequence == null) {
			new_sequence = Object.assign(_extends({}, _default_sequence), {
				user_id: current_sequence.user_id,
				set_id: current_sequence.set_id,
				assignment_id: current_sequence.assignment_id !== undefined ? current_sequence.assignment_id : null
			});
		} else {
			if (prevsequence.type == 'noprior') {
				new_sequence = Object.assign(_extends({}, _default_sequence), {
					user_id: user_id,
					set_id: set_id,
					assignment_id: assignment_id !== undefined ? assignment_id : null
				});
			} else if (prevsequence.type == 'completed') {
				new_sequence = Object.assign(_extends({}, _default_sequence), {
					user_id: prevsequence.user_id,
					set_id: prevsequence.set_id,
					assignment_id: prevsequence.assignment_id !== undefined ? prevsequence.assignment_id : null
				});
			}
		}
		var sequence_id, sequence;
		_superagent2['default'].post(api_url + '/sequences/no-slots/').send(new_sequence).end(function (err, res) {
			if (res.ok) {
				sequence = res.body;
				sequence_id = res.body.id;
				dispatch({ type: RECEIVE_SEQUENCE_SUCCESS, sequence: sequence });
				_superagent2['default'].post(api_url + '/sequences/' + sequence_id + '/slots/').timeout(150).end(function (err, res) {
					if (res.ok) dispatch({ type: CREATE_SLOTS_SUCCESS });else console.log('timedout');
				});
				setTimeout(function () {
					dispatch(fetchSlots());
				}, 50);
			} else {
				dispatch({
					type: NEW_SEQUENCE_FAILURE,
					error: Error(err)
				});
			}
		});
	};
}

/*
@params: sequence_id, position, compelted, abandoned, mode, format, timing, difficulty, adapation, chances, loop, reverse_cue, difficulty_chosen_by_user
@purpose: send a PUT request to the sequence id, most often updating the position and if the sequence was completed
*/
var UPDATE_SEQUENCE = 'UPDATE_SEQUENCE';
exports.UPDATE_SEQUENCE = UPDATE_SEQUENCE;
var UPDATE_SEQUENCE_SUCCESS = 'UPDATE_SEQUENCE_SUCCESS';
exports.UPDATE_SEQUENCE_SUCCESS = UPDATE_SEQUENCE_SUCCESS;
var UPDATE_SEQUENCE_FAILURE = 'UPDATE_SEQUENCE_FAILURE';
exports.UPDATE_SEQUENCE_FAILURE = UPDATE_SEQUENCE_FAILURE;
function willUpdateSequence() {
	return {
		type: UPDATE_SEQUENCE
	};
}

function updateSequence(_sequence) {
	var _this = this;

	return function callee$1$0(dispatch, getState) {
		var updated_sequence, _seqprop;

		return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					dispatch(willUpdateSequence());
					context$2$0.prev = 1;
					updated_sequence = undefined;

					updated_sequence = _sequence;

					for (_seqprop in updated_sequence) {
						if (_seqprop == 'type') {
							delete updated_sequence[_seqprop];
						}
					}
					dispatch({ type: UPDATING_STATE });
					context$2$0.next = 8;
					return regeneratorRuntime.awrap(_axios2['default'].put(api_url + '/sequences/' + _sequence.id, updated_sequence).then(function (res) {
						console.log(res);
						var sequence = res.data;
						dispatch({ type: UPDATE_SEQUENCE_SUCCESS, sequence: sequence });
						if (sequence.completed) {
							dispatch({ type: SHOW_COMPLETED_SEQUENCE });
						}
					}).then(function () {
						if (!getState().learn.current_sequence.completed) {
							var slot = getState().learn.current_slot;
							dispatch(fetchTrials());
							dispatch({ type: UPDATE_CURRENT_ROUND, slot: slot });
						}
					}));

				case 8:
					context$2$0.next = 13;
					break;

				case 10:
					context$2$0.prev = 10;
					context$2$0.t0 = context$2$0['catch'](1);

					dispatch({
						type: UPDATE_SEQUENCE_FAILURE,
						error: Error(context$2$0.t0)
					});

				case 13:
				case 'end':
					return context$2$0.stop();
			}
		}, null, _this, [[1, 10]]);
	};
}

/*
@params: sequence_id
@purpose: send a GET request to collect the list of slots. include checker methods to make sure all haven't been completed.
*/

var CREATE_SLOTS = 'CREATE_SLOTS';
exports.CREATE_SLOTS = CREATE_SLOTS;
var CREATE_SLOTS_SUCCESS = 'CREATE_SLOTS_SUCCESS';
exports.CREATE_SLOTS_SUCCESS = CREATE_SLOTS_SUCCESS;
var CREATE_SLOTS_FAILURE = 'CREATE_SLOTS_FAILURE';

exports.CREATE_SLOTS_FAILURE = CREATE_SLOTS_FAILURE;
var REQUEST_SLOTS = 'REQUEST_SLOTS';
exports.REQUEST_SLOTS = REQUEST_SLOTS;
var RECEIVE_SLOTS_SUCCESS = 'RECEIVE_SLOTS_SUCCESS';
exports.RECEIVE_SLOTS_SUCCESS = RECEIVE_SLOTS_SUCCESS;
var RECEIVE_SLOTS_FAILURE = 'RECEIVE_SLOTS_FAILURE';
exports.RECEIVE_SLOTS_FAILURE = RECEIVE_SLOTS_FAILURE;

function fetchSlots(sequence_id, isPreparing) {
	return function (dispatch, getState) {
		dispatch({ type: REQUEST_SLOTS });
		var slots, start, end, seq_id, round;
		if (sequence_id == undefined) {
			seq_id = getState().learn.current_sequence.id;
			if (seq_id == undefined) {
				setTimeout(function () {
					dispatch(fetchSlots());
				}, 150);
				return;
			}
		} else {
			seq_id = sequence_id;
		}
		var pos = getState().learn.position,
		    current_round = getState().learn.current_round,
		    length = getState().learn.sequence_length;

		start = Math.round(Math.floor((pos - 1) / 5)) * 5, end = start + 5;

		round = start !== 0 ? Math.round(length / 5 / (length / end)) : 1;

		var body = undefined;
		_superagent2['default'].get(api_url + '/sequences/' + seq_id + '/slots/?start=' + start + '&end=' + end).end(function (err, res) {
			if (res.ok) {
				slots = res.body.slots;
				body = res.body;
				if (slots.length === 0) {
					setTimeout(function () {
						dispatch(fetchSlots(seq_id));
					}, 150);
					return;
				}
				dispatch({ type: RECEIVE_SLOTS_SUCCESS, slots: slots, start: start, end: end, round: round });
				if (!isPreparing) {
					dispatch(fetchTrials());
				}
			} else {
				dispatch({
					type: RECEIVE_SLOTS_FAILURE,
					error: Error(err)
				});
			}
		});
	};
}

/*
@params: slot_id, completed, abandoned, format, reverse_cue, click_to_answer, flagged, hide
@purpose: send a PUT request to the slot_id, most often saying that it has been completed or changing the format
*/
var UPDATE_SLOT = 'UPDATE_SLOT';
exports.UPDATE_SLOT = UPDATE_SLOT;
var UPDATE_SLOT_SUCCESS = 'UPDATE_SLOT_SUCCESS';
exports.UPDATE_SLOT_SUCCESS = UPDATE_SLOT_SUCCESS;
var UPDATE_SLOT_FAILURE = 'UPDATE_SLOT_FAILURE';
exports.UPDATE_SLOT_FAILURE = UPDATE_SLOT_FAILURE;

function updateSlot(slot) {
	var _this2 = this;

	return function callee$1$0(dispatch, getState) {
		return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					dispatch({ type: UPDATE_SLOT });
					context$2$0.prev = 1;
					context$2$0.next = 4;
					return regeneratorRuntime.awrap(_axios2['default'].put(api_url + '/slots/' + slot.id, slot).then(function (res) {
						var slot = res.data;
						dispatch({ type: UPDATE_SLOT_SUCCESS, slot: slot });
					}).then(function () {
						if (getState().learn.slots.filter(function (slot) {
							return !slot.completed;
						}).length === 0) {
							return;
						}
						var slot = getState().learn.current_slot;
						dispatch({ type: UPDATE_CURRENT_ROUND, slot: slot });
					}));

				case 4:
					context$2$0.next = 9;
					break;

				case 6:
					context$2$0.prev = 6;
					context$2$0.t0 = context$2$0['catch'](1);

					dispatch({
						type: UPDATE_SLOT_FAILURE,
						error: Error(context$2$0.t0)
					});

				case 9:
				case 'end':
					return context$2$0.stop();
			}
		}, null, _this2, [[1, 6]]);
	};
}

/*
@params: 
@purpose: send action to store that tells it to transform list of slots into 5 item groups
*/
var TRANSFORM_5_SLOTS = 'TRANSFORM_5_SLOTS';exports.TRANSFORM_5_SLOTS = TRANSFORM_5_SLOTS;
// a few methods to set multiple arrays
var COMPLETED_5_SLOTS = 'COMPLETED_5_SLOTS';exports.COMPLETED_5_SLOTS = COMPLETED_5_SLOTS;
// for display purposes

function transformSlots() {
	return {
		type: TRANSFORM_5_SLOTS
	};
}

function completed5Slots() {
	return {
		type: COMPLETED_5_SLOTS
	};
}

/*
@params: slot_id
@purpose: send a GET request to collect list of trials. will be used to send to redux store, which will then be read by the new trial function to determine what to send. 
*/
var REQUEST_TRIALS = 'REQUEST_TRIALS';
exports.REQUEST_TRIALS = REQUEST_TRIALS;
var RECEIVE_TRIALS_SUCCESS = 'RECEIVE_TRIALS_SUCCESS';
exports.RECEIVE_TRIALS_SUCCESS = RECEIVE_TRIALS_SUCCESS;
var RECEIVE_TRIALS_FAILURE = 'RECEIVE_TRIALS_FAILURE';
exports.RECEIVE_TRIALS_FAILURE = RECEIVE_TRIALS_FAILURE;

function fetchTrials() {
	return function (dispatch, getState) {
		dispatch({ type: REQUEST_TRIALS });
		var slot = getState().learn.current_slot,
		    slot_id = undefined,
		    trial = {},
		    trials = undefined;
		if (Object.keys(slot).length == 0) {
			setTimeout(function () {
				dispatch(fetchTrials());
			}, 25);
			return;
		}
		slot_id = slot.id;
		_axios2['default'].get(api_url + '/slots/' + slot_id + '/trials/').then(function (res) {
			trials = res.data.trials;
			if (trials !== undefined && trials.length > 0) {
				dispatch({ type: RECEIVE_TRIALS_SUCCESS, trials: trials });
				trial = trials.slice(-1)[0];
				if (trial.accuracy === 1 && slot.completed) {
					dispatch({ type: SHOW_CORRECT });
					dispatch({ type: RECEIVE_LEARN_SUCCESS });
				} else {
					trial['type'] = 'return';
					dispatch(newTrial(trial));
					return;
				}
			}
			if (!slot.completed) {
				trial['type'] = null;
				dispatch(newTrial(trial));
			}
		})['catch'](function (err) {
			dispatch({
				type: RECEIVE_TRIALS_FAILURE,
				error: Error(err)
			});
		});
	};
}

/*
@params: slot_id, cue_visible, image, correct_index_choice, nonde,
truefalse, all_of_the_above, format, click_to_answer, type_index_to_answer, cue_target_reversal, reverse_truefalse, reverse_mc, format_chosen_by_user, help_chosen_by_user,
subject, synonyms, augs, related_terms, nonemc_choices, mc_choices, truefalse_target_shown, stem, alt_cues, start
@purpose: send a POST request to create a new trial. will need to use state of slot and previous trial (if any) to determine the displayed augs/format and cue
*/
var NEW_TRIAL = 'NEW_TRIAL';
exports.NEW_TRIAL = NEW_TRIAL;
var NEW_TRIAL_SUCCESS = 'NEW_TRIAL_SUCCESS';
exports.NEW_TRIAL_SUCCESS = NEW_TRIAL_SUCCESS;
var NEW_TRIAL_FAILURE = 'NEW_TRIAL_FAILURE';
exports.NEW_TRIAL_FAILURE = NEW_TRIAL_FAILURE;
var _default_trial = {
	slot_id: 0,
	cue_visible: '',
	image: '',
	correct_index_choice: '',
	none: false,
	truefalse: false,
	all_of_the_above: false,
	format: '',
	click_to_answer: false,
	type_index_to_answer: false,
	cue_target_reversal: false,
	reverse_truefalse: false,
	reverse_mc: false,
	format_chosen_by_user: false,
	help_chosen_by_user: false,
	subjects: null,
	synonyms: null,
	augs: null,
	related_terms: null,
	nonemc_choices: null,
	mc_choices: null,
	truefalse_target_shown: null,
	stem: null,
	alt_cues: null,
	start: null
};

function newTrial(trial) {
	return function (dispatch, getState) {
		dispatch({ type: NEW_TRIAL });
		var new_trial = undefined,
		    state = getState().learn,
		    current_slot = state.current_slot,
		    last_trial = state.trials.slice(-1)[0],
		    s = new Date(),
		    start = s.toISOString().replace("T", " ").replace("Z", "");
		if (current_slot.completed) {
			return;
		}
		for (var _trialprop in trial) {
			if (trial[_trialprop] instanceof Array) {
				trial[_trialprop] = trial[_trialprop].join("|");
			}
		}
		if (trial.type == 'return') {
			new_trial = trial;
		} else if (trial.type == null) {
			new_trial = Object.assign(_extends({}, _default_trial), {
				slot_id: current_slot.id,
				cue_visible: current_slot['item']['cue'],
				format: 'recall',
				start: start
			});
		} else if (trial.type == 'adapt') {
			new_trial = Object.assign(_extends({}, _default_trial), {
				slot_id: current_slot.id,
				cue_visible: trial.cue_visible,
				format: trial.format,
				mc_choices: trial.mc_choices || null,
				stem: trial.stem || null,
				start: start
			});
		} else if (trial.type == 'hint') {
			new_trial = Object.assign(_extends({}, trial), {
				help_chosen_by_user: true,
				augs: trial.new_aug,
				start: start
			});
		}
		for (var _prop in new_trial) {
			if (_prop == 'type') {
				delete new_trial[_prop];
			}
		}
		_axios2['default'].post(api_url + '/trials/', new_trial).then(function (res) {
			var _trial = res.data;
			dispatch({ type: NEW_TRIAL_SUCCESS, _trial: _trial });
		})['catch'](function (err) {
			dispatch({
				type: NEW_TRIAL_FAILURE,
				errorObj: err,
				error: Error(err)
			});
		});
	};
}

/* Helper for format / diff settings */
var CHANGE_FORMAT = 'CHANGE_FORMAT';
exports.CHANGE_FORMAT = CHANGE_FORMAT;
var CHANGE_FORMAT_ERROR = 'CHANGE_FORMAT_ERROR';

exports.CHANGE_FORMAT_ERROR = CHANGE_FORMAT_ERROR;

function newFormat(last_trial, state) {
	return function (dispatch, getState) {
		try {
			var working_obj = undefined,
			    current_slot = state.learn.current_slot;
			if (last_trial !== null) {
				working_obj = last_trial;
			} else {
				working_obj = current_slot;
			}
			var all_formats = ['gen', 'trans', 'recall', 'nonemc', 'mc', 'truefalse', 'stem', 'peek', 'copy'],
			    current_formats = ['recall', 'mc', 'stem', 'copy'],
			    current_index = current_formats.indexOf(working_obj['format']),
			    next_index = current_index + 1;
			if (next_index >= 3) {
				next_index = 3;
			}
			var new_format = current_formats[next_index];
			dispatch({ type: CHANGE_FORMAT, new_format: new_format });

			return new_format;
		} catch (err) {
			dispatch({
				type: CHANGE_FORMAT_ERROR,
				error: Error(err)
			});
		}
	};
}

/* Helper for deciding which hint to show next */
var NEW_HINT = 'NEW_HINT';
exports.NEW_HINT = NEW_HINT;
var NEW_HINT_SUCCESS = 'NEW_HINT_SUCCESS';
exports.NEW_HINT_SUCCESS = NEW_HINT_SUCCESS;
var NEW_HINT_FAILURE = 'NEW_HINT_FAILURE';
exports.NEW_HINT_FAILURE = NEW_HINT_FAILURE;

function hint(response) {
	return function (dispatch, getState) {
		dispatch({ type: NEW_HINT });
		var current_trial = getState().learn.current_trial,
		    id = current_trial.id,
		    current_slot = getState().learn.current_slot,
		    augs = current_slot['augs'],
		    recent_aug = current_trial.augs ? current_trial['augs'][0] : null,
		    index = recent_aug !== null ? augs.indexOf(recent_aug) : 0,
		    next_index = index + 1;
		_axios2['default'].put(api_url + '/trials/' + id, response).then(function (res) {
			var updated_trial = res.data;
			dispatch({ type: UPDATE_TRIAL_SUCCESS, updated_trial: updated_trial });
			if (next_index >= augs.length) {
				next_index = augs.length;
			}
			if (augs.length > 0 && recent_aug == null) {
				next_index = 0;
			}
			var new_aug = augs[next_index];
			current_trial['new_aug'] = new_aug;
			current_trial['type'] = 'hint';
			dispatch(newTrial(current_trial));
			dispatch({ type: NEW_HINT_SUCCESS, new_aug: new_aug });
		})['catch'](function () {
			dispatch({
				type: NEW_HINT_FAILURE,
				error: Error(err)
			});
		});
	};
}

/*
@params: 
@purpose: update the current trial, and either create new trial w/adapt or show correct
*/
var UPDATE_TRIAL = 'UPDATE_TRIAL';
exports.UPDATE_TRIAL = UPDATE_TRIAL;
var UPDATE_TRIAL_SUCCESS = 'UPDATE_TRIAL_SUCCESS';
exports.UPDATE_TRIAL_SUCCESS = UPDATE_TRIAL_SUCCESS;
var UPDATE_TRIAL_FAILURE = 'UPDATE_TRIAL_FAILURE';
exports.UPDATE_TRIAL_FAILURE = UPDATE_TRIAL_FAILURE;
var GRADING = 'GRADING';
exports.GRADING = GRADING;
function willUpdateTrial() {
	return {
		type: UPDATE_TRIAL
	};
}

function updateTrial(response) {
	return function (dispatch, getState) {
		dispatch({ type: GRADING });
		var state = getState().learn,
		    current_trial = state.current_trial,
		    current_slot = state.current_slot,
		    trial_id = current_trial.id;
		_axios2['default'].put(api_url + '/trials/' + trial_id, response).then(function (res) {
			var updated_trial = res.data;
			dispatch({ type: UPDATE_TRIAL_SUCCESS, updated_trial: updated_trial });
			if (updated_trial.correct) {
				current_slot['completed'] = true;
				dispatch(updateSlot(current_slot));
				dispatch({ type: SHOW_CORRECT });
				return;
			}
			dispatch(adapt(updated_trial));
		})['catch'](function () {
			dispatch({
				type: UPDATE_TRIAL_FAILURE,
				error: Error(err),
				typeerror: err
			});
		});
	};
}

/*
@params: 
@purpose: take the current state of learn and return a new trial with updated settings
*/
var ADAPT = 'ADAPT';
exports.ADAPT = ADAPT;
var ADAPT_SUCCESS = 'ADAPT_SUCCESS';
exports.ADAPT_SUCCESS = ADAPT_SUCCESS;
var ADAPT_FAILURE = 'ADAPT_FAILURE';
exports.ADAPT_FAILURE = ADAPT_FAILURE;

function adapt(updated_trial) {
	return function (dispatch, getState) {
		dispatch({ type: ADAPT });
		try {
			var new_format = dispatch(newFormat(updated_trial, getState())),
			    current_slot = getState().learn.current_slot,
			    adapt_trial = undefined,
			    mc_choices = undefined,
			    request_choices = undefined,
			    request_stem = undefined,
			    stem = undefined;
			if (new_format == 'mc') {
				mc_choices = current_slot['mc'];
				request_choices = mc_choices.join('|');
			} else if (new_format == 'stem') {
				stem = current_slot['stem'];
				request_stem = stem.join("|");
			}
			updated_trial = Object.assign(_extends({}, updated_trial), {
				type: 'adapt',
				format: new_format,
				mc_choices: request_choices !== undefined ? request_choices : null,
				stem: request_stem !== undefined ? request_stem : null
			});
			dispatch({ type: ADAPT_SUCCESS, new_format: new_format });
			dispatch(newTrial(updated_trial));
			if (current_slot.format !== new_format) {
				current_slot['format'] = new_format;
				dispatch(updateSlot(current_slot));
			}
		} catch (err) {
			dispatch({
				type: ADAPT_FAILURE,
				error: Error(err)
			});
		}
	};
}

// export const SHOW_FEEDBACK = 'SHOW_FEEDBACK'

/*
@params:
@purpose: dispatch to store to update view to show correct view
*/
var SHOW_CORRECT = 'SHOW_CORRECT';
exports.SHOW_CORRECT = SHOW_CORRECT;
// export function showCorrect() {
// 	return {
// 		type: SHOW_CORRECT
// 	}
// }

/*
@params:
@purpose: dispatch to store to update view to show completed sequence (full)
*/
var SHOW_COMPLETED_SEQUENCE = 'SHOW_COMPLETED_SEQUENCE';
exports.SHOW_COMPLETED_SEQUENCE = SHOW_COMPLETED_SEQUENCE;
// export function showCompletedSequence() {
// 	return {
// 		type: SHOW_COMPLETED_SEQUENCE
// 	}
// }

/*
@params:
@purpose: with current index, find the unfinished slots, and move to that spot[/order]
*/
var SKIP_SUCCESS = 'SKIP_SUCCESS';
exports.SKIP_SUCCESS = SKIP_SUCCESS;
var SKIP_FAILURE = 'SKIP_FAILURE';
exports.SKIP_FAILURE = SKIP_FAILURE;
function findUnfinished(index, length, slots) {
	for (var _u = index; _u < length; _u++) {
		if (!slots[_u]['completed']) {
			return _u;
		}
	}
}
function skipToUnfinished(index, slots) {
	var length = slots.length;
	if (Number(index) == Number(length)) {
		index = findUnfinished(0, length, slots);
	} else {
		index = findUnfinished(index, length, slots);
		if (index == undefined) {
			index = findUnfinished(0, length, slots);
		}
	}
	return index;
}

function skipSlot() {
	return function (dispatch, getState) {
		try {
			var state = getState().learn,
			    current_slot = state.current_slot,
			    current_sequence = state.current_sequence,
			    slots = state.current_round,
			    index = state.slot_index,
			    new_index = skipToUnfinished(index, slots);
			if (new_index == undefined) {
				dispatch(showCompleteRound(current_sequence.id));
				return;
			}
			var next_slot = slots[new_index],
			    new_pos = next_slot.order;
			dispatch({ type: SKIP_SUCCESS, next_slot: next_slot });
			if (next_slot.completed) {
				dispatch({ type: SHOW_CORRECT });
			}
			current_sequence = Object.assign(_extends({}, current_sequence), {
				position: new_pos,
				type: 'updating_position'
			});
			dispatch(updateSequence(current_sequence));
		} catch (err) {
			dispatch({
				type: SKIP_FAILURE,
				error: Error(err)
			});
		}
	};
}

/*
@params: 
@purpose: to move to the next slot. if the next slot is equal to the last order # or 1, just return
*/
var MOVE_SLOT = 'MOVE_SLOT';
exports.MOVE_SLOT = MOVE_SLOT;
var MOVE_SLOT_SUCCESS = 'MOVE_SLOT_SUCCESS';
exports.MOVE_SLOT_SUCCESS = MOVE_SLOT_SUCCESS;
var MOVE_SLOT_FAILURE = 'MOVE_SLOT_FAILURE';
exports.MOVE_SLOT_FAILURE = MOVE_SLOT_FAILURE;
function findNext(dir, slots, pos) {
	var length = slots.length - 1;
	if (dir == 'next') {
		if (pos == length) {
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

function nextSlot(dir) {
	return function (dispatch, getState) {
		try {
			var state = getState().learn,
			    current_slot = state.current_slot,
			    current_sequence = state.current_sequence,
			    slots = state.current_round,
			    pos = state.slot_index,
			    next_pos = findNext(dir, slots, pos),
			    next_slot = slots[next_pos],
			    new_pos = next_slot.order;
			if (pos == next_pos) {
				return;
			}
			dispatch({ type: MOVE_SLOT_SUCCESS, next_slot: next_slot });
			if (next_slot.completed) {
				dispatch({ type: SHOW_CORRECT });
			}
			current_sequence = Object.assign(_extends({}, current_sequence), {
				position: new_pos,
				type: 'updating_position'
			});
			dispatch(updateSequence(current_sequence));
		} catch (err) {
			dispatch({
				type: MOVE_SLOT_FAILURE,
				error: Error(err)
			});
		}
	};
}

/*
@params:
@purpose: to clear the learn state for viewing/rendering
*/
var CLEAR_LEARN = 'CLEAR_LEARN';
exports.CLEAR_LEARN = CLEAR_LEARN;

function clearLearn() {
	return {
		type: CLEAR_LEARN
	};
}

var SHOW_COMPLETE_ROUND = 'SHOW_COMPLETE_ROUND';
exports.SHOW_COMPLETE_ROUND = SHOW_COMPLETE_ROUND;
var NEXT_ROUND = 'NEXT_ROUND';
exports.NEXT_ROUND = NEXT_ROUND;

function showCompleteRound(seq_id) {
	return function (dispatch, getState) {
		dispatch({ type: SHOW_COMPLETE_ROUND });
		setTimeout(function () {
			var current_sequence = getState().learn.current_sequence,
			    pos = getState().learn.position,
			    length = getState().learn.sequence_length;
			if (pos >= length) return;
			dispatch(fetchSlots(current_sequence.id, true));
		}, 50);
	};
}

function nextRound() {
	return function (dispatch, getState) {
		var isFetchingSlots = getState().learn.isFetchingSlots;
		if (isFetchingSlots) {
			setTimeout(function () {
				dispatch(nextRound());
			}, 50);
		}
		dispatch({ type: NEXT_ROUND });
		var new_position = getState().learn.position,
		    current_sequence = getState().learn.current_sequence,
		    sequence = undefined;
		if (new_position >= current_sequence.length) {
			sequence = Object.assign(_extends({}, current_sequence), { completed: true, type: 'completed' });
		} else {
			sequence = Object.assign(_extends({}, current_sequence), { position: new_position, type: 'updating_position' });
		}
		dispatch(updateSequence(sequence));
	};
}

var UPDATING_STATE = 'UPDATING_STATE';
exports.UPDATING_STATE = UPDATING_STATE;
var UPDATE_CURRENT_ROUND = 'UPDATE_CURRENT_ROUND';

exports.UPDATE_CURRENT_ROUND = UPDATE_CURRENT_ROUND;
/* Show completed round or sequence */

// .then(() => {
// 	var state = getState().learn,
// 		slots = state.slots,
// 		current_sequence = state.current_sequence,
// 		current_round = state.current_round,
// 		cmi = state.current_round_index,
// 		rounds = state.rounds,
// 		round_slots = current_round;
// 	if(slots.filter(slot => !slot.completed).length === 0) {
// 		current_sequence['type'] = 'completed';
// 		dispatch(updateSequence(current_sequence))
// 		return;
// 	}
// 	if(!current_sequence.completed && current_sequence.type !== 'completed') {
// 		if(round_slots.filter(slot => !slot.completed).length === 0) {
// 			rounds.map((miniseq) => {
// 				if(rounds.indexOf(miniseq) == cmi) {
// 					miniseq.completed = true
// 				}
// 			})
// 			dispatch({type: SHOW_COMPLETE_MINISEQ, rounds})
// 		}
// 	}
// })

//# sourceMappingURL=learnv2-compiled.js.map