import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class MessageBody extends Component {
	static propTypes = {

	}

	render() {
		return (
			<a className="message_sender">
				message_sender
				<span className="message_star_holder">
					<img className="star" />
				</span>
			</a>
		);
	}
}
