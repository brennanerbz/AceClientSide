import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class MessageBody extends Component {
	static propTypes = {

	}

	buildCueMessage(msg) {
		return msg.text
	}

	buildUserMessage(msg) {
		return msg.text
	}

	buildFeedbackMessage(msg) {
		return msg.text
	}

	buildFormatMessage(msg) {
		if(msg.subtype == 'mc') {
			return mc
		} else {
			return msg.text
		}
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
					message.type == 'answer'
					&& ::this.buildUserMessage(message)
				}
				{
					message.type == 'reply'
					&& ::this.buildFeedbackMessage(message)
				}
				{
					message.type == 'hint'
					&& ::this.buildFormatMessage(message)
				}
			</span>
		);
	}
}


