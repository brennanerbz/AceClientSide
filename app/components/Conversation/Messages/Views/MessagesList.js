import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import moment from 'moment';
import MessageContainer from '../../Message/Containers/MessageContainer';

export default class MessagesList extends Component {
	static propTypes = {
	}

	render() {
		const { username, currentSlot, messages } = this.props;
		var newUser = true, currentUsername = '', oldUsername = '', showSeparator = false, currentDay, oldDay,
		messagesList = [];
		{messages.map((m, i) => {

			currentUsername = m.user
			if(i == 0) newUser = true
			else if(currentUsername !== oldUsername) newUser = true
			else if(currentUsername == oldUsername) newUser = false
			oldUsername = currentUsername

			currentDay = m.ts
			if(i == 0) showSeparator = true
			else if(moment(currentDay).isSame(oldDay, 'day')) showSeparator = false
			else showSeparator = false
			oldDay = currentDay

			if(showSeparator) {
				messagesList.push(
					<div className="day_divider">
						<hr className="separator"/>
						<div className="day_divider_label">
							{moment(m.ts).calendar(null, {
								sameDay: '[Today]',
							    nextDay: '[Tomorrow]',
							    nextWeek: 'dddd',
							    lastDay: '[Yesterday]',
							    lastWeek: '[Last] dddd',
							    sameElse: 'DD/MM/YYYY'
							})}
						</div>
					</div>
				)
			}
			
			messagesList.push(
				<MessageContainer 
					key={i}
					first={newUser}
					username={username}
					currentSlot={currentSlot}
					message={m}/>
			)
		})}
		return(
			<div id="msgs_div" className="msgs_holder">
				{messagesList}
			</div>
		);
	}
}