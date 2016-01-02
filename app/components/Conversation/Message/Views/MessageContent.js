import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import moment from 'moment'


import MessageBody from './MessageBody';
import MessageSender from './MessageSender';
import MessageActions from './MessageActions';

export default class MessageContent extends Component {
	static propTypes = {
	}

	render() {
		const { username, message, first } = this.props,
		ts = moment.utc(message.ts).local().format('h:mm a')
		return(
			<div className="message_content">
				<MessageActions/>	
				{
					first
					&&
					<div>
						<MessageSender 
							username={username}
							message={message}
						/>
						<span className="timestamp">
							{ts}
						</span>
					</div>
				}
				<MessageBody 
					message={message}
				/>
			</div>
		);
	}
}