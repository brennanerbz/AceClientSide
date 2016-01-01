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
		const { currentSlotId, slot, index } = this.props;
		return(
			<div className={classnames({'active_slot': slot.id == currentSlotId })} id="slot_wrapper">
				<li className={classnames(`slot`)}>
					<span className="overflow_ellipsis">
						<SlotProgress
							slotCompleted={slot.completed}
						/>
						<SlotPreview
							slot={slot}
						/>
					</span>
				</li>
			</div>
		);
	}
}