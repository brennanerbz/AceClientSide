import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class MessageIcon extends Component {
	static propTypes = {
	}

	render() {
		let botIcon = require('../../../../assets/slackbot_icon.png'),
		profilePic = require('../../../../assets/message_profile_pic.png'),
		icon, { message } = this.props;
		if(message.user == 'acubot') icon = botIcon
		else icon = profilePic
		return(
			<div className="message_icon">
				<img  
					style={{
						height: message.user == 'acubot' && '40px',
						width: message.user == 'acubot' && '40px'
					}}
					src={icon} 
					className="member_icon"/>
			</div>
		);
	}
}