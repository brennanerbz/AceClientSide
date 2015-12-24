import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
require('../Footer.scss');

/* Components */
import FooterOverlay from '../Views/FooterOverlay';
import FooterView from '../Views/FooterView';

export default class FooterContainer extends Component {
	static propTypes = {
	}

	state = {
		// TODO: call API with POST / PUT trial
	}

	render() {
		return(
			<div id="footer">
				<FooterOverlay/>
				<div id="footer_msgs">
					<FooterView />
				</div>
			</div>
		);
	}
}