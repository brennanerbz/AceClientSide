import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class SlotProgress extends Component {
	static propTypes = {
	}

	state = {
		
	}

	render() {
		const { slotCompleted } = this.props,
		check_mark = require('../../../../assets/check_mark.png')
		return(
			<span className={classnames("circle", {'completed_check_mark': slotCompleted})} id="slot_progress">
				{
					slotCompleted
					&&
					<img 
						style={{
							position: 'absolute',
							height: '8.5px',
							top: '4px'
						}}
						src={check_mark}
					/>
				}
			</span>
		);
	}
}