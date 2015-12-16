import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
require('./LearnInput.scss')

export default class LearnInput extends Component {
	static propTypes = {
	}

	state = {
		answer: ' ',
		reaction_time: null,
		correct: false
	}

	componentDidMount() {
		this.setState({
			correct: false
		});
	}

	componentWillReceiveProps(nextProps) {
		this.refs.answerbox.focus()
		const { current_slot } = this.props;
		if (current_slot !== nextProps.current_slot) {
			this.setState({
				answer: '',
				reaction_time: null
			});
		}
	}

	componentWillUpdate(nextProps, nextState) {
		let answerbox = this.refs.answerbox;
		setTimeout(() => {
			answerbox.focus()	
		}, 10)
	}

	handleChange = (e) => {
		this.setState({
			answer: e.target.value
		});	
		this.props.updateValue(e.target.value)
	}

	handleReactionTime = () => {
		if (this.state.reaction_time !== null ) { return; }
		const t = new Date(),
			  reaction_time = t.toISOString().replace("T", " ").replace("Z", "")
		this.setState({
			reaction_time: reaction_time
		});
	}
 
	handleSubmit = (e, arg) => {
		e.preventDefault()
		const { submitAnswer } = this.props,
			  d = new Date(),
			  response_time = d.toISOString().replace('T', " ").replace("Z", ""),
			  reaction_time = this.state.reaction_time !== null ? this.state.reaction_time : response_time,
			  answer = this.state.answer.toLowerCase().trim(),
			  response = {
			  	reaction_time: reaction_time,
			  	response_time: response_time,
			  	answer: answer,
			  	answer_clicked: false,
			  	answer_by_letter: false,
			  	taps: null
			  }
		this.setState({
			answer: '',
			reaction_time: null
		});
		if(arg !== undefined && arg.type == 'hint') {
			getHint(response)
			return;
		} 
		submitAnswer(response)
	}

	render() {
		return(
			<div className="input_box">	
			    <form onSubmit={(e) => e.preventDefault()}>
			    <input autoFocus={true} 
			    	   ref="answerbox"
			    	   value={this.state.answer}
			    	   onChange={this.handleChange}
			    	   onKeyDown={::this.handleReactionTime}
			    	   type="text" 
			    	   className={classnames({'correct_answer': this.state.correct})}/>
			   	</form>
			   	<span className="">
			   		<button style={{height: '34px'}} className="button primary" 
			   			    type="button"
			   			    onClick={::this.handleSubmit}>Answer</button>
			   	</span>
			</div>
		);
	}
}
