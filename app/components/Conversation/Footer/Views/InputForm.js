import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class InputForm extends Component {
	static propTypes = {
	}

	render() {
		return(
			<form style={{height: '42px'}} id="input_form">
				<textarea id="input" className=""/>
				<a id="answer_link">
					Answer
				</a>
			</form>
		);
	}
}