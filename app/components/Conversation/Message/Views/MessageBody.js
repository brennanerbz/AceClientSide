import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class MessageBody extends Component {
	static propTypes = {

	}

	buildCueMessage(msg) {
		return <p>{msg.text}</p>
	}

	buildUserMessage(msg) {
		return <p>{msg.text}</p>
	}

	buildFeedbackMessage(msg) {
		return <p>{msg.text}</p>
	}

	buildFormatMessage(msg) {
		if(msg.subtype == 'mc') {
			return <p>mc</p>
		} else {
			return <p>{msg.text}</p>
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


