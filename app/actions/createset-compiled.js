'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.fetchSet = fetchSet;
exports.loadEditing = loadEditing;
exports.createSet = createSet;
exports.updateSet = updateSet;
exports.updateSetSubjects = updateSetSubjects;
exports.createAssignment = createAssignment;
exports.updateAssignment = updateAssignment;
exports.deleteAssignment = deleteAssignment;
exports.getTermSuggestions = getTermSuggestions;
exports.getDefSuggestions = getDefSuggestions;
exports.clearDefChoices = clearDefChoices;
exports.createItem = createItem;
exports.updateItem = updateItem;
exports.createAssociation = createAssociation;
exports.updateAssociation = updateAssociation;
exports.reorder = reorder;
exports.setFlag = setFlag;
exports.setTitleFlag = setTitleFlag;
exports.clearSet = clearSet;
exports.loadSetFlag = loadSetFlag;
exports.loadedView = loadedView;
exports.addRow = addRow;
exports.deleteRow = deleteRow;
exports.finishedRendering = finishedRendering;
exports.unMountingCreate = unMountingCreate;
exports.saveTitle = saveTitle;
exports.savePurpose = savePurpose;
exports.resize = resize;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reducersCreateset = require('../reducers/createset');

var api_url = 'http://127.0.0.1:5000/webapi/v2.0';

// /sets/<int: set_id>/associations/
// /users/<int: user_id>/assignments/					GET
// /assignments/<int: assignment_id>	
var FETCH_CREATE_SET = 'FETCH_CREATE_SET';
exports.FETCH_CREATE_SET = FETCH_CREATE_SET;

function fetchSet(user_id, set_id, pushState) {
	var _this2 = this;

	return function callee$1$0(dispatch, getState) {
		var _ret;

		return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
			var _this = this;

			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					dispatch({ type: FETCH_CREATE_SET });
					context$2$0.prev = 1;
					context$2$0.next = 4;
					return regeneratorRuntime.awrap((function callee$2$0() {
						var set, items, associations, rows, assignment;
						return regeneratorRuntime.async(function callee$2$0$(context$3$0) {
							while (1) switch (context$3$0.prev = context$3$0.next) {
								case 0:
									set = {};
									items = {};
									associations = {};
									rows = [];
									context$3$0.next = 6;
									return regeneratorRuntime.awrap(getState().sets.assignments.filter(function (assign) {
										return assign.set_id == set_id;
									})[0]);

								case 6:
									assignment = context$3$0.sent;
									context$3$0.next = 9;
									return regeneratorRuntime.awrap(_axios2['default'].get(api_url + '/sets/' + set_id).then(function (res) {
										set = res.data;
									}));

								case 9:
									context$3$0.next = 11;
									return regeneratorRuntime.awrap(_axios2['default'].get(api_url + '/assignments/' + assignment.id).then(function (res) {
										assignment = res.data;
									}));

								case 11:
									assignment.set.associations.associations.forEach(function (asc) {
										items[asc.item_id] = asc.item;
										associations[asc.id] = asc;
										rows.push(asc.id);
									});

									if (!(set.editability == 'creator' && set.creator_id !== user_id)) {
										context$3$0.next = 15;
										break;
									}

									pushState(null, '/');
									return context$3$0.abrupt('return', {
										v: undefined
									});

								case 15:
									dispatch({ type: LOAD_EDITING_SUCCESS, set: set, assignment: assignment, items: items, associations: associations, rows: rows });

								case 16:
								case 'end':
									return context$3$0.stop();
							}
						}, null, _this);
					})());

				case 4:
					_ret = context$2$0.sent;

					if (!(typeof _ret === 'object')) {
						context$2$0.next = 7;
						break;
					}

					return context$2$0.abrupt('return', _ret.v);

				case 7:
					context$2$0.next = 13;
					break;

				case 9:
					context$2$0.prev = 9;
					context$2$0.t0 = context$2$0['catch'](1);

					if (context$2$0.t0.status == 404) pushState(null, '/error');
					dispatch({
						type: LOAD_EDITING_FAILURE,
						error: Error(context$2$0.t0),
						err: context$2$0.t0
					});

				case 13:
				case 'end':
					return context$2$0.stop();
			}
		}, null, _this2, [[1, 9]]);
	};
}

/*
---Load the transfer state if editing ----
*/
var LOAD_EDITING = 'LOAD_EDITING';
exports.LOAD_EDITING = LOAD_EDITING;
var LOAD_EDITING_SUCCESS = 'LOAD_EDITING_SUCCESS';
exports.LOAD_EDITING_SUCCESS = LOAD_EDITING_SUCCESS;
var LOAD_EDITING_FAILURE = 'LOAD_EDITING_FAILURE';
exports.LOAD_EDITING_FAILURE = LOAD_EDITING_FAILURE;

function loadEditing(set_id, pushState) {
	var _this3 = this;

	return function callee$1$0(dispatch, getState) {
		var _ret2;

		return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					dispatch({ type: LOAD_EDITING, 'true': true });
					context$2$0.prev = 1;

					_ret2 = (function () {
						var transferState = getState().transfer,
						    user = getState().user.user,
						    set = undefined,
						    assignment = undefined,
						    items = {},
						    associations = {},
						    rows = [];
						if (Object.keys(user).length == 0) {
							setTimeout(function () {
								dispatch(loadEditing(set_id, pushState));
								return;
							}, 250);
						}
						if (transferState.set !== null && transferState.set !== undefined) {
							if (transferState.set.id == set_id) {
								set = transferState.set;
								assignment = transferState.assignment;
								transferState.associations.forEach(function (asc) {
									items[asc.item_id] = asc.item;
									associations[asc.id] = asc;
									rows.push(asc.id);
								});
								if (set.editability == 'creator' && set.creator_id !== user.id) {
									pushState(null, '/error');
									return {
										v: undefined
									};
								}
								setTimeout(function () {
									dispatch({ type: LOAD_EDITING_SUCCESS, set: set, assignment: assignment, items: items, associations: associations, rows: rows });
								}, 50);
							}
						} else {
							dispatch(fetchSet(user.id, set_id, pushState));
						}
					})();

					if (!(typeof _ret2 === 'object')) {
						context$2$0.next = 5;
						break;
					}

					return context$2$0.abrupt('return', _ret2.v);

				case 5:
					context$2$0.next = 11;
					break;

				case 7:
					context$2$0.prev = 7;
					context$2$0.t0 = context$2$0['catch'](1);

					pushState(null, '/error');
					dispatch({
						type: LOAD_EDITING_FAILURE,
						error: Error(context$2$0.t0)
					});

				case 11:
				case 'end':
					return context$2$0.stop();
			}
		}, null, _this3, [[1, 7]]);
	};
}

/*
@params: { 	

'parent_id':  Integer,
'creator_id':  Integer,
'source_id':  Integer,
‘targets_lang_id’: Integer,
‘cues_lang_id’: Integer,
'title':  String,
'description':  String,
‘has_images’: Boolean,
'official':  Integer,
'visibility':  String,			‘public’ | ‘private’
‘editability’: String,			‘group’ | ‘admin’ | ‘creator’

}
*/
var _settemplate = {
	parent_id: null,
	creator_id: null,
	source_id: null,
	targets_lang_id: null,
	cues_lang_id: null,
	title: null,
	description: null,
	has_images: false,
	official: null,
	visibility: 'public',
	editability: 'creator'
};

var CREATE_SET = 'CREATE_SET';
exports.CREATE_SET = CREATE_SET;
var CREATE_SET_SUCCESS = 'CREATE_SET_SUCCESS';
exports.CREATE_SET_SUCCESS = CREATE_SET_SUCCESS;
var CREATE_SET_FAILURE = 'CREATE_SET_FAILURE';
exports.CREATE_SET_FAILURE = CREATE_SET_FAILURE;

function createSet(title) {
	var _this4 = this;

	for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		args[_key - 1] = arguments[_key];
	}

	return function callee$1$0(dispatch, getState) {
		var user, set, i, arg, _name, prop;

		return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					dispatch({ type: CREATE_SET });
					context$2$0.prev = 1;
					user = getState().user.user, set = Object.assign(_extends({}, _settemplate), {
						creator_id: user.id,
						title: title || 'Untitled'
					});

					if (args.length > 0) {
						for (i = 0; i < args.length; i++) {
							arg = args[i], _name = arg.name, prop = arg.prop;

							if (set.hasOwnProperty(_name)) {
								set[_name] = prop;
							}
						}
					}
					context$2$0.next = 6;
					return regeneratorRuntime.awrap(_axios2['default'].post(api_url + '/sets/', set).then(function (res) {
						return set = res.data;
					}));

				case 6:
					dispatch({ type: CREATE_SET_SUCCESS, set: set });
					if (set.title !== 'Untitled') {
						// dispatch(updateSetSubjects())
					}
					context$2$0.next = 13;
					break;

				case 10:
					context$2$0.prev = 10;
					context$2$0.t0 = context$2$0['catch'](1);

					dispatch({
						type: CREATE_SET_FAILURE,
						error: Error(context$2$0.t0),
						typeerr: context$2$0.t0
					});

				case 13:
				case 'end':
					return context$2$0.stop();
			}
		}, null, _this4, [[1, 10]]);
	};
}

/*
@params:
	
'source_id':  Integer,
‘targets_lang_id’: Integer,
‘cues_lang_id’: Integer,
'title':  String,
'description':  String,
‘has_images’: Boolean,
'official':  Integer,
'visibility':  String,			‘public’ | ‘private’
‘editability’: String,			‘group’ | ‘admin’ | ‘creator’

*/
var set_update_values = {
	source_id: null,
	targets_lang_id: null,
	cues_lang_id: null,
	title: null,
	description: null,
	has_images: null,
	official: null,
	visibility: null,
	editability: null,
	finalized: null
};

var UPDATE_SET = 'UPDATE_SET';
exports.UPDATE_SET = UPDATE_SET;
var UPDATE_SET_SUCCESS = 'UPDATE_SET_SUCCESS';
exports.UPDATE_SET_SUCCESS = UPDATE_SET_SUCCESS;
var UPDATE_SET_FAILURE = 'UPDATE_SET_FAILURE';
exports.UPDATE_SET_FAILURE = UPDATE_SET_FAILURE;

function updateSet(_set) {
	var _this5 = this;

	for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
		args[_key2 - 1] = arguments[_key2];
	}

	return function callee$1$0(dispatch, getState) {
		var set, key, i, arg, _name2, prop;

		return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					dispatch({ type: UPDATE_SET });
					context$2$0.prev = 1;
					set = Object.assign({}, set_update_values);

					for (key in set) {
						if (_set[key]) {
							set[key] = _set[key];
						}
					}
					if (args !== null && args.length > 0) {
						for (i = 0; i < args.length; i++) {
							arg = args[i], _name2 = arg.name, prop = arg.prop;

							if (set.hasOwnProperty(_name2)) {
								set[_name2] = prop;
							}
						}
					}
					context$2$0.next = 7;
					return regeneratorRuntime.awrap(_axios2['default'].put(api_url + '/sets/' + _set.id, set).then(function (res) {
						return set = res.data;
					}));

				case 7:
					dispatch({ type: UPDATE_SET_SUCCESS, set: set });
					context$2$0.next = 13;
					break;

				case 10:
					context$2$0.prev = 10;
					context$2$0.t0 = context$2$0['catch'](1);

					dispatch({
						type: UPDATE_SET_FAILURE,
						error: Error(context$2$0.t0)
					});

				case 13:
				case 'end':
					return context$2$0.stop();
			}
		}, null, _this5, [[1, 10]]);
	};
}

// { "subjects": [name, name name] }
var UPDATE_SETSUBJECTS_SUCCESS = 'UPDATE_SETSUBJECTS_SUCCESS';
exports.UPDATE_SETSUBJECTS_SUCCESS = UPDATE_SETSUBJECTS_SUCCESS;
var UPDATE_SETSUBJECTS_FAILURE = 'UPDATE_SETSUBJECTS_FAILURE';
exports.UPDATE_SETSUBJECTS_FAILURE = UPDATE_SETSUBJECTS_FAILURE;

function updateSetSubjects(subjects, set) {
	return function (dispatch, getState) {
		// dispatch({type: UPDATE_SET})
		try {
			var subs,
			    set = set == undefined ? getState().createset.set : set;
			if (subjects !== undefined) {
				subs = { subjects: subjects };
				_axios2['default'].put(api_url + '/sets/' + set.id + '/edit-subjects/', subs).then(function (res) {
					subs = res.data.subjects;
					dispatch({ type: UPDATE_SETSUBJECTS_SUCCESS, subs: subs });
					return;
				});
			}
			_axios2['default'].put(api_url + '/sets/' + set.id + '/subjects/').then(function (res) {
				subs = res.data.subjects;
				dispatch({ type: UPDATE_SETSUBJECTS_SUCCESS, subs: subs });
			});
		} catch (err) {
			dispatch({
				type: UPDATE_SETSUBJECTS_FAILURE,
				error: Error(err)
			});
		}
	};
}

/*
@params: 

'user_id':  Integer,  ** required
'set_id':  Integer, ** required
‘new_sequence_difficulty’: String,	‘beginner’ | ‘novice’ | ‘intermediate’ | ‘advanced’ | ‘expert’ | ‘master’
‘starred’: Boolean,
‘deadline’: String,
‘wallpaper’: String,
‘permission’: String,			‘admin’ | ‘nonadmin’
‘privacy’: String,			‘public’ | ‘group’ | ‘private’

*/
var _assignmenttemplate = {
	user_id: null,
	set_id: null,
	new_sequence_difficulty: 'intermediate',
	starred: false,
	deadline: null,
	wallpaper: null,
	permission: 'nonadmin',
	privacy: 'public'
};
var CREATE_ASSIGNMENT = 'CREATE_ASSIGNMENT';
exports.CREATE_ASSIGNMENT = CREATE_ASSIGNMENT;
var CREATE_ASSIGNMENT_SUCCESS = 'CREATE_ASSIGNMENT_SUCCESS';
exports.CREATE_ASSIGNMENT_SUCCESS = CREATE_ASSIGNMENT_SUCCESS;
var CREATE_ASSIGNMENT_FAILURE = 'CREATE_ASSIGNMENT_FAILURE';
exports.CREATE_ASSIGNMENT_FAILURE = CREATE_ASSIGNMENT_FAILURE;

function createAssignment(set_id, permission) {
	for (var _len3 = arguments.length, args = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
		args[_key3 - 2] = arguments[_key3];
	}

	var _this7 = this;

	return function callee$1$0(dispatch, getState) {
		return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
			var _this6 = this;

			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					dispatch({ type: CREATE_ASSIGNMENT });
					context$2$0.prev = 1;
					context$2$0.next = 4;
					return regeneratorRuntime.awrap((function callee$2$0() {
						var user_id, assignment;
						return regeneratorRuntime.async(function callee$2$0$(context$3$0) {
							while (1) switch (context$3$0.prev = context$3$0.next) {
								case 0:
									user_id = getState().user.user.id, assignment = Object.assign(_extends({}, _assignmenttemplate), {
										user_id: user_id,
										set_id: set_id,
										permission: permission || 'nonadmin'
									});
									context$3$0.next = 3;
									return regeneratorRuntime.awrap(_axios2['default'].post(api_url + '/assignments/', assignment).then(function (res) {
										return assignment = res.data;
									}));

								case 3:
									dispatch({ type: CREATE_ASSIGNMENT_SUCCESS, assignment: assignment });
									if (args.length > 0 && args[0].name == 'navigate' && args[0].prop) {
										(function () {
											var pushState = args[1];
											setTimeout(function () {
												pushState(null, '/set/' + assignment.set_id);
											}, 5);
										})();
									}

								case 5:
								case 'end':
									return context$3$0.stop();
							}
						}, null, _this6);
					})());

				case 4:
					context$2$0.next = 9;
					break;

				case 6:
					context$2$0.prev = 6;
					context$2$0.t0 = context$2$0['catch'](1);

					dispatch({
						type: CREATE_ASSIGNMENT_FAILURE,
						error: Error(context$2$0.t0)
					});

				case 9:
				case 'end':
					return context$2$0.stop();
			}
		}, null, _this7, [[1, 6]]);
	};
}

/*

‘new_sequence_difficulty’: String,	‘beginner’ | ‘novice’ | ‘intermediate’ | ‘advanced’ | ‘expert’ | ‘master’
‘starred’: Boolean,
‘deadline’: String,
‘wallpaper’: String,
‘permission’: String,			‘admin’ | ‘nonadmin’
‘privacy’: String,			‘public’ | ‘group’ | ‘private’

*/
var UPDATE_ASSIGNMENT = 'UPDATE_ASSIGNMENT';
exports.UPDATE_ASSIGNMENT = UPDATE_ASSIGNMENT;
var UPDATE_ASSIGNMENT_SUCCESS = 'UPDATE_ASSIGNMENT_SUCCESS';
exports.UPDATE_ASSIGNMENT_SUCCESS = UPDATE_ASSIGNMENT_SUCCESS;
var UPDATE_ASSIGNMENT_FAILURE = 'UPDATE_ASSIGNMENT_FAILURE';
exports.UPDATE_ASSIGNMENT_FAILURE = UPDATE_ASSIGNMENT_FAILURE;

function updateAssignment() {
	var _this8 = this;

	for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
		args[_key4] = arguments[_key4];
	}

	return function callee$1$0(dispatch, getState) {
		var assignment, i, arg, _name3, prop;

		return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					dispatch({ type: UPDATE_ASSIGNMENT });
					context$2$0.prev = 1;
					assignment = getState().createset.assignment;

					if (args.length > 0) {
						for (i = 0; i < args.length; i++) {
							arg = args[i], _name3 = arg.name, prop = arg.prop;

							if (assignment.hasOwnProperty(_name3)) {
								assignment[_name3] = prop;
							}
						}
					}
					context$2$0.next = 6;
					return regeneratorRuntime.awrap(_axios2['default'].put(api_url + '/assignments/' + assignment.id, assignment).then(function (res) {
						return assignment = res.data;
					}));

				case 6:
					dispatch({ type: UPDATE_ASSIGNMENT_SUCCESS, assignment: assignment });
					context$2$0.next = 12;
					break;

				case 9:
					context$2$0.prev = 9;
					context$2$0.t0 = context$2$0['catch'](1);

					dispatch({
						type: UPDATE_ASSIGNMENT_FAILURE,
						error: Error(context$2$0.t0)
					});

				case 12:
				case 'end':
					return context$2$0.stop();
			}
		}, null, _this8, [[1, 9]]);
	};
}

// /assignments/<int: assignment_id>
var DELETE_ASSIGNMENT = 'DELETE_ASSIGNMENT';
exports.DELETE_ASSIGNMENT = DELETE_ASSIGNMENT;
var DELETE_ASSIGNMENT_SUCCESS = 'DELETE_ASSIGNMENT_SUCCESS';
exports.DELETE_ASSIGNMENT_SUCCESS = DELETE_ASSIGNMENT_SUCCESS;
var DELETE_ASSIGNMENT_FAILURE = 'DELETE_ASSIGNMENT_FAILURE';
exports.DELETE_ASSIGNMENT_FAILURE = DELETE_ASSIGNMENT_FAILURE;

function deleteAssignment(assignment_id, pushState) {
	var _this9 = this;

	return function callee$1$0(dispatch, getState) {
		return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					dispatch({ type: DELETE_ASSIGNMENT });
					context$2$0.prev = 1;
					context$2$0.next = 4;
					return regeneratorRuntime.awrap(_axios2['default']['delete'](api_url + '/assignments/' + assignment_id).then(function (res) {
						dispatch({ type: DELETE_ASSIGNMENT_SUCCESS });
						pushState(null, '/');
					}));

				case 4:
					context$2$0.next = 9;
					break;

				case 6:
					context$2$0.prev = 6;
					context$2$0.t0 = context$2$0['catch'](1);

					dispatch({
						type: DELETE_ASSIGNMENT_FAILURE,
						error: Error(context$2$0.t0)
					});

				case 9:
				case 'end':
					return context$2$0.stop();
			}
		}, null, _this9, [[1, 6]]);
	};
}

/*
@params:
?target=String &subjects="list1|list2"	
*/
var GET_TERM_SUGGESTIONS = 'GET_TERM_SUGGESTIONS';
exports.GET_TERM_SUGGESTIONS = GET_TERM_SUGGESTIONS;
var TERM_SUGGESTIONS_SUCCESS = 'TERM_SUGGESTIONS_SUCCESS';
exports.TERM_SUGGESTIONS_SUCCESS = TERM_SUGGESTIONS_SUCCESS;
var TERM_SUGGESTIONS_FAILURE = 'TERM_SUGGESTIONS_FAILURE';
exports.TERM_SUGGESTIONS_FAILURE = TERM_SUGGESTIONS_FAILURE;

function getTermSuggestions(value) {
	var _this11 = this;

	return function callee$1$0(dispatch, getState) {
		var _ret5;

		return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
			var _this10 = this;

			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					dispatch({ type: GET_TERM_SUGGESTIONS });
					context$2$0.prev = 1;
					context$2$0.next = 4;
					return regeneratorRuntime.awrap((function callee$2$0() {
						var terms, subjects, subs;
						return regeneratorRuntime.async(function callee$2$0$(context$3$0) {
							while (1) switch (context$3$0.prev = context$3$0.next) {
								case 0:
									terms = undefined, subjects = [], subs = getState().createset.subjects;

									if (!(value.length === 0)) {
										context$3$0.next = 3;
										break;
									}

									return context$3$0.abrupt('return', {
										v: undefined
									});

								case 3:
									if (!(subs == undefined || subs.length === 0)) {
										context$3$0.next = 5;
										break;
									}

									return context$3$0.abrupt('return', {
										v: undefined
									});

								case 5:
									subs.forEach(function (sub) {
										return subjects.push(sub.name);
									});
									subjects.join("|");
									context$3$0.next = 9;
									return regeneratorRuntime.awrap(_axios2['default'].get(api_url + '/terms/?search=' + value + '&subjects=' + subjects).then(function (res) {
										return terms = res.data.terms;
									}));

								case 9:
									dispatch({ type: TERM_SUGGESTIONS_SUCCESS, terms: terms });

								case 10:
								case 'end':
									return context$3$0.stop();
							}
						}, null, _this10);
					})());

				case 4:
					_ret5 = context$2$0.sent;

					if (!(typeof _ret5 === 'object')) {
						context$2$0.next = 7;
						break;
					}

					return context$2$0.abrupt('return', _ret5.v);

				case 7:
					context$2$0.next = 12;
					break;

				case 9:
					context$2$0.prev = 9;
					context$2$0.t0 = context$2$0['catch'](1);

					dispatch({
						type: TERM_SUGGESTIONS_FAILURE,
						error: Error(context$2$0.t0)
					});

				case 12:
				case 'end':
					return context$2$0.stop();
			}
		}, null, _this11, [[1, 9]]);
	};
}

/*
@params:
?target=String &subjects="list1|list2"	
*/
var GET_DEF_SUGGESTIONS = 'GET_DEF_SUGGESTIONS';
exports.GET_DEF_SUGGESTIONS = GET_DEF_SUGGESTIONS;
var DEF_SUGGESTIONS_SUCCESS = 'DEF_SUGGESTIONS_SUCCESS';
exports.DEF_SUGGESTIONS_SUCCESS = DEF_SUGGESTIONS_SUCCESS;
var DEF_SUGGESTIONS_FAILURE = 'DEF_SUGGESTIONS_FAILURE';
exports.DEF_SUGGESTIONS_FAILURE = DEF_SUGGESTIONS_FAILURE;

function getDefSuggestions(id, target) {
	var _this13 = this;

	return function callee$1$0(dispatch, getState) {
		var _ret6;

		return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
			var _this12 = this;

			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					dispatch({ type: GET_DEF_SUGGESTIONS });
					context$2$0.prev = 1;
					context$2$0.next = 4;
					return regeneratorRuntime.awrap((function callee$2$0() {
						var items, term, subjects, subs, def_choices;
						return regeneratorRuntime.async(function callee$2$0$(context$3$0) {
							while (1) switch (context$3$0.prev = context$3$0.next) {
								case 0:
									items = undefined, term = undefined, subjects = [], subs = getState().createset.subjects, def_choices = getState().createset.def_choices;

									if (!(subs == undefined || subs.length === 0)) {
										context$3$0.next = 3;
										break;
									}

									return context$3$0.abrupt('return', {
										v: undefined
									});

								case 3:
									if (id == null) {
										term = target;
									} else {
										term = getState().createset.items[id].target;
									}
									term = term.toLowerCase().trim();
									subs = subs.join("|").replace(new RegExp(/#/g), "");
									// TODO: Use subjects for filtering
									// &subjects=${subs}
									context$3$0.next = 8;
									return regeneratorRuntime.awrap(_axios2['default'].get(api_url + '/items/?target=' + term).then(function (res) {
										items = res.data.items;
										dispatch({ type: DEF_SUGGESTIONS_SUCCESS, items: items });
									}));

								case 8:
								case 'end':
									return context$3$0.stop();
							}
						}, null, _this12);
					})());

				case 4:
					_ret6 = context$2$0.sent;

					if (!(typeof _ret6 === 'object')) {
						context$2$0.next = 7;
						break;
					}

					return context$2$0.abrupt('return', _ret6.v);

				case 7:
					context$2$0.next = 12;
					break;

				case 9:
					context$2$0.prev = 9;
					context$2$0.t0 = context$2$0['catch'](1);

					dispatch({
						type: DEF_SUGGESTIONS_FAILURE,
						error: Error(context$2$0.t0)
					});

				case 12:
				case 'end':
					return context$2$0.stop();
			}
		}, null, _this13, [[1, 9]]);
	};
}

var CLEAR_DEF_CHOICES = 'CLEAR_DEF_CHOICES';
exports.CLEAR_DEF_CHOICES = CLEAR_DEF_CHOICES;

function clearDefChoices() {
	return {
		type: CLEAR_DEF_CHOICES
	};
}

/*

‘parent_id’: Integer,
‘creator_id’: Integer, **required
‘target_lang_id’: Integer,
‘cue_lang_id’: Integer,
‘target’: String,
‘cue’: String,
‘synonyms’: String,
‘image’: String,
‘message’: String,
‘official’: Boolean,
‘visibility’: String,		‘public’ | ‘private’

*/

var _itemtemplate = {
	parent_id: null,
	creator_id: null,
	targets_lang_id: null,
	cues_lang_id: null,
	target: null,
	cue: null,
	synonyms: null,
	image: null,
	message: null,
	official: false,
	visibility: 'public'
};
var CREATE_ITEM = 'CREATE_ITEM';
exports.CREATE_ITEM = CREATE_ITEM;
var CREATE_ITEM_SUCCESS = 'CREATE_ITEM_SUCCESS';
exports.CREATE_ITEM_SUCCESS = CREATE_ITEM_SUCCESS;
var CREATE_ITEM_FAILURE = 'CREATE_ITEM_FAILURE';
exports.CREATE_ITEM_FAILURE = CREATE_ITEM_FAILURE;

function createItem(index) {
	var _this14 = this;

	for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
		args[_key5 - 1] = arguments[_key5];
	}

	return function callee$1$0(dispatch, getState) {
		var item, user, set, rows, id, association, i, arg, _name4, prop;

		return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					dispatch({ type: CREATE_ITEM });
					context$2$0.prev = 1;
					item = Object.assign({}, _itemtemplate), user = getState().user.user, set = getState().createset.set, rows = getState().createset.rows, id = undefined, association = undefined;

					if (!(set == undefined)) {
						context$2$0.next = 8;
						break;
					}

					context$2$0.next = 6;
					return regeneratorRuntime.awrap(dispatch(createSet()));

				case 6:
					setTimeout(function () {
						dispatch(createItem.apply(undefined, [index].concat(args)));
					}, 5);
					return context$2$0.abrupt('return');

				case 8:

					if (args.length > 0) {
						for (i = 0; i < args.length; i++) {
							arg = args[i], _name4 = arg.name, prop = arg.prop;

							if (_name4 == 'child') {
								association = getState().createset.associations[rows[index]];
								item = Object.assign(_extends({}, item), {
									parent_id: prop.id,
									target: prop.target,
									cue: prop.cue,
									synonyms: prop.synonyms !== null ? prop.synonyms.join("|") : null,
									image: prop.image,
									message: prop.message,
									visibility: prop.visibility
								});
							}
							if (item.hasOwnProperty(_name4)) {
								item[_name4] = prop;
							}
						}
					}
					item.creator_id = user.id;
					context$2$0.next = 12;
					return regeneratorRuntime.awrap(_axios2['default'].post(api_url + '/items/', item).then(function (res) {
						return item = res.data;
					}));

				case 12:
					if (!(association == undefined)) {
						context$2$0.next = 19;
						break;
					}

					context$2$0.next = 15;
					return regeneratorRuntime.awrap(dispatch({ type: CREATE_ITEM_SUCCESS, item: item }));

				case 15:
					context$2$0.next = 17;
					return regeneratorRuntime.awrap(dispatch(createAssociation(item.id, index)));

				case 17:
					context$2$0.next = 21;
					break;

				case 19:
					context$2$0.next = 21;
					return regeneratorRuntime.awrap(dispatch(updateAssociation(association, { name: 'item', prop: item }, { name: 'item_id', prop: item.id })));

				case 21:
					context$2$0.next = 26;
					break;

				case 23:
					context$2$0.prev = 23;
					context$2$0.t0 = context$2$0['catch'](1);

					dispatch({
						type: CREATE_ITEM_FAILURE,
						error: Error(context$2$0.t0)
					});

				case 26:
				case 'end':
					return context$2$0.stop();
			}
		}, null, _this14, [[1, 23]]);
	};
}

// createItem(index, {name: 'child', prop: item}, {name: 'cue', prop: def})

/*

@params:
‘target_lang_id’: Integer,
‘cue_lang_id’: Integer,
‘target’: String,
‘cue’: String,
‘synonyms’: String,
‘image’: String,
‘message’: String,
‘official’: Boolean,
‘visibility’: String, ‘public’ | ‘private’

*/
var UPDATE_ITEM = 'UPDATE_ITEM';
exports.UPDATE_ITEM = UPDATE_ITEM;
var UPDATE_ITEM_SUCCESS = 'UPDATE_ITEM_SUCCESS';
exports.UPDATE_ITEM_SUCCESS = UPDATE_ITEM_SUCCESS;
var UPDATE_ITEM_FAILURE = 'UPDATE_ITEM_FAILURE';
exports.UPDATE_ITEM_FAILURE = UPDATE_ITEM_FAILURE;

function updateItem(_item) {
	var _this15 = this;

	for (var _len6 = arguments.length, args = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
		args[_key6 - 1] = arguments[_key6];
	}

	return function callee$1$0(dispatch, getState) {
		var item, i, arg, _name5, prop;

		return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					dispatch({ type: UPDATE_ITEM });
					context$2$0.prev = 1;
					item = Object.assign({}, _item);

					if (args.length > 0) {
						for (i = 0; i < args.length; i++) {
							arg = args[i], _name5 = arg.name, prop = arg.prop;

							if (item.hasOwnProperty(_name5)) {
								item[_name5] = prop;
							}
						}
					}
					context$2$0.next = 6;
					return regeneratorRuntime.awrap(_axios2['default'].put(api_url + '/items/' + item.id, item).then(function (res) {
						return item = res.data;
					}));

				case 6:
					dispatch({ type: UPDATE_ITEM_SUCCESS, item: item });
					context$2$0.next = 12;
					break;

				case 9:
					context$2$0.prev = 9;
					context$2$0.t0 = context$2$0['catch'](1);

					dispatch({
						type: UPDATE_ITEM_FAILURE,
						error: Error(context$2$0.t0)
					});

				case 12:
				case 'end':
					return context$2$0.stop();
			}
		}, null, _this15, [[1, 9]]);
	};
}

/*
@params:

'set_id':  Integer, **required
'item_id':  Integer, **required
'order':  Integer
‘message’: String,
‘has_image’: Boolean

*/
var _associationtemplate = {
	set_id: null,
	item_id: null,
	order: null,
	message: null,
	has_image: false
};
var CREATE_ASSOCIATION = 'CREATE_ASSOCIATION';
exports.CREATE_ASSOCIATION = CREATE_ASSOCIATION;
var CREATE_ASSOCIATION_SUCCESS = 'CREATE_ASSOCIATION_SUCCESS';
exports.CREATE_ASSOCIATION_SUCCESS = CREATE_ASSOCIATION_SUCCESS;
var CREATE_ASSOCIATION_FAILURE = 'CREATE_ASSOCIATION_FAILURE';
exports.CREATE_ASSOCIATION_FAILURE = CREATE_ASSOCIATION_FAILURE;

function createAssociation(item_id, index) {
	var _this17 = this;

	return function callee$1$0(dispatch, getState) {
		return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
			var _this16 = this;

			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					context$2$0.prev = 0;
					context$2$0.next = 3;
					return regeneratorRuntime.awrap((function callee$2$0() {
						var set_id, count, association;
						return regeneratorRuntime.async(function callee$2$0$(context$3$0) {
							while (1) switch (context$3$0.prev = context$3$0.next) {
								case 0:
									set_id = getState().createset.set.id, count = getState().createset.count, association = undefined;

									association = Object.assign(_extends({}, _associationtemplate), {
										item_id: item_id,
										set_id: set_id,
										order: count
									});
									context$3$0.next = 4;
									return regeneratorRuntime.awrap(_axios2['default'].post(api_url + '/associations/', association).then(function (res) {
										association = res.data;
										dispatch({ type: CREATE_ASSOCIATION_SUCCESS, association: association, index: index });
									}));

								case 4:
								case 'end':
									return context$3$0.stop();
							}
						}, null, _this16);
					})());

				case 3:
					context$2$0.next = 8;
					break;

				case 5:
					context$2$0.prev = 5;
					context$2$0.t0 = context$2$0['catch'](0);

					dispatch({
						type: CREATE_ASSOCIATION_FAILURE,
						error: Error(context$2$0.t0),
						err: context$2$0.t0
					});

				case 8:
				case 'end':
					return context$2$0.stop();
			}
		}, null, _this17, [[0, 5]]);
	};
}

/*
@params: 

'order':  Integer
‘message’: String,
‘has_image’: Boolean

*/
var UPDATE_ASSOCIATION = 'UPDATE_ASSOCIATION';
exports.UPDATE_ASSOCIATION = UPDATE_ASSOCIATION;
var UPDATE_ASSOCIATION_SUCCESS = 'UPDATE_ASSOCIATION_SUCCESS';
exports.UPDATE_ASSOCIATION_SUCCESS = UPDATE_ASSOCIATION_SUCCESS;
var UPDATE_ASSOCIATION_FAILURE = 'UPDATE_ASSOCIATION_FAILURE';
exports.UPDATE_ASSOCIATION_FAILURE = UPDATE_ASSOCIATION_FAILURE;

function updateAssociation(asc) {
	var _this18 = this;

	for (var _len7 = arguments.length, args = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
		args[_key7 - 1] = arguments[_key7];
	}

	return function callee$1$0(dispatch, getState) {
		var association, adopted, i, arg, _name6, prop;

		return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					context$2$0.prev = 0;
					association = Object.assign({}, asc), adopted = false;

					if (args.length > 0) {
						for (i = 0; i < args.length; i++) {
							arg = args[i], _name6 = arg.name, prop = arg.prop;

							if (_name6 == 'item_adopted') {
								adopted = true;
							}
							if (association.hasOwnProperty(_name6)) {
								association[_name6] = prop;
							}
						}
					}
					context$2$0.next = 5;
					return regeneratorRuntime.awrap(_axios2['default'].put(api_url + '/associations/' + association.id, association).then(function (res) {
						return association = res.data;
					}));

				case 5:
					dispatch({ type: UPDATE_ASSOCIATION_SUCCESS, association: association, adopted: adopted });
					context$2$0.next = 11;
					break;

				case 8:
					context$2$0.prev = 8;
					context$2$0.t0 = context$2$0['catch'](0);

					dispatch({
						type: UPDATE_ASSOCIATION_FAILURE,
						error: Error(context$2$0.t0)
					});

				case 11:
				case 'end':
					return context$2$0.stop();
			}
		}, null, _this18, [[0, 8]]);
	};
}

/*/sets/<int: set_id>/associations/reorder	
{ 	
‘associations’: [
				{
		 			‘association_id’: Integer,
					‘order’: Integer
				}, ...
			]
}
*/
var REORDER = 'REORDER';
exports.REORDER = REORDER;
var REORDER_SUCCESS = 'REORDER_SUCCESS';
exports.REORDER_SUCCESS = REORDER_SUCCESS;
var REORDER_FAILURE = 'REORDER_FAILURE';
exports.REORDER_FAILURE = REORDER_FAILURE;

function reorder() {
	var _this19 = this;

	return function callee$1$0(dispatch, getState) {
		var acs, rows, set_id, i;
		return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					dispatch({ type: REORDER });
					context$2$0.prev = 1;
					acs = { associations: [] };
					rows = getState().createset.rows.filter(function (row) {
						return row !== null;
					}), set_id = getState().createset.id;

					for (i = 0; i < rows.length; i++) {
						acs.associations.push({
							id: rows[i],
							order: i + 1
						});
					}
					context$2$0.next = 7;
					return regeneratorRuntime.awrap(_axios2['default'].put(api_url + '/sets/' + set_id + '/associations/reorder', acs));

				case 7:
					context$2$0.next = 12;
					break;

				case 9:
					context$2$0.prev = 9;
					context$2$0.t0 = context$2$0['catch'](1);

					dispatch({
						type: REORDER_FAILURE,
						error: Error(context$2$0.t0)
					});

				case 12:
				case 'end':
					return context$2$0.stop();
			}
		}, null, _this19, [[1, 9]]);
	};
}

var SET_FLAG = 'SET_FLAG';
exports.SET_FLAG = SET_FLAG;

function setFlag(flag) {
	return {
		type: SET_FLAG,
		flag: flag
	};
}

var TITLE_FLAG = 'TITLE_FLAG';
exports.TITLE_FLAG = TITLE_FLAG;

function setTitleFlag(flag) {
	return {
		type: TITLE_FLAG,
		flag: flag
	};
}

var CLEAR_SET = 'CLEAR_SET';
exports.CLEAR_SET = CLEAR_SET;

function clearSet() {
	return function (dispatch, getState) {
		var current_state = getState().createset;
		dispatch({ type: CLEAR_SET });
		if (!_lodash2['default'].isEqual(current_state, current_state)) {
			setTimeout(function () {
				dispatch(clearSet());
			}, 500);
		}
	};
}

var LOADING_SET = 'LOADING_SET';
exports.LOADING_SET = LOADING_SET;

function loadSetFlag() {
	return function (dispatch, getState) {
		dispatch({ type: LOADING_SET });
	};
}

var LOADED_VIEW = 'LOADED_VIEW';
exports.LOADED_VIEW = LOADED_VIEW;

function loadedView() {
	return {
		type: LOADED_VIEW
	};
}

var ADD_ROW = 'ADD_ROW';
exports.ADD_ROW = ADD_ROW;

function addRow() {
	return {
		type: ADD_ROW
	};
}

// /associations/<int: association_id>	
var DELETE_ROW = 'DELETE_ROW';
exports.DELETE_ROW = DELETE_ROW;
var DELETE_ROW_SUCCESS = 'DELETE_ROW_SUCCESS';
exports.DELETE_ROW_SUCCESS = DELETE_ROW_SUCCESS;
var DELETE_ROW_FAILURE = 'DELETE_ROW_FAILURE';
exports.DELETE_ROW_FAILURE = DELETE_ROW_FAILURE;

function deleteRow(index, asc) {
	var _this20 = this;

	return function callee$1$0(dispatch, getState) {
		return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					dispatch({ type: DELETE_ROW });
					context$2$0.prev = 1;

					if (!(asc !== null && asc !== undefined)) {
						context$2$0.next = 7;
						break;
					}

					context$2$0.next = 5;
					return regeneratorRuntime.awrap(_axios2['default']['delete'](api_url + '/associations/' + asc.id).then(function () {
						dispatch({ type: DELETE_ROW_SUCCESS, index: index, asc: asc });
					}));

				case 5:
					context$2$0.next = 8;
					break;

				case 7:
					dispatch({ type: DELETE_ROW_SUCCESS, index: index, asc: asc });

				case 8:
					context$2$0.next = 13;
					break;

				case 10:
					context$2$0.prev = 10;
					context$2$0.t0 = context$2$0['catch'](1);

					dispatch({
						type: DELETE_ROW_FAILURE,
						error: Error(context$2$0.t0)
					});

				case 13:
				case 'end':
					return context$2$0.stop();
			}
		}, null, _this20, [[1, 10]]);
	};
}

var FINISHED_RENDERING = 'FINISHED_RENDERING';
exports.FINISHED_RENDERING = FINISHED_RENDERING;

function finishedRendering() {
	return {
		type: FINISHED_RENDERING
	};
}

var UNMOUNTING_CREATE = 'UNMOUNTING_CREATE';
exports.UNMOUNTING_CREATE = UNMOUNTING_CREATE;

function unMountingCreate() {
	return function (dispatch, getState) {
		dispatch({ type: UNMOUNTING_CREATE });
	};
}

var SAVE_TITLE = 'SAVE_TITLE';
exports.SAVE_TITLE = SAVE_TITLE;

function saveTitle(title) {
	return {
		type: SAVE_TITLE,
		title: title
	};
}

function savePurpose(purpose) {
	return {
		type: SAVE_PURPOSE,
		purpose: purpose
	};
}

var RESIZE = 'RESIZE';
exports.RESIZE = RESIZE;

function resize() {
	return {
		type: RESIZE
	};
}

// TODO: check the method its being called whether from create page or copy

// if(item.target !== null) {
// 	await dispatch(getDefSuggestions(null, item.target))
// }

//# sourceMappingURL=createset-compiled.js.map