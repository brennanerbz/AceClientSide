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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _AutoexpandTextareaAutoexpandTextarea = require('../AutoexpandTextarea/AutoexpandTextarea');

var _AutoexpandTextareaAutoexpandTextarea2 = _interopRequireDefault(_AutoexpandTextareaAutoexpandTextarea);

var _AutocompleteAutocomplete = require('../Autocomplete/Autocomplete');

var _AutocompleteAutocomplete2 = _interopRequireDefault(_AutocompleteAutocomplete);

var _AutocompleteUtils = require('../Autocomplete/Utils');

var _components = {
	_$WordSide: {
		displayName: 'WordSide'
	}
};

var _reactComponentWrapper = (0, _reactTransformCatchErrors3['default'])({
	filename: '/Users/brennanerbeznik/Dropbox/FrontEnd/app/components/CreateSet/WordSide/WordSide.js',
	components: _components,
	locals: [module],
	imports: [_react, _redboxReact]
});

var _reactComponentWrapper2 = (0, _reactTransformHmr3['default'])({
	filename: '/Users/brennanerbeznik/Dropbox/FrontEnd/app/components/CreateSet/WordSide/WordSide.js',
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

require('../Autocomplete/Autocomplete.scss');

var WordSide = (function (_Component) {
	_inherits(WordSide, _Component);

	_createClass(WordSide, null, [{
		key: 'propTypes',
		value: {
			onBlur: _react.PropTypes.func,
			onChange: _react.PropTypes.func,
			onFocus: _react.PropTypes.func,
			flipActiveSide: _react.PropTypes.func,
			placeholder: _react.PropTypes.string,
			activeSide: _react.PropTypes.string
		},
		enumerable: true
	}]);

	function WordSide(props) {
		var _this = this;

		_classCallCheck(this, _WordSide);

		_get(Object.getPrototypeOf(_WordSide.prototype), 'constructor', this).call(this, props);

		this.switchToWord = function () {
			var _props = _this.props;
			var activeSide = _props.activeSide;
			var flipActiveSide = _props.flipActiveSide;

			if (activeSide === 'def') {
				flipActiveSide();
			}
		};

		this.autoFocus = function () {
			var index = _this.props.index;

			_this.refs['autocomplete' + index].focusSide();
		};

		this.state = {
			terms: [],
			loading: false
		};
	}

	_createClass(WordSide, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props2 = this.props;
			var index = _props2.index;
			var asc_id = _props2.asc_id;
			var item = _props2.item;
			var term_choices = _props2.term_choices;
			var subjects = _props2.subjects;
			var getTermSuggestions = _props2.getTermSuggestions;

			return _react2['default'].createElement(
				'div',
				{ className: 'WordSide' },
				_react2['default'].createElement(
					'div',
					{ className: 'WordSide-textarea' },
					_react2['default'].createElement(
						'div',
						{ className: 'AutoExpandTextArea' },
						_react2['default'].createElement(
							'div',
							{ className: 'AutoExpandTextArea-wrapper' },
							_react2['default'].createElement(_AutocompleteAutocomplete2['default'], _extends({}, this.props, {
								switchToWord: this.switchToWord,
								className: 'AutoExpandTextArea-textarea',
								ref: 'autocomplete' + index,
								items: term_choices !== undefined ? term_choices : [],
								getItemValue: function (item) {
									return item;
								},
								onSelect: function (value, item) {
									_this2.setState({ terms: [item] });
								},
								onInput: function (event, value) {
									if (subjects !== undefined && subjects.length > 0) {
										_this2.setState({ loading: true });
										getTermSuggestions(value, function (items) {
											_this2.setState({ terms: items, loading: false });
										});
									}
								},
								renderItem: function (term, isHighlighted, index) {
									return _react2['default'].createElement(
										'div',
										{
											className: (0, _classnames2['default'])({ 'first_item': index == 0 }),
											style: isHighlighted ? _AutocompleteUtils.styles.highlightedItem : _AutocompleteUtils.styles.item,
											key: term.abbr,
											id: term.abbr
										},
										term
									);
								}
							}))
						)
					)
				)
			);
		}
	}]);

	var _WordSide = WordSide;
	WordSide = _wrapComponent('_$WordSide')(WordSide) || WordSide;
	return WordSide;
})(_react.Component);

exports['default'] = WordSide;
module.exports = exports['default'];

//# sourceMappingURL=WordSide-compiled.js.map