'use strict';

var _reactTransformCatchErrors2 = require('react-transform-catch-errors');

var _reactTransformCatchErrors3 = _interopRequireDefault(_reactTransformCatchErrors2);

var _react = require('react');

var _redboxReact = require('redbox-react');

var _reactTransformHmr2 = require('react-transform-hmr');

var _reactTransformHmr3 = _interopRequireDefault(_reactTransformHmr2);

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _components = {
	_$SignPosts: {
		displayName: 'SignPosts'
	}
};

var _reactComponentWrapper = (0, _reactTransformCatchErrors3['default'])({
	filename: '/Users/brennanerbeznik/Dropbox/FrontEnd/app/components/Learn/LearnSeqControl/SignPosts.js',
	components: _components,
	locals: [module],
	imports: [_react, _redboxReact]
});

var _reactComponentWrapper2 = (0, _reactTransformHmr3['default'])({
	filename: '/Users/brennanerbeznik/Dropbox/FrontEnd/app/components/Learn/LearnSeqControl/SignPosts.js',
	components: _components,
	locals: [module],
	imports: [_react]
});

function _wrapComponent(uniqueId) {
	return function (ReactClass) {
		return _reactComponentWrapper2(_reactComponentWrapper(ReactClass, uniqueId), uniqueId);
	};
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var SignPosts = (function (_Component) {
	_inherits(SignPosts, _Component);

	function SignPosts() {
		_classCallCheck(this, _SignPosts);

		_get(Object.getPrototypeOf(_SignPosts.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(SignPosts, [{
		key: 'render',

		// shouldComponentUpdate(nextProps) {
		// 	return !!nextProps.isShowingCompletedRound
		// }

		value: function render() {
			var _props = this.props;
			var current_slot = _props.current_slot;
			var slots = _props.slots;
			var slot_index = _props.slot_index;
			var current_round = _props.current_round;
			var isUpdatingState = _props.isUpdatingState;
			var count = current_round !== undefined ? current_round.length : 0;
			var signs = Array.apply(null, Array(count)).map(function (x, i) {
				var className = (0, _classnames2['default'])('material-icons md-18 sign_circle', { 'active_sign': slot_index === i }, { 'complete_sign': current_round !== undefined ? current_round[i].completed : null });
				return _react2['default'].createElement(
					'li',
					{ key: i, className: 'sign_post_item' },
					_react2['default'].createElement(
						'i',
						{ className: className },
						'brightness_1'
					)
				);
			});
			return _react2['default'].createElement(
				'ul',
				{ className: 'sign_posting_list' },
				signs
			);
		}
	}], [{
		key: 'propTypes',
		value: {},
		enumerable: true
	}]);

	var _SignPosts = SignPosts;
	SignPosts = _wrapComponent('_$SignPosts')(SignPosts) || SignPosts;
	return SignPosts;
})(_react.Component);

exports['default'] = SignPosts;
module.exports = exports['default'];

//# sourceMappingURL=SignPosts-compiled.js.map