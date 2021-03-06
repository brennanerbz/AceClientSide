import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';


export default class LargeTextArea extends Component {
	static propTypes = {
	}

	state = {
		value: ''
	}

	componentDidMount() {
		if(this.props.importVisible) {
			this.focusOnRender()
		}
	}

	componentWillReceiveProps(nextProps) {
		const { importVisible, noTextError } = nextProps;
		if((!this.props.importVisible && importVisible) || this.props.importVisible) {
			this.focusOnRender()
		}
		if(noTextError) {
			this.refs.import_textarea.focus()
		}
	}

	focusOnRender() {
		setTimeout(() => {
			this.refs.import_textarea.focus()
		}, 10)
	}

	render() {
		const { noTextError } = this.props;
		return(
			<textarea
				id="import_textarea"
				ref="import_textarea"
				className={classnames({'error': noTextError})}
				type="text"
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