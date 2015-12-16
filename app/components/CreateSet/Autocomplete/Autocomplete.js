import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import scrollIntoView from 'dom-scroll-into-view';
// const ReactDOM = require('react-dom');
import autosize from 'autosize';

const UPDATE = 'autosize:update',
      DESTROY = 'autosize:destroy',
      RESIZED = 'autosize:resized';

export default class Autocomplete extends Component {
	static propTypes = {
		initialValue: PropTypes.any,
		onChange: PropTypes.func,
		onSelect: PropTypes.func,
		// shouldItemRender: PropTypes.func,
		// renderItem: PropTypes.func.isRequired,
		activateRow: PropTypes.func,
		switchToDef: PropTypes.func,
		switchToWord: PropTypes.func,
		saveWord: PropTypes.func,
		saveDef: PropTypes.func,
		rect: PropTypes.func,
		addRow: PropTypes.func,
		onResize: PropTypes.func,
		// menuStyle: PropTypes.object,
		inputProps: PropTypes.object,
		index: PropTypes.number,
		totalCount: PropTypes.number
	}

	// static defaultProps = {
	//   rows: 1,
	//   inputProps: {},
	//   onChange () {},
	//   onSelect (value, item) {},
	//   renderMenu (items, value, style) {
	//     return <div style={{...style, ...this.menuStyle}} children={items}/>
	//   },
	//   shouldItemRender () { return true },
	//   menuStyle: {
	//     borderRadius: '0.25em',
	//     borderTopLeftRadius: '0',
	//     borderTopRightRadius: '0',
	//     borderTop: '1px solid',
	//     borderTopColor: '#d9d9d9',
	//     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
	//     WebkitBoxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
	//     background: '#FFFFFF',
	//     padding: '2px 0',
	//     fontSize: '95%',
	//     position: 'fixed',
	//     overflow: 'auto',
	//     maxHeight: '50%',
	//     zIndex: '10000'
	//   }
	// }

	constructor(props) {
		super(props);
		this.state = {
			// isOpen: false,
			// highlightedIndex: null
		}
	}

	keyUpHandlers = {
		Tab() {
		  const { addRow, index, totalCount, activeSide, flag, setFlag, activateRow } = this.props;
		  if(flag) {
		  	setFlag(false)
		  	return;
		  }
	}

	keyDownHandlers = {
	    
	    // ArrowDown() {
	    //   // event.preventDefault()
	    //   const { shouldsuggest } = this.props;
	    //   if(!shouldsuggest) {
	    //   	return;
	    //   }
	    //   var { highlightedIndex } = this.state
	    //   var index = (
	    //     highlightedIndex === null ||
	    //     highlightedIndex === this.getFilteredItems().length - 1
	    //   ) ?  0 : highlightedIndex + 1
	    //   this._performAutoCompleteOnKeyUp = true
	    //   this.setState({
	    //     highlightedIndex: index,
	    //     isOpen: true,
	    //   })
	    // },

	    // ArrowUp(event) {
	    //   // event.preventDefault()
	    //   const { shouldsuggest } = this.props;
	    //   if(!shouldsuggest) {
	    //   	return;
	    //   }
	    //   var { highlightedIndex } = this.state
	    //   var index = (
	    //     highlightedIndex === 0 ||
	    //     highlightedIndex === null
	    //   ) ? this.getFilteredItems().length - 1 : highlightedIndex - 1
	    //   this._performAutoCompleteOnKeyUp = true
	    //   this.setState({
	    //     highlightedIndex: index,
	    //     isOpen: true,
	    //   })
	    // },

	    // Enter(event) {
	    //   if (this.state.isOpen === false) {
	    //     // already selected this, do nothing
	    //     return
	    //   }
	    //   else if (this.state.highlightedIndex == null) {
	    //     // hit enter after focus but before typing anything so no autocomplete attempt yet
	    //     this.setState({
	    //       isOpen: false
	    //     })
	    //     this._ignoreBlur = false;
	    //   }
	    //   else {
	    //     event.preventDefault()
	    //     var item = this.getFilteredItems()[this.state.highlightedIndex]
	    //     this.setState({
	    //       value: this.props.getItemValue(item),
	    //       isOpen: false,
	    //       highlightedIndex: null
	    //     }, () => {
	    //       //React.findDOMNode(this.refs.input).focus() // TODO: file issue
	    //       ReactDOM.findDOMNode(this.refs['textarea' + this.getNodeId()]).setSelectionRange(
	    //         this.state.value.length,
	    //         this.state.value.length
	    //       )
	    //       this.props.onSelect(this.state.value, item)
	    //     })
	    //   }
	    // },

	    // Escape (event) {
	    //   this.setState({
	    //     highlightedIndex: null,
	    //     isOpen: false
	    //   })
	    // }
	  }  
	
	componentWillMount() {
	  // this._ignoreBlur = false
	  // this._performAutoCompleteOnUpdate = false
	  // this._performAutoCompleteOnKeyUp = false
	  const { item, wordSide, defSide } = this.props;
	  if(item == null) return;
	  if(item !== undefined) 
	  	if(defSide) { 
	  		this.setState({ value: item.cue }) 
	  	}
	  	if(wordSide) { 
	  		this.setState({ value: item.target })
	  	}
	}

	componentDidMount() {  
	  const { index, totalCount, wordSide } = this.props;
	  const node = this.refs['textarea' + this.getNodeId()];
	  // autosize(node);
	  // if (this.props.onResize) {
	  //   node.addEventListener(RESIZED, this.props.onResize);
	  // }
	  if (document.activeElement == document.body) {
	    if (index === totalCount && wordSide) {
	      node.focus()
	    }
	  }
	}

	componentWillReceiveProps(nextProps) {
	  // if (nextProps.rect() !== this.props.rect()) { this.setMenuPositions() }
	  // this._performAutoCompleteOnUpdate = true;
	  if (this.getValue(nextProps) !== this.getValue(this.props)){
	    this.dispatchEvent(UPDATE, true);
	  }
	  const { index, item, defSide, wordSide } = this.props,
	  		  value = this.state.value;
	  if(item !== nextProps.item) {
	  	if(wordSide) {
	  		if(nextProps.item !== null && nextProps.item.target !== null) {
	  			this.setState({value: nextProps.item.target});
	  		} else {
	  			this.setState({value: ''});
	  		}
	  	}
	  	if(defSide) {
	  		if(nextProps.item !== null && nextProps.item.cue !== null) {
	  			this.setState({value: nextProps.item.cue});
	  		} else {
	  			this.setState({value: ''});
	  		}
	  	}
	  }
	}

	componentDidUpdate(prevProps, prevState) {
	  // if (this.state.isOpen === true && prevState.isOpen === false)
	    // this.setMenuPositions()
	  // if(this.state.value !== prevState.value)
	  // 	this.setMenuPositions()    
	  // if (this.state.isOpen && this._performAutoCompleteOnUpdate) 
	  //   this._performAutoCompleteOnUpdate = false
	  if (prevState.value !== this.state.value){
	    this.dispatchEvent(UPDATE, true);
	  }
	}

	componentWillUnmount() {
	  const node = this.refs['textarea' + this.getNodeId()];
	  if (this.props.onResize) {
	    node.removeEventListener(RESIZED);
	  }
	  this.dispatchEvent(DESTROY)
	}

	getNodeId = () => {
	  const { index } = this.props;
	  return index
	}

	dispatchEvent = (EVENT_TYPE, defer) => {
	  const event = document.createEvent('Event');
	  const node = this.refs['textarea' + this.getNodeId()];
	  event.initEvent(EVENT_TYPE, true, false); 
	  const dispatch = () => node.dispatchEvent(event);
	  if (defer) {
	    setTimeout(dispatch)
	  } else {
	    dispatch()
	  }
	}

	getValue = (props) => {
	  if (props) {
	    return props.valueLink ? props.valueLink.value : props.value;
	  }
	}

	// maybeScrollItemIntoView = () => {
	//   if (this.state.isOpen === true && this.state.highlightedIndex !== null) {
	//     var itemNode = ReactDOM.findDOMNode(this.refs[`item-${this.state.highlightedIndex}`])
	//     var menuNode = ReactDOM.findDOMNode(this.refs.menu)
	//     scrollIntoView(itemNode, menuNode, { onlyScrollIfNeeded: true })
	//   }
	// }

	handleKeyDown = (event) => {
	  const { shouldsuggest } = this.props;
	  if (this.keyDownHandlers[event.key])
	    this.keyDownHandlers[event.key].call(this, event)
	  // else {
	  // 	if(shouldsuggest) {
	  // 		this.setState({
	  // 		  highlightedIndex: null,
	  // 		  isOpen: true
	  // 		})
	  // 	}
	  // }
	}

	handleChange = (event) => {
	  const { subjects, onInput, getTermSuggestions } = this.props;
	  // this._performAutoCompleteOnKeyUp = true
	  var text = event.target.value;
	  // if(text.length == 0) {
	  // 	this.setState({
	  // 		isOpen: false
	  // 	});
	  // } else {
	  	this.setState({
	  	  value: text
	  	})
	  	// }, () => {
	  	//   onInput(event, this.state.value)
	  	// })
	  // }
	}

	handleKeyUp = (event) => {
		if (this.keyUpHandlers[event.key]) {
	  		this.keyUpHandlers[event.key].call(this, event)	
		}
	  	// if (this._performAutoCompleteOnKeyUp) {
	   //  	this._performAutoCompleteOnKeyUp = false
	   //  	// this.maybeAutoCompleteText()
	  	// }
	} 

	// getFilteredItems = () => {
	//   let { items } = this.props;
	//   if(items == undefined || null) return;

	//   if (this.props.shouldItemRender) {
	//     items = items.filter((item) => (
	//       this.props.shouldItemRender(item, this.state.value)
	//     ))
	//   }
	  
	  /* Most likely not going to use 
	  if (this.props.sortItems) {
	    items.sort((a, b) => (
	      this.props.sortItems(a, b, this.state.value)
	    ))
	  }
	  */

	//   return items
	// }

	// maybeAutoCompleteText () {
	//   if (this.state.value === '')
	//     return
	//   var { highlightedIndex } = this.state
	//   var items = this.getFilteredItems()
	//   if (items.length === 0)
	//     return
	//   var matchedItem = highlightedIndex !== null ?
	//     items[highlightedIndex] : items[0]
	//   var itemValue = this.props.getItemValue(matchedItem)
	//   var itemValueDoesMatch = (itemValue.toLowerCase().indexOf(
	//     this.state.value.toLowerCase()
	//   ) === 0)
	//   if (itemValueDoesMatch) {
	//   const node = this.refs['textarea' + this.getNodeId()];
	//     var setSelection = () => {
	//       node.value = itemValue
	//       node.setSelectionRange(this.state.value.length, itemValue.length)
	//     }
	//     if (highlightedIndex === null)
	//       this.setState({ highlightedIndex: 0 }, setSelection)
	//     else
	//       setSelection()
	//   }
	// }

	// setMenuPositions = () => {
	//   const { rect } = this.props;
	//   var r = rect(); // measurements
	//   this.setState({
	//     menuTop: r.bottom,
	//     menuLeft: r.left,
	//     menuWidth: r.width 
	//   })

	//   // return rect;
	// }

	// highlightItemFromMouse = (index) => {
	//   this.setState({ highlightedIndex: index })
	// }

	// selectItemFromMouse = (item) => {
	//   this.setState({
	//     value: this.props.getItemValue(item),
	//     isOpen: false,
	//     highlightedIndex: null
	//   }, () => {
	//     this.props.onSelect(this.state.value, item)
	//     ReactDOM.findDOMNode(this.refs['textarea' + this.getNodeId()]).focus()
	//     this.setIgnoreBlur(false)
	//   })
	// }

	// setIgnoreBlur = (ignore) => {
	//   this._ignoreBlur = ignore
	// }

	// renderMenu = () => {
	//   var items = this.getFilteredItems();
	//   if(items == (undefined || null) || items.length == 0) return;
	//   items = items.map((item, index) => {
	//     var element = this.props.renderItem(
	//       item,
	//       this.state.highlightedIndex === index,
	//       index,
	//       {cursor: 'default'}
	//     )
	//     return React.cloneElement(element, {
	//       onMouseDown: () => this.setIgnoreBlur(true),
	//       onMouseEnter: () => this.highlightItemFromMouse(index),
	//       onClick: () => this.selectItemFromMouse(item),
	//       ref: `item-${index}`,
	//     })
	//   })
	//   var style = {
	//     left: this.state.menuLeft,
	//     top: this.state.menuTop,
	//     minWidth: this.state.menuWidth,
	//     maxWidth: this.state.menuWidth
	//   }
	//   var menu = this.props.renderMenu(items.slice(0, 5), this.state.value, style)    
	//   return React.cloneElement(menu, { ref: 'menu' })
	// }

	// handleInputBlur = () => {
	//   if (this._ignoreBlur) 
	//     return
	//   this.setState({
	//     isOpen: false,
	//     highlightedIndex: null
	//   })
	// }

	// handleInputFocus = () => {
	//   	this.setState({ isOpen: true })
	// }

	focusSide = () => {
	  const node = this.refs['textarea' + this.getNodeId()]
	  node.focus()
	}

	render () {
	  const {index, item}  = this.props;
	  return (
	    <div className="Autocomplete-textarea" style={{display: 'inline-block'}}>
	      <textarea
	      	autoFocus={this.props.wordSide 
	      			  && this.props.index == this.props.totalCount
	      			  && this.props.title_flag
	      			  ? true : false}
	        tabIndex={this.props.tabIndex}
	        rows="1"         
	        {...this.props.inputProps}
	        // aria-autocomplete="both"
	        ref={`textarea${index}`}
	        key={`textarea${index}`}
	        onFocus={this.handleInputFocus}
	        onBlur={this.handleInputBlur}
	        onChange={(event) => this.handleChange(event)}
	        onKeyDown={(event) => this.handleKeyDown(event)}
	        onKeyUp={(event) => this.handleKeyUp(event)}
	        onClick={this.handleInputClick}
	        value={this.state.value}>
	      </textarea>
	    </div>
	  )
	}
}

// {this.state.isOpen && this.renderMenu()}
// {this.props.debug && (
//   <pre style={{marginLeft: 300}}>
//     {JSON.stringify(_debugStates.slice(_debugStates.length - 5, _debugStates.length), null, 2)}
//   </pre>
// )}