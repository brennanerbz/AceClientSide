import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import LargeTextArea from './LargeTextArea';

export default class ImportTextContainer extends Component {
	static propTypes = {
	}

	state = {
		importing: false
	}

	handleSubmitText() {

	}

	render() {
		return(
			<div id="import_text">
				<h2 className="heading">
					Instantly turn your text into a study set
				</h2>
				<LargeTextArea/>
				<span className="note">Give your text some sweet spunk by using markdown</span>
				<button 
					onClick={::this.handleSubmitText}
					id="import_text_btn" 
					className={classnames("button primary large", {'importing': this.state.importing})}>
					Import
				</button>
			</div>
		);
	}
}