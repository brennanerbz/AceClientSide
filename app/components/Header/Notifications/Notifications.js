import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Notifications extends Component {
	static propTypes = {
		
	}

	render() {
		const notificationIcon = require('../assets/Notifications.png')
		return(			
			<button className="button button-circle button-with-icon">
				<img className="notification-icon svg-icon" src={notificationIcon}/>
			</button>
		);
	}
}