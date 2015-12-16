import React, { Component, PropTypes } from 'react';
require('./ShowCorrect.scss');

export default class ShowCorrect extends Component {
	static propTypes = {
	}	

	shouldComponentUpdate(nextProps) {
		return this.props.current_slot.id == nextProps.current_slot.id || this.props.current_trial.answer == nextProps.current_trial.answer
	}
	
	render() {
		const { current_slot,
			    current_trial, 
			    showCompletedSequence
			  } = this.props;
		return(
			<div className="show_correct_container">
				<div className="show_correct">
					<p className="correct_answer">{current_slot.item.target}</p>
				</div>
				<a className="continue_btn"
				   onClick={showCompletedSequence 
				   			? () => this.props.newSequence(null) 
				   			: () => this.props.skipSlot()}>
				   			{showCompletedSequence 
				   			? "Press any key to start new round" 
				   			: "Press any key to continue"}</a>
			</div>
		);
	}
}