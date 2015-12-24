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
						<div key={i} className="message">
							<div className="action_hover_container">
							</div>
							<div className="message_gutter">
								<span className="message_star_holder">
									<img className="star" />
								</span>
							</div>
							<div className="message_content">
								<a className="message_sender">
									message_sender
								</a>
								<span className="message_star_holder">
									<img className="star" />
								</span>
								<span className="message_body">
									Message body
								</span>
								<div className="message_actions_container">
									Actions
								</div>
							</div>
						</div>
					)
				})}
			</div>
		);
	}
}