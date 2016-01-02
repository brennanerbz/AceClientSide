import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import MessageContainer from '../../Message/Containers/MessageContainer';

export default class MessagesList extends Component {
	static propTypes = {
	}

	render() {
		const { username, currentSlot, messages } = this.props;
		var newUser = true, currentUsername = '', oldUsername = ''
		return(
			<div id="msgs_div" className="msgs_holder">
				{messages.map((m, i) => {
					currentUsername = m.user
					if(i == 0) newUser = true
					else if(currentUsername !== oldUsername) newUser = true
					else if(currentUsername == oldUsername) newUser = false
					oldUsername = currentUsername
					return (
						<MessageContainer 
							key={i} 
							first={newUser}
							username={username}
							currentSlot={currentSlot}
							message={m}/>
					)
				})}
			</div>
		);
	}
}