import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';


export default class MessageGutter extends Component {
	static propTypes = {
	}

	render() {
		return(
			<div className="message_gutter">
				<span className="message_star_holder">
					<img className="star" />
				</span>
			</div>
		);
	}
}