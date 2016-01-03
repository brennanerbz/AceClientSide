import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import MessageGutter from '../Views/MessageGutter';
import MessageContent from '../Views/MessageContent';

export default class MessageContainer extends Component {
	static propTypes = {
	}

	state = {
		isMouseOver: false
	}

	componentDidMount() {
		const { messagesLength, index, renderedMesssages } = this.props;
		if(messagesLength == index) {
			renderedMesssages() 
		}
	}


	render() {
		const { username, message, first } = this.props,
		{isMouseOver} = this.state;
		return(
			<div className={classnames("message", {'first': first})}
				 onMouseOver={() => this.setState({isMouseOver: true})}
				 onMouseLeave={() => this.setState({isMouseOver: false})}>
				<MessageGutter
					first={first}
					message={message}
					isMouseOver={isMouseOver}
				/>
				<MessageContent
					first={first}
					username={username}
					message={message}
					isMouseOver={isMouseOver}
				/>
			</div>
		);
	}
}