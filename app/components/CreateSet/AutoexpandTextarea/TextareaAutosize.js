import React, { Component, PropTypes } from 'react';
import autosize from 'autosize';

const UPDATE = 'autosize:update',
      DESTROY = 'autosize:destroy',
      RESIZED = 'autosize:resized';

export default class TextareaAutosize extends Component {
	static propTypes = {
		onResize: PropTypes.func,
		addRow: PropTypes.func,
		activeRow: PropTypes.number,
		lastIndex: PropTypes.number,
		tabIndex: PropTypes.number,
		activeSide: PropTypes.string,
		wordSide: PropTypes.bool,
		defSide: PropTypes.bool
	}

	static defaultProps = {
		rows: 1
	}

	state = {
		title: '',
		blurred: false
	}

	componentWillMount() {
		const { title } = this.props;
		if(title !== undefined) this.setState({ title: title }) 
	}

	componentDidMount() {
	  const { tabIndex, title } = this.props;
	  const node = this.refs["textarea" + tabIndex];
	  autosize(node);
	  if (this.props.onResize) {
	    node.addEventListener(RESIZED, this.props.onResize);
	  }	  
	  if(title !== undefined) this.setState({ title: title }) 
	  let length;
	  if(this.state.title !== undefined 
	     && !this.state.blurred) {
	  	length = this.state.title.length
	 	 this.refs[`textarea${tabIndex}`].setSelectionRange(length, length) 
	  }
	}
	
	componentWillReceiveProps(nextProps) {
	  if (this.getValue(nextProps) !== this.getValue(this.props)) {
	    this.dispatchEvent(UPDATE, true);
	  }
	}

	componentWillUnmount() {
	  const {tabIndex} = this.props;
	  const node = this.refs["textarea" + tabIndex];
	  if (this.props.onResize) {
	    node.removeEventListener(RESIZED);
	  }
	  this.dispatchEvent(DESTROY);
	}

	dispatchEvent(EVENT_TYPE, defer) {
	  const {tabIndex} = this.props;
	  const event = document.createEvent('Event');
	  const node = this.refs["textarea" + tabIndex];
	  event.initEvent(EVENT_TYPE, true, false);
	  const dispatch = () => node.dispatchEvent(event);
	  if (defer) {
	    setTimeout(dispatch);
	  } else {
	    dispatch();
	  }
	}

	getValue(props) {
	  if (props) {
	    return props.valueLink ? props.valueLink.value : props.value;
	  }
	}

	render() {
	  const { tabIndex, defSide, title } = this.props;    
	  return (
	    <div>
	      <textarea 
	      		  {...this.props}
	      		  rows="1" 
	      		  value={this.state.title}
	      		  onChange={(e) => { 
	      		  	this.setState({title: e.target.value}) 
	      		  	this.props.titleChange(e.target.value)
	      		  }}
	      		  onFocus={() => {
	      		  	this.setState({blurred: true})
	      		  	if(typeof this.props.focus == 'function') {
      		  	  		this.props.focus()
      		  	  	}}}
      		  	  onBlur={() => {
      		  	  	if(typeof this.props.blur == 'function') {
      		  	  		this.props.blur()
      		  	  	} 
      		  	  	if(typeof this.props.titleBlur == 'function') {
      		  	  		this.props.titleBlur()
      		  	  	}}}
	              onKeyDown={this.handleKeyDown} 
	              tabIndex={tabIndex}
	              ref={`textarea${tabIndex}`}>
	              {this.props.children}
	      </textarea>
	    </div>
	  );
	}
}





