import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';


export default class LargeTextArea extends Component {
	static propTypes = {
	}

	state = {
		value: ''
	}

	render() {
		const { noTextError } = this.props;
		return(
			<textarea
				id="import_textarea"
				type="text"
				autoFocus={true}
				name="import_textarea"
				placeholder="Copy and Paste any piece of text (from your class notes, slides, an article or website, etc...)"
				onFocus={() => {
					this.props.resetError()
				}}
				onChange={(e) => {
					this.props.resetError()
					this.props.handleTextChange(e.target.value)
				}}>
			</textarea>
		);
	}
}