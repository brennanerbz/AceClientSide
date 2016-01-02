import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class MessageBody extends Component {
	static propTypes = {

	}

	render() {
		const { username, message } = this.props
		
		return (
			<a className="message_sender">
				{
					message.user == 'acubot'
					? 'acubot'
					: username.toLowerCase()
				}
				<span className="message_star_holder">
					<img className="star" />
				</span>
			</a>
		);
	}
}
