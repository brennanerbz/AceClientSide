import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';


export default class SequenceProgress extends Component {
	static propTypes = {
	}

	state = {
		
	}

	render() {
		return(
			<div id="sequence_control">
				<button id="start_sequence_over" className="button outline tertiary">
					Start over
				</button>
				<div id="sequence_progress_count">
					8 of 24
				</div>
				<div id="sequence_progress_bar">
					Progress bar
				</div>
			</div>
		);
	}
}