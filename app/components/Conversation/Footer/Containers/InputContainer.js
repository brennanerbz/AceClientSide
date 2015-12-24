import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import HelpButton from '../Views/HelpButton';
import InputForm from '../Views/InputForm';

export default class InputContainer extends Component {
	static propTypes = {
	}

	state = {
		
	}

	render() {
		return(
			<div style={{height: '42px'}} id="input_container">
				<HelpButton />
				<InputForm />
			</div>
		);
	}
}