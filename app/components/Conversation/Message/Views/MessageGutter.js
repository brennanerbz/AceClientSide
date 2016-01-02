import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import moment from 'moment';
import MessageIcon from './MessageIcon';

export default class MessageGutter extends Component {
	static propTypes = {
	}

	render() {
		const { message, first, isMouseOver } = this.props,
		ts = moment.utc(message.ts).local().format('h:mm a')
		return(
			<div className="message_gutter">
				{ 
					first 
					&&
					<MessageIcon
						message={message}
					/>
				}
				{
					!first
					&&
					isMouseOver
					&&
					<span className="timestamp">
						{ts}
					</span>
				}
				<span className="message_star_holder">
					<img className="star" />
				</span>
			</div>
		);
	}
}