import React, { Component, PropTypes } from 'react';
import InputContainer from '../Containers/InputContainer';
import NotificationBar from './NotificationBar';

export default class FooterView extends Component {
	static propTypes = {
	}

	render() {
		return(
			<div>
				<InputContainer />
				<NotificationBar/>
			</div>
		);
	}
}