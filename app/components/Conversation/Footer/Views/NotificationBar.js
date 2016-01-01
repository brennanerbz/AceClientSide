import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';


export default class NotificationBar extends Component {
	static propTypes = {
	}

	render() {
		return(
			<div id="notifications_bar" className="wide">
				<div id="notification_text" className="overflow_ellipsis">
				</div>
				<div id="typing_text" className="overflow_ellipsis">
				</div>
			</div>
		);
	}
}