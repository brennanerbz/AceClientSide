import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
require('../Header.scss')

import ActiveSetHeader from '../Views/ActiveSetHeader';

export default class HeaderContainer extends Component {
	static propTypes = {
	}

	state = {
		
	}

	render() {
		return(
			<div id="header" className="">
				<div id="set_header">
					<ActiveSetHeader />
				</div>
			</div>
		);
	}
}