import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';


export default class LargeTextArea extends Component {
	static propTypes = {
	}

	state = {
		value: ''
	}

	render() {
		return(
			<textarea
				id="import_textarea"
				type="text"
				name="import_textarea"
				placeholder="Copy and Paste any piece of text (from your class notes, slides, an article or website, etc...)"
				onChange={(e) => {
					this.setState({value: e.target.value})
				}}>
			</textarea>
		);
	}
}