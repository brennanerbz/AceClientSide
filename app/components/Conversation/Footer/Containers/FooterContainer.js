import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
require('../Footer.scss');

export default class FooterContainer extends Component {
	static propTypes = {
	}

	render() {
		return(
			<div id="footer">
				<div id="footer_overlay">
				</div>
				<div id="footer_msgs">
					<div style={{height: '42px'}} id="input_container">
						<a id="primary_help" className="">
							?
							<img className="question icon"/>
						</a>
						<form style={{height: '42px'}} id="input_form">
							<textarea id="input" className=""/>
						</form>
					</div>
					<div id="notifications_bar" className="wide">
						<div id="notification_text" className="overflow_ellipsis">
						</div>
						<div id="typing_text" className="overflow_ellipsis">
						</div>
					</div>
				</div>
			</div>
		);
	}
}