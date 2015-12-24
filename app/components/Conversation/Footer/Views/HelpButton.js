import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class HelpButton extends Component {
	static propTypes = {
	}

	render() {
		// add question mark icon and hover effects
		// add bubble menu
		return(
			<a id="primary_help" className="">
				? 
				<img className="question icon"/>
			</a>
		);
	}
}