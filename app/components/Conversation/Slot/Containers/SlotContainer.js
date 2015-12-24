import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class SlotContainer extends Component {
	static propTypes = {
	}

	state = {
		
	}

	render() {
		return(
			<div id="slot_wrapper">
				<li className={classnames(`slot`)}>
					<span className="overflow_ellipsis">
						<span id="slot_progress">
							0
						</span>
						<span id="slot_preview">
							This is a preview of the slot, it should be the cue data
						</span>
					</span>
				</li>
			</div>
		);
	}
}