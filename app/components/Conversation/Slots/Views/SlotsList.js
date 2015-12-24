import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import SlotContainer from '../../Slot/Containers/SlotContainer';

export default class SlotsList extends Component {
	static propTypes = {
	}

	state = {
		
	}

	render() {
		return(
			<ul id="slots_list">
				{
					Array.from({length: 15}).map(a => {
						return <SlotContainer />
					})
				}
			</ul>
		);
	}
}