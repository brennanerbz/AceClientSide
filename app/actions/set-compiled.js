'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.fetchSet = fetchSet;
exports.fetchAssociations = fetchAssociations;
exports.fetchAssignment = fetchAssignment;
exports.updateAssignent = updateAssignent;
exports.clearSetView = clearSetView;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _keyMirror = require('key-mirror');

var _keyMirror2 = _interopRequireDefault(_keyMirror);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var api_url = 'http://127.0.0.1:5000/webapi/v2.0';

/*
@params set_id 
*/
var REQUEST_SET = 'REQUEST_SET';
exports.REQUEST_SET = REQUEST_SET;
var RECEIVE_SET_SUCCESS = 'RECEIVE_SET_SUCCESS';
exports.RECEIVE_SET_SUCCESS = RECEIVE_SET_SUCCESS;
var RECEIVE_SET_FAILURE = 'RECEIVE_SET_FAILURE';
exports.RECEIVE_SET_FAILURE = RECEIVE_SET_FAILURE;
var RECEIVE_ASSIGNMENTS_SUCCESS = 'RECEIVE_ASSIGNMENTS_SUCCESS';
exports.RECEIVE_ASSIGNMENTS_SUCCESS = RECEIVE_ASSIGNMENTS_SUCCESS;

function fetchSet(set_id) {
	return function (dispatch, getState) {
		if (getState().sets.isFetchingAssignments || getState().user.isFetchingUser) {
			setTimeout(function () {
				dispatch(fetchSet(set_id));
			}, 5);
			return;
		}
		dispatch({ type: REQUEST_SET });
		var set = undefined,
		    user = getState().user.user;
		_axios2['default'].get(api_url + '/sets/' + set_id).then(function (res) {
			set = res.data;
			dispatch({
				type: RECEIVE_SET_SUCCESS,
				set: set
			});
		})['catch'](function (err) {
			dispatch({
				type: RECEIVE_SET_FAILURE,
				error: Error(err),
				err: err
			});
		});
	};
}

/*
@params set_id
GET /sets/<id>/associations/?start=0&end=99
*/
var REQUEST_ASSOCIATIONS = 'REQUEST_ASSOCIATIONS';
exports.REQUEST_ASSOCIATIONS = REQUEST_ASSOCIATIONS;
var RECEIVE_ASSOCIATIONS_SUCCESS = 'RECEIVE_ASSOCIATIONS_SUCCESS';
exports.RECEIVE_ASSOCIATIONS_SUCCESS = RECEIVE_ASSOCIATIONS_SUCCESS;
var RECEIVE_ASSOCIATIONS_FAILURE = 'RECEIVE_ASSOCIATIONS_FAILURE';
exports.RECEIVE_ASSOCIATIONS_FAILURE = RECEIVE_ASSOCIATIONS_FAILURE;

function fetchAssociations(set_id) {
	return function (dispatch, getState) {
		dispatch({ type: REQUEST_ASSOCIATIONS });
		var associations = undefined;
		_axios2['default'].get(api_url + '/sets/' + set_id + '/associations/?start=' + 0 + '&end=' + 99).then(function (res) {
			associations = res.data.associations;
			dispatch({
				type: RECEIVE_ASSOCIATIONS_SUCCESS,
				associations: associations
			});
		})['catch'](function (err) {
			dispatch({
				type: RECEIVE_ASSOCIATIONS_FAILURE,
				error: Error(err),
				err: err
			});
		});
	};
}

/*
@params assignment_id
*/
var REQUEST_ASSIGNMENT = 'REQUEST_ASSIGNMENT';
exports.REQUEST_ASSIGNMENT = REQUEST_ASSIGNMENT;
var RECEIVE_ASSIGNMENT_SUCCESS = 'RECEIVE_ASSIGNMENT_SUCCESS';
exports.RECEIVE_ASSIGNMENT_SUCCESS = RECEIVE_ASSIGNMENT_SUCCESS;
var RECEIVE_ASSIGNMENT_FAILURE = 'RECEIVE_ASSIGNMENT_FAILURE';
exports.RECEIVE_ASSIGNMENT_FAILURE = RECEIVE_ASSIGNMENT_FAILURE;
var HAS_NOT_STUDIED = 'HAS_NOT_STUDIED';
exports.HAS_NOT_STUDIED = HAS_NOT_STUDIED;

function fetchAssignment(id) {
	var _this = this;

	return function callee$1$0(dispatch, getState) {
		var assignment;
		return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					dispatch({ type: REQUEST_ASSIGNMENT });
					context$2$0.prev = 1;
					assignment = undefined;
					context$2$0.next = 5;
					return regeneratorRuntime.awrap(_axios2['default'].get(api_url + '/assignments/' + id).then(function (res) {
						return assignment = res.data;
					}));

				case 5:
					console.log(assignment);
					dispatch({ type: RECEIVE_ASSIGNMENT_SUCCESS, assignment: assignment });
					context$2$0.next = 12;
					break;

				case 9:
					context$2$0.prev = 9;
					context$2$0.t0 = context$2$0['catch'](1);

					dispatch({
						type: RECEIVE_ASSIGNMENT_FAILURE,
						error: Error(context$2$0.t0)
					});

				case 12:
				case 'end':
					return context$2$0.stop();
			}
		}, null, _this, [[1, 9]]);
	};
}

/*
@params user_id, set_id
*/
var UPDATE_ASSIGNMENT_SUCCESS = 'UPDATE_ASSIGNMENT_SUCCESS';
exports.UPDATE_ASSIGNMENT_SUCCESS = UPDATE_ASSIGNMENT_SUCCESS;
var UPDATE_ASSIGNMENT_FAILURE = 'UPDATE_ASSIGNMENT_FAILURE';
exports.UPDATE_ASSIGNMENT_FAILURE = UPDATE_ASSIGNMENT_FAILURE;

function updateAssignent(id) {
	var _this2 = this;

	return function callee$1$0(dispatch, getState) {
		return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					context$2$0.prev = 0;
					context$2$0.next = 3;
					return regeneratorRuntime.awrap(_axios2['default'].put(api_url + '/assignments' + id).then(function (res) {
						var new_assignment = res.data;
						console.log("new_assignment");
						console.log(new_assignment);
						dispatch({ type: UPDATE_ASSIGNMENT_SUCCESS, new_assignment: new_assignment });
					}));

				case 3:
					context$2$0.next = 8;
					break;

				case 5:
					context$2$0.prev = 5;
					context$2$0.t0 = context$2$0['catch'](0);

					dispatch({
						type: UPDATE_ASSIGNMENT_FAILURE,
						error: Error(context$2$0.t0)
					});

				case 8:
				case 'end':
					return context$2$0.stop();
			}
		}, null, _this2, [[0, 5]]);
	};
}

var CLEAR_SETVIEW = 'CLEAR_SETVIEW';
exports.CLEAR_SETVIEW = CLEAR_SETVIEW;

function clearSetView() {
	return {
		type: CLEAR_SETVIEW
	};
}

//# sourceMappingURL=set-compiled.js.map