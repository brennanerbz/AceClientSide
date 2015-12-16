import React, { Component, PropTypes } from 'react';

export default class UserAnswer extends Component {
	static propTypes = {
	}

	render() {
		const { user_answer } = this.props;
		return(
			<li className="user">
					<div className="message">
						<p>{ user_answer }</p>
					</div>
			</li>
		);
	}
}
