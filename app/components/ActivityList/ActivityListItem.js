import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import moment from 'moment';

export default class ActivityListItem extends Component {
	static propTypes = {
	}

	render() {
		const practice_icon = require('../../assets/practice_icon_blue.png');
		const { action } = this.props;
		const time_since = moment(action.date).fromNow()
		return(
			<li className="activity_item_container">
				<span className="activity_item">
					<div className="activity_action">
						<a><img src={practice_icon} className="activity_icon"/></a>
					</div>
					<div className="activity_message">
						<div className="message_content">{action.user + " " + action.action_type + " "}<a className="link">{action.set}</a></div>
						<span className="message_datetime">{time_since}</span>
					</div>
				</span>
			</li>
		);
	}
}