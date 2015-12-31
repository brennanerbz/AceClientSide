import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class MessageBody extends Component {
	static propTypes = {

	}

	buildCueMessage(msg) {
		return <p>{msg.cue.censored_cue}</p>
	}

	buildUserMessage(msg) {
		return <p>{msg.user_response.response}</p>
	}

	buildFeedbackMessage(msg) {
		return <p>{msg.feedback.feedback}</p>
	}

	buildFormatMessage(msg) {
		if(msg.format_type == 'mc') {
			let mc = msg.format.multiple_choice,
				mc_list = []
			mc.forEach((m, i)=> {
				mc_list.push(
					<pre key={i}>{m}</pre>
				)
			})
			return mc_list
		}

	}

	render() {
		const { message } = this.props;
		return (
			<span className="message_body">
				{
					message == undefined
					? 'Hmm'
					: null
				}
				
			</span>
		);
	}
}

// {
// 	message.type == 'cue'
// 	&& ::this.buildCueMessage(message)
// }
// {
// 	message.type == 'response'
// 	&& ::this.buildUserMessage(message)
// }
// {
// 	message.type == 'feedback'
// 	&& ::this.buildFeedbackMessage(message)
// }
// {
// 	message.type == 'format'
// 	&& ::this.buildFormatMessage(message)
// }
