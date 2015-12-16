import React, { Component, PropTypes } from 'react';
require('./ActivityList.scss');
import ActivityListItem from './ActivityListItem';

export default class ActivityList extends Component {
	static propTypes = {
	}

	state = {
		actions: [
			{
				user: 'Brennan Erbeznik',
				action_type: 'practiced',
				set: 'Intro to psychology',
				date: '2015-10-02 13:34:05.7000'
			},
			{
				user: 'Joseph Price',
				action_type: 'practiced',
				set: 'Intro to biology',
				date: '2015-10-01 13:34:05.7000'
			}
		]
	}

	render() {
		const activity_icon = require('../../assets/activity_icon_blue.png');
		return(
			<div>
				<div className="section_header">
					<span className="section_icon"><img src={activity_icon} className="header_icon"/></span>
					<span className="section_header_label">Activity</span>
				</div>
				<ul className="activity_list">
					{this.state.actions.map(action => <ActivityListItem action={action}/>)}
				</ul>
			</div>
		);
	}
}