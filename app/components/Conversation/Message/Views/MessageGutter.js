import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import MessageIcon from './MessageIcon';

export default class MessageGutter extends Component {
	static propTypes = {
	}

	render() {
		const { message, first } = this.props;
		return(
			<div className="message_gutter">
				{ 
					first 
					&&
					<MessageIcon
						message={message}
					/>
				}
				<span className="message_star_holder">
					<img className="star" />
				</span>
			</div>
		);
	}
}