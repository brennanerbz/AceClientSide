import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import MessageContainer from '../../Message/Containers/MessageContainer';

export default class MessagesList extends Component {
	static propTypes = {
	}

	render() {
		return(
			<div id="msgs_div" className="msgs_holder">
				{Array.from({length: 10}).map((a, i) => {
					return (
						<MessageContainer key={i} />
					)
				})}
			</div>
		);
	}
}