import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import HelpButton from '../Views/HelpButton';
import InputForm from '../Views/InputForm';

export default class InputContainer extends Component {
	static propTypes = {
	}

	state = {
		isFocused: true
	}

	render() {
		const { isFocused } = this.state;
		return(
			<div style={{height: '42px'}} id="input_container">
				<HelpButton 
					isFocused={isFocused}
				/>
				<InputForm 
					{...this.props}
					handleInputFocus={() => this.setState({isFocused: true})}
					handleInputBlur={() => this.setState({isFocused: false})}
					isFocused={isFocused}
				/>
			</div>
		);
	}
}