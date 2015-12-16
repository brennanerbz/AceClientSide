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
    _$TermContent: {
        displayName: 'TermContent'
    }
};

var _reactComponentWrapper = (0, _reactTransformCatchErrors3['default'])({
    filename: '/Users/brennanerbeznik/Dropbox/FrontEnd/app/components/CreateSet/TermContent/TermContent.js',
    components: _components,
    locals: [module],
    imports: [_react, _redboxReact]
});

var _reactComponentWrapper2 = (0, _reactTransformHmr3['default'])({
    filename: '/Users/brennanerbeznik/Dropbox/FrontEnd/app/components/CreateSet/TermContent/TermContent.js',
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

var TermContent = (function (_Component) {
    _inherits(TermContent, _Component);

    function TermContent() {
        _classCallCheck(this, _TermContent);

        _get(Object.getPrototypeOf(_TermContent.prototype), 'constructor', this).apply(this, arguments);

        this.state = {
            term: null,
            definition: null,
            triggered: false
        };
    }

    // item={this.state.item}
    // index={this.state.index}
    // total_count={this.props.total_count}
    // active_row={this.state.active_row}
    // active_side={this.state.active_side}
    // activateRow={() => this.setState({ active_row: true })}
    // deactivateRow={() => this.setState({ active_row: false })}
    // focusSide={(value) => this.setState({ active_side: value })}
    // enterTerm={(term) => this.setState({ term: term}) }
    // saveTerm={this.saveTerm}
    // enterDefinition={(def) => this.setState({definition: def})}
    // saveDefinition={this.saveDefinition}
    // addRow={this.props.addRow}

    /*           
    // computeStyle = () => {
    //     let { index, active_side, subjects } = this.props,
    //           node, rect;
    //     if(subjects == (undefined || null)) return;
    
    //     if (active_side === 0) { node = this.refs['termContentWord' + index] } 
    //     else { node = this.refs['termContentDef' + index] }
    
    //     rect = node.getBoundingClientRect();
    //     return rect;
    // }
    */

    /*
    
    */

    /*  --------- Definition ------------
    
    items={term_choices !== undefined ? term_choices : []}
    getItemValue={(item) => item}
    onSelect={(value, item) => {
        this.setState({ terms: [ item ] })                                     
    }}
    onInput={(event, value) => {
        if(subjects !== undefined && subjects.length > 0) {
        this.setState({loading: true})
            getTermSuggestions(value, (items) => {
                this.setState({ terms: items, loading: false })
            })
        }
    }}
    renderItem={(term, isHighlighted, index) => (
        <div className={classnames({ 'first_item': index == 0 })}
             style={isHighlighted ? styles.highlightedItem : styles.item}
             key={term.abbr}
             id={term.abbr}>
             {term}
        </div>
    )}
    ---------------------- ---------*/

    /*  --------- Definition ------------
    items={def_choices !== undefined ? def_choices : []}
    getItemValue={(_item) => _item.cue}
    onSelect={(value, _item) => {
        this.setState({ defs: [ _item.cue ]})
        updateAssociation(association, 
        {name: 'item', prop: _item}, 
        {name: 'item_id', prop: _item.id },
        {name: 'item_adopted', prop: true})
    }}
    onInput={(event, value) => value}
    onFocus={(event, value) => {
        if(subjects !== undefined && subjects.length > 0 && item !== null) {
            this.setState({loading: true})
            getDefSuggestions(item.id)
            setTimeout(() => {
                getDefSuggestions(item.id)
            }, 250)
        }
    }}
    renderItem={(_item, isHighlighted, index) => (
        <div className={classnames({ 'first_item': index == 0 })}
             style={isHighlighted ? styles.highlightedItem : styles.item}
             key={_item.abbr}
             id={_item.abbr}>
             {_item.cue}
        </div>
    )}
    ---------------------- ---------*/

    _createClass(TermContent, [{
        key: 'loadItem',
        value: function loadItem(item) {
            if (item !== undefined && item !== null) {
                if (item.target !== null) this.setState({ term: item.target });
                if (item.cue !== null) this.setState({ definition: item.cue });
            }
        }
    }, {
        key: 'trigger',
        value: function trigger(node1, node2) {
            $(node1).add(node2).trigger('input');
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this = this;

            var _props = this.props;
            var item = _props.item;
            var active_row = _props.active_row;
            var active_side = _props.active_side;
            var index = _props.index;
            var total_count = _props.total_count;
            var rendered = _props.rendered;

            this.loadItem(item);
            var term_node = this.refs['autocomplete_term_' + index],
                def_node = this.refs['autocomplete_def_' + index];
            if (active_row && active_side == 0) {
                term_node.focus();
            }
            /* Autosizing textarea */
            $(term_node).add(def_node).on('input', function () {
                this.style.height = 'auto';
                this.style.height = this.scrollHeight + 'px';
            });
            setTimeout(function () {
                _this.trigger(term_node, def_node);
                if (index == total_count - 1) {
                    console.log(index);
                    console.log(total_count);
                    _this.props.finishedRendering();
                }
            }, 1);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var index = this.props.index;

            var term_node = this.refs['autocomplete_term_' + index],
                def_node = this.refs['autocomplete_def_' + index];
            if (nextProps.resizing) {
                this.trigger(term_node, def_node);
                return;
            }
            if (!this.state.triggered) {
                this.trigger(term_node, def_node);
                this.setState({ triggered: true });
            }
            if (this.props.item !== nextProps.item) {
                if (nextProps.item !== null && nextProps.item.target !== null) {
                    this.setState({
                        term: nextProps.item.target
                    });
                } else {
                    this.setState({
                        term: ''
                    });
                }
                if (nextProps.item !== null && nextProps.item.cue !== null) {
                    this.setState({
                        definition: nextProps.item.cue
                    });
                } else {
                    this.setState({
                        definition: ''
                    });
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props2 = this.props;
            var active_row = _props2.active_row;
            var index = _props2.index;

            return _react2['default'].createElement(
                'div',
                { className: (0, _classnames2['default'])({ "TermContent-focus": active_row, "TermContent": !active_row }) },
                _react2['default'].createElement(
                    'div',
                    { className: 'TermContent-wrap' },
                    _react2['default'].createElement(
                        'div',
                        { className: (0, _classnames2['default'])("TermContent-side", { "word-side-focus": active_row }, { 'word-side': !active_row }),
                            ref: 'termContentWord' + index,
                            onClick: function () {
                                _this2.props.activateRow();
                                _this2.props.focusSide(0);
                                _this2.refs['autocomplete_term_' + index].focus();
                            } },
                        _react2['default'].createElement('textarea', {
                            className: 'AutoExpandTextArea-textarea',
                            ref: 'autocomplete_term_' + index,
                            tabIndex: 2,
                            rows: '1',
                            onFocus: function () {
                                _this2.props.activateRow();
                                _this2.props.focusSide(0);
                            },
                            onChange: function (e) {
                                _this2.setState({ term: e.target.value });
                            },
                            onInput: function (e) {},
                            onBlur: function () {
                                if (_this2.state.term !== null && _this2.state.term.length > 0) {
                                    _this2.props.saveTerm(_this2.state.term);
                                }
                                _this2.props.deactivateRow();
                            },
                            value: this.state.term
                        })
                    ),
                    _react2['default'].createElement(
                        'div',
                        { className: 'TermContent-side def-side',
                            ref: 'termContentDef' + index,
                            onClick: function () {
                                _this2.props.activateRow();
                                _this2.props.focusSide(1);
                                _this2.refs['autocomplete_def_' + index].focus();
                            } },
                        _react2['default'].createElement('textarea', {
                            className: 'AutoExpandTextArea-textarea',
                            ref: 'autocomplete_def_' + index,
                            tabIndex: 2,
                            rows: '1',
                            onFocus: function () {
                                _this2.props.activateRow();
                                _this2.props.focusSide(1);
                            },
                            onKeyDown: function (e) {
                                if (_this2.props.index !== _this2.props.total_count - 1) return;
                                if (e.which == 9) {
                                    e.preventDefault();
                                    if (_this2.props.index == _this2.props.total_count - 1) _this2.props.addRow();
                                }
                            },
                            onChange: function (e) {
                                _this2.setState({ definition: e.target.value });
                            },
                            onBlur: function () {
                                if (_this2.state.definition !== null && _this2.state.definition.length > 0) {
                                    _this2.props.saveDefinition(_this2.state.definition);
                                }
                                _this2.props.deactivateRow();
                            },
                            value: this.state.definition
                        })
                    )
                )
            );
        }
    }], [{
        key: 'propTypes',
        value: {},
        enumerable: true
    }]);

    var _TermContent = TermContent;
    TermContent = _wrapComponent('_$TermContent')(TermContent) || TermContent;
    return TermContent;
})(_react.Component);

exports['default'] = TermContent;
module.exports = exports['default'];

/* TODO: add all propTypes */

//# sourceMappingURL=TermContent-compiled.js.map