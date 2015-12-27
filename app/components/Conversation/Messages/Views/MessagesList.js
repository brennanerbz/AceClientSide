import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import MessageContainer from '../../Message/Containers/MessageContainer';

export default class MessagesList extends Component {
	static propTypes = {
	}

	render() {
		const { username, currentSlot, messages } = this.props;
		return(
			<div id="msgs_div" className="msgs_holder">
				{messages.map((m, i) => {
					return (
						<MessageContainer 
							key={i} 
							username={username}
							currentSlot={currentSlot}
							message={m}/>
					)
				})}
			</div>
		);
	}
}