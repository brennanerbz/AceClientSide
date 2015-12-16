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

var _TermRowTermRow = require('../TermRow/TermRow');

var _TermRowTermRow2 = _interopRequireDefault(_TermRowTermRow);

var _components = {
	_$TermRows: {
		displayName: 'TermRows'
	}
};

var _reactComponentWrapper = (0, _reactTransformCatchErrors3['default'])({
	filename: '/Users/brennanerbeznik/Dropbox/FrontEnd/app/components/CreateSet/TermRows/TermRows.js',
	components: _components,
	locals: [module],
	imports: [_react, _redboxReact]
});

var _reactComponentWrapper2 = (0, _reactTransformHmr3['default'])({
	filename: '/Users/brennanerbeznik/Dropbox/FrontEnd/app/components/CreateSet/TermRows/TermRows.js',
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

var TermRows = (function (_Component) {
	_inherits(TermRows, _Component);

	function TermRows() {
		var _this = this;

		_classCallCheck(this, _TermRows);

		_get(Object.getPrototypeOf(_TermRows.prototype), 'constructor', this).apply(this, arguments);

		this.componentDidMount = function () {
			window.addEventListener('resize', _this.handleResize);
		};

		this.componentWillUnmount = function () {
			window.removeEventListener('resize', _this.handleResize);
		};

		this.componentDidUpdate = function (prevProps, prevState) {
			var row_length = _this.props.row_length;

			if (prevProps.row_length < row_length) _this.scrollToBottom();
		};

		this.handleResize = function () {
			_this.props.resize();
		};

		this.scrollToBottom = function () {
			var node = document.body;
			node.scrollTop = node.scrollHeight;
		};
	}

	_createClass(TermRows, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props;
			var rows = _props.rows;
			var associations = _props.associations;
			var items = _props.items;

			return _react2['default'].createElement(
				'div',
				{ className: 'TermRows',
					ref: 'term_rows' },
				_react2['default'].createElement(
					'div',
					{ className: 'TermRow' },
					_react2['default'].createElement(
						'div',
						{ className: 'TermRow-content row-labels' },
						_react2['default'].createElement(
							'div',
							{ className: 'TermContent' },
							_react2['default'].createElement(
								'div',
								{ className: 'TermContent-wrap' },
								_react2['default'].createElement(
									'div',
									{ className: 'TermContent-side word-side' },
									_react2['default'].createElement(
										'p',
										null,
										'Terms'
									)
								),
								_react2['default'].createElement(
									'div',
									{ className: 'TermContent-side def-side' },
									_react2['default'].createElement(
										'p',
										null,
										'Definitions'
									)
								)
							)
						)
					)
				),
				rows.map(function (id, i) {
					var association = undefined,
					    item = undefined;

					association = id !== null && associations !== undefined ? associations[id] : null, item = association !== null && items !== undefined ? items[association.item_id] : null;

					return _react2['default'].createElement(_TermRowTermRow2['default'], {
						asc_id: id,
						ref: 'row' + i,
						total_count: _this2.props.row_length,
						index: i,
						key: 'row' + i,
						id: _this2.props.id,
						association: association,
						item: item,
						rows: _this2.props.rows,
						createItem: _this2.props.createItem,
						updateItem: _this2.props.updateItem,
						deleteRow: _this2.props.deleteRow,
						addRow: _this2.props.addRow,
						resizing: _this2.props.resizing,
						editing: _this2.props.editing,
						able_to_spark: _this2.props.able_to_spark,
						rendered: _this2.props.rendered,
						finishedRendering: _this2.props.finishedRendering
					});
				}),
				_react2['default'].createElement(
					'div',
					{ className: 'TermRow add_row',
						ref: 'add_row',
						onClick: function () {
							return _this2.props.addRow();
						},
						title: 'Add a row' },
					_react2['default'].createElement(
						'span',
						{ className: 'add_icon' },
						'+'
					)
				)
			);
		}
	}], [{
		key: 'propTypes',
		value: {
			dispatch: _react.PropTypes.func,
			addRow: _react.PropTypes.func,
			resize: _react.PropTypes.func,
			adjustScroll: _react.PropTypes.func
		},
		enumerable: true
	}]);

	var _TermRows = TermRows;
	TermRows = _wrapComponent('_$TermRows')(TermRows) || TermRows;
	return TermRows;
})(_react.Component);

exports['default'] = TermRows;
module.exports = exports['default'];

//# sourceMappingURL=TermRows-compiled.js.map