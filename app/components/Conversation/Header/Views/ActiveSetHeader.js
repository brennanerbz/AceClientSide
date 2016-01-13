import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import SetTitle from './SetTitle';
import SetActions from './SetActions';

export default class ActiveSetHeader extends Component {
	static propTypes = {
	}

	render() {
		const { setTitle, currentSequence, assignments, pushState } = this.props,
		currentSet = currentSequence.set
		// currentSet = assignments.filter(a => a.set_id == currentSequence.set_id)[0] || {}
		return(
			<h2 id="active_set_header" className="overflow_ellipsis">
				<span className="star icon">Star</span>
				<SetTitle
					pushState={pushState}
					currentSet={currentSet}
					currentSequence={currentSequence}
					setTitle={setTitle}
				/>
				<SetActions 
					currentSequence={currentSequence}
				/>
			</h2>
		);
	}
}