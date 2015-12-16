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

var _SignPosts = require('./SignPosts');

var _SignPosts2 = _interopRequireDefault(_SignPosts);

var _components = {
	_$SeqControl: {
		displayName: 'SeqControl'
	}
};

var _reactComponentWrapper = (0, _reactTransformCatchErrors3['default'])({
	filename: '/Users/brennanerbeznik/Dropbox/FrontEnd/app/components/Learn/LearnSeqControl/SeqControl.js',
	components: _components,
	locals: [module],
	imports: [_react, _redboxReact]
});

var _reactComponentWrapper2 = (0, _reactTransformHmr3['default'])({
	filename: '/Users/brennanerbeznik/Dropbox/FrontEnd/app/components/Learn/LearnSeqControl/SeqControl.js',
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

require('./SeqControl.scss');

var SeqControl = (function (_Component) {
	_inherits(SeqControl, _Component);

	function SeqControl() {
		_classCallCheck(this, _SeqControl);

		_get(Object.getPrototypeOf(_SeqControl.prototype), 'constructor', this).apply(this, arguments);

		this.resizeSideNav = function () {
			$('.seq_control').height($(window).height() - 50);
		};
	}

	// <input id="term_first" type="checkbox" className="term_first"/>
	// <label className="label_term_first">See Term first</label>

	_createClass(SeqControl, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			$('.seq_control').height($(window).height() - 50);
			window.addEventListener('resize', this.resizeSideNav);
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps) {
			return !nextProps.isShowingCompletedRound;
		}
	}, {
		key: 'render',
		value: function render() {
			var _this = this;

			var round_index = this.props.round_index;

			return _react2['default'].createElement(
				'div',
				{ className: 'seq_control' },
				_react2['default'].createElement(
					'div',
					{ className: 'round_divider' },
					_react2['default'].createElement('hr', { className: 'separator' }),
					_react2['default'].createElement('i', { className: 'copy_only' }),
					_react2['default'].createElement(
						'div',
						{ className: 'round_divider_label' },
						'Round ',
						round_index
					)
				),
				_react2['default'].createElement(_SignPosts2['default'], this.props),
				_react2['default'].createElement(
					'span',
					{ className: '' },
					_react2['default'].createElement(
						'button',
						{ className: 'button button-outline startover_btn',
							type: 'button',
							onClick: function () {
								_this.props.newSequence(null);
							}
						},
						'Start over'
					)
				)
			);
		}
	}], [{
		key: 'propTypes',
		value: {},
		enumerable: true
	}]);

	var _SeqControl = SeqControl;
	SeqControl = _wrapComponent('_$SeqControl')(SeqControl) || SeqControl;
	return SeqControl;
})(_react.Component);

exports['default'] = SeqControl;
module.exports = exports['default'];

//# sourceMappingURL=SeqControl-compiled.js.map