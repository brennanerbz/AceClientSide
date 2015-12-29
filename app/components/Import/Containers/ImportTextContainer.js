import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import LargeTextArea from './LargeTextArea';

export default class ImportTextContainer extends Component {
	static propTypes = {
	}

	state = {
		textAreaValue: '',
		importing: false,
		noTextError: false
	}

	handleSubmitText() {
		const { textAreaValue } = this.state;
		if(textAreaValue.length == 0) this.setState({noTextError: true})
	}

	render() {
		const { noTextError } = this.state;
		return(
			<div id="import_text">
				<h2 className="heading">
					Instantly turn your text into a study set
				</h2>
				<LargeTextArea
					handleTextChange={(value) => {
						this.setState({
							textAreaValue: value
						});
					}}
					noTextError={noTextError}
					resetError={() => {
						this.setState({noTextError: false})
					}}
				/>
				<div className="note">Give your text some sweet spunk by using markdown</div>
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