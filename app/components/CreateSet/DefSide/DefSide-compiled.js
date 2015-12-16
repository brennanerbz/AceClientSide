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

var _AutocompleteAutocomplete = require('../Autocomplete/Autocomplete');

var _AutocompleteAutocomplete2 = _interopRequireDefault(_AutocompleteAutocomplete);

var _AutocompleteUtils = require('../Autocomplete/Utils');

var _components = {
	_$DefSide: {
		displayName: 'DefSide'
	}
};

var _reactComponentWrapper = (0, _reactTransformCatchErrors3['default'])({
	filename: '/Users/brennanerbeznik/Dropbox/FrontEnd/app/components/CreateSet/DefSide/DefSide.js',
	components: _components,
	locals: [module],
	imports: [_react, _redboxReact]
});

var _reactComponentWrapper2 = (0, _reactTransformHmr3['default'])({
	filename: '/Users/brennanerbeznik/Dropbox/FrontEnd/app/components/CreateSet/DefSide/DefSide.js',
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

var DefSide = (function (_Component) {
	_inherits(DefSide, _Component);

	_createClass(DefSide, null, [{
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

	function DefSide(props) {
		var _this = this;

		_classCallCheck(this, _DefSide);

		_get(Object.getPrototypeOf(_DefSide.prototype), 'constructor', this).call(this, props);

		this.handleClick = function () {};

		this.switchToDef = function () {
			var _props = _this.props;
			var activeSide = _props.activeSide;
			var flipActiveSide = _props.flipActiveSide;

			if (activeSide === 'word') {
				flipActiveSide();
			}
		};

		this.autoFocus = function () {
			var index = _this.props.index;

			_this.refs['autocomplete' + index].focusSide();
		};

		this.state = {
			defs: [],
			loading: false
		};
	}

	_createClass(DefSide, [{
		key: 'render',
		value: function render() {
			var _props2 = this.props;
			var index = _props2.index;
			var def_choices = _props2.def_choices;
			var getDefSuggestions = _props2.getDefSuggestions;
			var updateAssociation = _props2.updateAssociation;
			var item = _props2.item;
			var association = _props2.association;
			var subjects = _props2.subjects;

			// console.log(item.cue)
			return _react2['default'].createElement(
				'div',
				{ className: 'DefSide' },
				_react2['default'].createElement(
					'div',
					{ className: 'DefSide-textarea' },
					_react2['default'].createElement(_AutocompleteAutocomplete2['default'], _extends({}, this.props, {
						// debug={true}
						switchToDef: this.switchToDef,
						className: 'AutoExpandTextArea-textarea',
						ref: 'autocomplete' + index
						// items={def_choices !== undefined ? def_choices : []}
						// getItemValue={(_item) => _item.cue}
						// onSelect={(value, _item) => {
						//    this.setState({ defs: [ _item.cue ]})
						//    updateAssociation(association,
						//    				  {name: 'item', prop: _item},
						//    				  {name: 'item_id', prop: _item.id },
						//    				  {name: 'item_adopted', prop: true})
						// }}
						// onInput={(event, value) => value}
						//       onFocus={(event, value) => {
						//          if(subjects !== undefined && subjects.length > 0 && item !== null) {
						// 	this.setState({loading: true})
						// 	getDefSuggestions(item.id)
						// 	setTimeout(() => {
						// 		getDefSuggestions(item.id)
						// 	}, 250)
						// }
						//        }}
						// renderItem={(_item, isHighlighted, index) => (
						//    <div
						//      className={classnames({ 'first_item': index == 0 })}
						//      style={isHighlighted ? styles.highlightedItem : styles.item}
						//      key={_item.abbr}
						//      id={_item.abbr}>
						//      {_item.cue}
						//    </div>
						//  )}					         
					}))
				)
			);
		}
	}]);

	var _DefSide = DefSide;
	DefSide = _wrapComponent('_$DefSide')(DefSide) || DefSide;
	return DefSide;
})(_react.Component);

exports['default'] = DefSide;
module.exports = exports['default'];

//# sourceMappingURL=DefSide-compiled.js.map