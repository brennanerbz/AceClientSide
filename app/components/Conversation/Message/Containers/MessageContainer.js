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
		return(
			<div className="message">
				<MessageGutter/>
				<MessageContent/>
			</div>
		);
	}
}