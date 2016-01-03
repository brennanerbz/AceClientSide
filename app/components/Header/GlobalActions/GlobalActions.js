import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
require('./GlobalActions.scss')

export default class GlobalActions extends Component {
	static propTypes = {
	}

	render() {
		const createIcon = require('../../../assets/createIcon.png'),
		importIcon = require('../../../assets/importIcon.png')
		return(
			<div id="global_actions">
				<a className="action create">
					<img className="icon" src={createIcon}/>
					Create a study set
				</a>
				<a className="action import">
					<img style={{left: '2px'}} className="icon" src={importIcon}/>
					Import
				</a>
			</div>
		);
	}
}