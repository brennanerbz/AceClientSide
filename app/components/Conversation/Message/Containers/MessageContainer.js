import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import MessageGutter from '../Views/MessageGutter';
import MessageContent from '../Views/MessageContent';

export default class MessageContainer extends Component {
	static propTypes = {
	}

	state = {
		
	}

	render() {
		const { username, message, first } = this.props;
		return(
			<div className={classnames("message", {'first': first})}>
				<MessageGutter
					first={first}
					message={message}
				/>
				<MessageContent
					first={first}
					username={username}
					message={message}
				/>
			</div>
		);
	}
}