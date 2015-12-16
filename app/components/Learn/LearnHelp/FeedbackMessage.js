import React, { Component, PropTypes } from 'react';

export default class FeedbackMessage extends Component {
	static propTypes = {
	}

	render() {
		const { feedback, current_trial} = this.props;
		return(
			<li className="bot">
				{
					feedback !== null
					&&
					<div className="message">
						<p>{feedback}</p>
					</div>
				}
			</li>
		);
	}
}