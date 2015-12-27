import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import MessageBody from './MessageBody';
import MessageSender from './MessageSender';
import MessageActions from './MessageActions';

export default class MessageContent extends Component {
	static propTypes = {
	}

	render() {
		const { username, message } = this.props;
		return(
			<div className="message_content">
				<MessageActions/>	
				<MessageSender 
					username={username}
				/>
				<MessageBody 
					message={message}
				/>
			</div>
		);
	}
}