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
		const { textAreaValue, pushState } = this.state, { importText } = this.props;
		if(textAreaValue.length == 0) { 
			this.setState({noTextError: true})
			return;
		}
		importText(this.state.textAreaValue, pushState)
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.isImporting) this.setState({importing: true})
		if(!nextProps.isImporting) {
			setTimeout(() => {
				this.setState({importing: false})
			}, 1000)
		}
	}
	

	render() {
		const { noTextError, importing, textAreaValue } = this.state, { importVisible, isImporting } = this.props;
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
					importVisible={importVisible}
					noTextError={noTextError}
					resetError={() => {
						this.setState({noTextError: false})
					}}
				/>
				<div className="note">Give your text some sweet spunk by using markdown</div>
				<button 
					onClick={::this.handleSubmitText}
					id="import_text_btn" 
					disabled={this.state.textAreaValue.length == 0}
					className={classnames("button primary large ", 
						{'importing': importing},
						{'disabled': textAreaValue.length == 0})}>
					<span className="btn_text">Import</span>
					{
						importing
						&&
						<span className="spinner">
							<div className="sk-fading-circle">
							  <div className="sk-circle1 sk-circle"></div>
							  <div className="sk-circle2 sk-circle"></div>
							  <div className="sk-circle3 sk-circle"></div>
							  <div className="sk-circle4 sk-circle"></div>
							  <div className="sk-circle5 sk-circle"></div>
							  <div className="sk-circle6 sk-circle"></div>
							  <div className="sk-circle7 sk-circle"></div>
							  <div className="sk-circle8 sk-circle"></div>
							  <div className="sk-circle9 sk-circle"></div>
							  <div className="sk-circle10 sk-circle"></div>
							  <div className="sk-circle11 sk-circle"></div>
							  <div className="sk-circle12 sk-circle"></div>
							</div>
						</span>
					}
				</button>
			</div>
		);
	}
}