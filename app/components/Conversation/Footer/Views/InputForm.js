import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class InputForm extends Component {
	static propTypes = {
		currentTrial: PropTypes.object,
		submitAnswer: PropTypes.func
	}

	state = {
		value: '',
		reaction_time: null,
	}

	componentDidMount() {
		let node = this.refs.input;
		/* Textarea autosize */
		// $(node).on('input', function() {
		// 	this.style.height = 'auto';
		// 	this.style.height = (this.scrollHeight) + 'px'
		// })
	}

	componentWillReceiveProps(nextProps) {
		const { currentTrial } = this.props;
		if (currentTrial !== nextProps.currentTrial) {
			this.setState({
				reaction_time: null
			});
		}
	}

	handleReactionTime(){
		if (this.state.reaction_time !== null ) { return; }
		const t = new Date(),
			  reaction_time = t.toISOString().replace("T", " ").replace("Z", "")
		this.setState({
			reaction_time: reaction_time
		});
	}

	handleSubmit(e) {
		e.preventDefault()
		const { submitAnswer } = this.props,
		value = this.state.value,
		d = new Date(),
		response_time = d.toISOString().replace('T', " ").replace("Z", ""),
		reaction_time = this.state.reaction_time !== null ? this.state.reaction_time : response_time,

		response = {
			reaction_time: reaction_time,
			response_time: response_time,
			answer: value,
			// answer_clicked: false,
			// answer_by_letter: false,
			answer_method: 'typed',
			// taps: null
		}
		if(value.length == 0) return;
		this.setState({
			value: '',
			reaction_time: null
		});
		submitAnswer(response)
	}

	render() {
		return(
			<form 
				style={{height: '42px'}} 
				id="input_form"
				onSubmit={::this.handleSubmit}>
				<textarea 
					id="input" 
					className=""
					type="text"
					ref="input"
					autoFocus={true}
					value={this.state.value}
					onChange={(e) => {
						this.setState({value: e.target.value});
					}}
					onKeyPress={(e) => {
						if(e.which == 13 && this.state.value.trim().length == 0) {
							if(e.shiftKey) {
								return;
							} else {
								e.preventDefault()
								return;
							}
						}
						if(e.which == 13 && !e.shiftKey && this.state.value.trim().length > 0) {
							this.handleSubmit(e)
						}
					}}
					onKeyDown={::this.handleReactionTime}
					form="input_form"/>
				<a 
					id="answer_link"
					onClick={::this.handleSubmit}>
					Answer
				</a>
			</form>
		);
	}
}