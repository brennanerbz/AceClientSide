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

var _TermContentTermContent = require('../TermContent/TermContent');

var _TermContentTermContent2 = _interopRequireDefault(_TermContentTermContent);

var _components = {
	_$TermRow: {
		displayName: 'TermRow'
	}
};

var _reactComponentWrapper = (0, _reactTransformCatchErrors3['default'])({
	filename: '/Users/brennanerbeznik/Dropbox/FrontEnd/app/components/CreateSet/TermRow/TermRow.js',
	components: _components,
	locals: [module],
	imports: [_react, _redboxReact]
});

var _reactComponentWrapper2 = (0, _reactTransformHmr3['default'])({
	filename: '/Users/brennanerbeznik/Dropbox/FrontEnd/app/components/CreateSet/TermRow/TermRow.js',
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

var TermRow = (function (_Component) {
	_inherits(TermRow, _Component);

	function TermRow() {
		var _this = this;

		_classCallCheck(this, _TermRow);

		_get(Object.getPrototypeOf(_TermRow.prototype), 'constructor', this).apply(this, arguments);

		this.state = {
			is_mouse_over: false,
			active_row: false,
			active_side: 0, /* 0 = 'term' & 1 = 'definition' */
			total_count: 2,
			terms: null,
			definitions: null,
			index: null
		};

		this.saveTerm = function (term) {
			var _props = _this.props;
			var createItem = _props.createItem;
			var updateItem = _props.updateItem;
			var index = _props.index;
			var item = _props.item;
			var association = _props.association;

			if (item == null && term !== null) {
				if (term.length > 0) {
					createItem(index, { name: 'target', prop: term });
					return;
				}
			}
			if (item !== null && item.target !== undefined) {
				if (item.target == null || item.target !== null && item.target.toLowerCase().trim() !== term.toLowerCase().trim() && item.finalized == null) {
					updateItem(item, { name: 'target', prop: term });
					return;
				}
				if (item.target !== null && item.target.toLowerCase().trim() !== term.toLowerCase().trim() && item.finalized) {
					createItem(index, { name: 'child', prop: item }, { name: 'target', prop: term });
				}
			}
		};

		this.saveDefinition = function (def) {
			var _props2 = _this.props;
			var createItem = _props2.createItem;
			var updateItem = _props2.updateItem;
			var index = _props2.index;
			var item = _props2.item;
			var association = _props2.association;

			if (item == null && def !== null) {
				if (def.length > 0 && def !== null) {
					createItem(index, { name: 'cue', prop: def });
					return;
				}
			}
			if (item !== null && item.cue !== undefined) {
				if (item.cue == null || item.cue !== null && item.cue.toLowerCase().trim() !== def.toLowerCase().trim() && item.finalized == null) {
					updateItem(item, { name: 'cue', prop: def });
					return;
				}
				if (item.cue !== null && item.cue.toLowerCase().trim() !== def.toLowerCase().trim() && item.finalized) {
					createItem(index, { name: 'child', prop: item }, { name: 'cue', prop: def });
				}
			}
		};

		this.handleDelete = function () {
			_this.props.deleteRow(_this.props.index, _this.props.association);
		};
	}

	_createClass(TermRow, [{
		key: 'sparkNewRow',
		value: function sparkNewRow(index, total_count) {
			if (this.state.total_count !== total_count && index == total_count - 1) {
				this.setState({
					active_row: true,
					active_side: 0
				});
			}
		}
	}, {
		key: 'componentWillMount',
		value: function componentWillMount() {
			var _props3 = this.props;
			var association = _props3.association;
			var item = _props3.item;
			var index = _props3.index;
			var total_count = _props3.total_count;
			var able_to_spark = _props3.able_to_spark;

			this.setState({
				index: index,
				total_count: total_count
			});
			if (total_count > 2 && able_to_spark) {
				this.sparkNewRow(index, total_count);
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (document.activeElement == document.body) this.setState({ active_row: false });
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			return _react2['default'].createElement(
				'div',
				{ className: 'TermRow',
					onMouseOver: function () {
						return _this2.setState({ is_mouse_over: true });
					},
					onMouseLeave: function () {
						return _this2.setState({ is_mouse_over: false });
					} },
				_react2['default'].createElement(
					'a',
					{ className: 'TermRow-counter' },
					this.state.index + 1
				),
				_react2['default'].createElement(_TermContentTermContent2['default'], { className: 'TermRow-content',
					item: this.props.item,
					index: this.props.index,
					total_count: this.props.total_count,
					active_row: this.state.active_row,
					active_side: this.state.active_side,
					activateRow: function () {
						return _this2.setState({ active_row: true });
					},
					deactivateRow: function () {
						return _this2.setState({ active_row: false });
					},
					focusSide: function (value) {
						return _this2.setState({ active_side: value });
					},
					saveTerm: this.saveTerm,
					saveDefinition: this.saveDefinition,
					addRow: this.props.addRow,
					resizing: this.props.resizing,
					rendered: this.props.rendered,
					finishedRendering: this.props.finishedRendering
				}),
				_react2['default'].createElement(
					'div',
					{ className: 'TermRow-operations' },
					this.state.is_mouse_over && this.props.total_count > 2 && _react2['default'].createElement(
						'a',
						{ className: 'TermRow-control material-icons',
							onClick: this.handleDelete },
						'clear'
					)
				)
			);
		}
	}], [{
		key: 'propTypes',
		value: {},
		enumerable: true
	}]);

	var _TermRow = TermRow;
	TermRow = _wrapComponent('_$TermRow')(TermRow) || TermRow;
	return TermRow;
})(_react.Component);

exports['default'] = TermRow;
module.exports = exports['default'];

/* TODO: Fill in propTypes */

//# sourceMappingURL=TermRow-compiled.js.map