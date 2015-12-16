import React, { Component, PropTypes } from 'react';
require('./LearnFeedback.scss');

export default class LearnFeedback extends Component {
	static propTypes = {
	}

	relatedHook(related) {
		const choices = related.split('|').slice(0, 4)
		const hook = 'Some of these related terms might help: ';
		const last_choice = choices.slice(-1)[0]		
		const bold_choices = choices.map(choice => {
				return (
					<b className="related_choice">{choice + ", "}</b>
				)
			}
		)		
		return (
			<span className="span_feedback">{hook} {bold_choices.slice(0, 3)}{" and "}<b className="related_choice">{last_choice + "."}</b></span>
		)
	}

	hintHook() {
		let hook_choices = [
		'Maybe this example will help...', 
		'Try this hint...',
		'This hint might help...',
		'This other example might help you...'
		]
		let r_num = Math.floor(Math.random() * 4)
		let hint_hook = hook_choices[r_num]
		return (
			<span>{hint_hook}</span>
		)
	}


	renderFeedbackMessage(trial, slot) {
		const correct = slot.completion
		const praise = trial.praise.charAt(0).toUpperCase() + trial.praise.slice(1)
		const feedback = trial.feedback
		const answer = trial.answer
		return(
			<p className="feedback_message">				
				{	
					praise
					? <span>{praise + " "}</span>
					: null
				} 
				{	
					feedback
					? <span>{feedback + ". "}</span>
					: null
				}
				{
					correct !== null
					? <a>Press any key to continue</a>
					: null
				}
				{	
					trial.difficulty == 'related' && correct == null
					? null
					// ? ::this.relatedHook(trial.related)
					: null
				}
				{
					trial.difficulty == 'aug' && correct == 'None'
					? null
					// ? ::this.hintHook()
					: null
				}
			</p>
		)
	}

	shouldShowFeedback(feedback, praise) {
		if (feedback.toLowerCase() !== 'incorrect' || praise.toLowerCase() !== 'bad') return true;
	}

	render() {
		const { trial, slot } = this.props;
		const quotes = require('../../../assets/quotes.png');
		return(
			<div className="feedback">	
				{
					trial.feedback || trial.praise 
					? <span className="supplemental_feedback">
					  	<img className="feedback_quotes" src={quotes}/>
					  </span>
					: null
				}			
				{
					trial.feedback || trial.praise
					? ::this.renderFeedbackMessage(trial, slot) 
					: null
				}								
			</div>
		);
	}
}