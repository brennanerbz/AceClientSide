import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
require('../ActivityList/ActivityList.scss');

import OnlineUserItem from './OnlineUserItem';

export default class OnlineUserList extends Component {
	static propTypes = {
	}	

	state = {
		users: [
			{
				name: 'Brennan Erbeznik',
				picurl: 'https://cdn-images-1.medium.com/fit/c/72/72/0*Un7eHMAQh62QX1LO.jpg'
			},
			{
				name: 'Nathan Lomeli',
				picurl: 'https://avatars.slack-edge.com/2015-08-28/9855976224_ff492a41db7e6350f43a_48.jpg'
			}
		]
	}

	render() {
		const online_icon = require('../../assets/profile_icon_green.png');
		return(
			<div>
				<div className="section_header">
					<span className="section_icon"><img src={online_icon} className="header_icon"/></span>
					<span className="section_header_label">Online</span>
				</div>
				<ul className="activity_list">
					{
						this.state.users.map(user => <OnlineUserItem user={user}/>)
					}
				</ul>
			</div>
		);
	}
}