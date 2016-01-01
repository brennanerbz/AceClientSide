import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class SlotPreview extends Component {
	static propTypes = {
	}

	state = {
		
	}

	render() {
		const { slot } = this.props;
		return(
			<span id="slot_preview">
				{ slot.censored_cue }
			</span>
		);
	}
}