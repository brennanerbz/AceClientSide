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

var _components = {
	_$SequenceSummary: {
		displayName: 'SequenceSummary'
	}
};

var _reactComponentWrapper = (0, _reactTransformCatchErrors3['default'])({
	filename: '/Users/brennanerbeznik/Dropbox/FrontEnd/app/components/Learn/SequenceSummary/SequenceSummary.js',
	components: _components,
	locals: [module],
	imports: [_react, _redboxReact]
});

var _reactComponentWrapper2 = (0, _reactTransformHmr3['default'])({
	filename: '/Users/brennanerbeznik/Dropbox/FrontEnd/app/components/Learn/SequenceSummary/SequenceSummary.js',
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

require('../RoundSummary/RoundSummary.scss');

var SequenceSummary = (function (_Component) {
	_inherits(SequenceSummary, _Component);

	function SequenceSummary() {
		_classCallCheck(this, _SequenceSummary);

		_get(Object.getPrototypeOf(_SequenceSummary.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(SequenceSummary, [{
		key: 'render',
		value: function render() {
			var _this = this;

			var slots = this.props.slots;

			console.log(slots);
			return _react2['default'].createElement(
				'div',
				{ className: 'summary' },
				_react2['default'].createElement(
					'h3',
					{ className: 'summary_header' },
					'Overall Progress'
				),
				_react2['default'].createElement(
					'table',
					{ className: 'summary_table' },
					_react2['default'].createElement(
						'tbody',
						null,
						_react2['default'].createElement(
							'tr',
							{ className: 'recall_row' },
							_react2['default'].createElement(
								'td',
								{ className: 'recall row_label' },
								'Define'
							),
							_react2['default'].createElement(
								'td',
								{ className: 'count' },
								slots.filter(function (slot) {
									return slot.format == 'recall';
								}).length,
								' / ',
								slots.length
							),
							_react2['default'].createElement(
								'td',
								{ className: 'percent' },
								slots.filter(function (slot) {
									return slot.format == 'recall';
								}).length / slots.length / 100 * 10000,
								' %'
							)
						),
						_react2['default'].createElement(
							'tr',
							{ className: 'mc_row' },
							_react2['default'].createElement(
								'td',
								{ className: 'mc row_label' },
								'Multiple Choice'
							),
							_react2['default'].createElement(
								'td',
								{ className: 'count' },
								slots.filter(function (slot) {
									return slot.format == 'mc';
								}).length,
								' / ',
								slots.length
							),
							_react2['default'].createElement(
								'td',
								{ className: 'percent' },
								slots.filter(function (slot) {
									return slot.format == 'mc';
								}).length / slots.length / 100 * 10000,
								' %'
							)
						),
						_react2['default'].createElement(
							'tr',
							{ className: 'fb_row' },
							_react2['default'].createElement(
								'td',
								{ className: 'fb row_label' },
								'Fill in the Blank'
							),
							_react2['default'].createElement(
								'td',
								{ className: 'count' },
								slots.filter(function (slot) {
									return slot.format == 'stem';
								}).length,
								' / ',
								slots.length
							),
							_react2['default'].createElement(
								'td',
								{ className: 'percent' },
								slots.filter(function (slot) {
									return slot.format == 'stem';
								}).length / slots.length / 100 * 10000,
								' %'
							)
						),
						_react2['default'].createElement(
							'tr',
							{ className: 'copy_row' },
							_react2['default'].createElement(
								'td',
								{ className: 'copy row_label' },
								'Copy Answer'
							),
							_react2['default'].createElement(
								'td',
								{ className: 'count' },
								slots.filter(function (slot) {
									return slot.format == 'copy';
								}).length,
								' / ',
								slots.length
							),
							_react2['default'].createElement(
								'td',
								{ className: 'percent' },
								slots.filter(function (slot) {
									return slot.format == 'copy';
								}).length / slots.length / 100 * 10000,
								' %'
							)
						)
					)
				),
				_react2['default'].createElement(
					'button',
					{ className: 'button button-primary',
						onClick: function () {
							return _this.props.newSequence(null);
						} },
					'Start new sequence'
				)
			);
		}
	}], [{
		key: 'propTypes',
		value: {},
		enumerable: true
	}]);

	var _SequenceSummary = SequenceSummary;
	SequenceSummary = _wrapComponent('_$SequenceSummary')(SequenceSummary) || SequenceSummary;
	return SequenceSummary;
})(_react.Component);

exports['default'] = SequenceSummary;
module.exports = exports['default'];

//# sourceMappingURL=SequenceSummary-compiled.js.map