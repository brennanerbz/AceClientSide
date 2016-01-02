import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
require('../Footer.scss');

/* Components */
import FooterOverlay from '../Views/FooterOverlay';
import FooterView from '../Views/FooterView';

export default class FooterContainer extends Component {
	static propTypes = {
	}

	state = {
		// TODO: call API with POST / PUT trial
		isFocused: false
	}

	handleUserResponse(response) {
		const { updateTrial } = this.props;
		updateTrial(response)
	}

	render() {
		const { currentTrial } = this.props;
		return(
			<div id="footer">
				<FooterOverlay/>
				<div id="footer_msgs">
					<FooterView 
						currentTrial={currentTrial}
						submitAnswer={(response) => {
							::this.handleUserResponse(response)
						}}
						handleFocus={() => this.setState({isFocused: true})}
					/>
				</div>
			</div>
		);
	}
}