import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class SetName extends Component {
	static propTypes = {
	}

	render() {
		return(
			<span className="name">
				<span className="prefix">
					Prefix
					<img className="icon"/>
				</span>
				Set title
			</span>
		);
	}
}