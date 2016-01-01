import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import SlotContainer from '../../Slot/Containers/SlotContainer';

export default class SlotsList extends Component {
	static propTypes = {
	}

	state = {
		
	}

	render() {
		const { slots, currentSlotId } = this.props;
		console.log(slots)
		return(
			<ul id="slots_list">
				{
					slots.map((s, i)=> {
						return (
							<SlotContainer 
								slot={s}
								index={i}
								key={i}
								currentSlotId={currentSlotId}
							/>
						)
					})
				}
			</ul>
		);
	}
}