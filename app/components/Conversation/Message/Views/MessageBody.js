import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class MessageBody extends Component {
	static propTypes = {

	}

	buildCueMessage() {
		
	}

	buildUserMessage() {

	}

	buildFeedbackMessage() {

	}

	buildFormatMessage() {

	}

	render() {
		const { message } = this.props;
		return (
			<span className="message_body">
				{
					message.type == 'cue'
					&& ::this.buildCueMessage(message)
				}
				{
					message.type == 'response'
					&& ::this.buildCueMessage(message)
				}
				{
					message.type == 'feedback'
					&& ::this.buildCueMessage(message)
				}
				{
					message.type == 'format'
					&& ::this.buildCueMessage(message)
				}
			</span>
		);
	}
}
