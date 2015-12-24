import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import SlotProgress from '../Views/SlotProgress';
import SlotPreview from '../Views/SlotPreview';

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
						<SlotProgress/>
						<SlotPreview/>
					</span>
				</li>
			</div>
		);
	}
}