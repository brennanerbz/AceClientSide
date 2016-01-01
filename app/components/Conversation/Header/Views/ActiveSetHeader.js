import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import SetName from './SetName';
import SetActions from './SetActions';

export default class ActiveSetHeader extends Component {
	static propTypes = {
	}

	render() {
		return(
			<h2 id="active_set_header" className="overflow_ellipsis">
				<span className="star icon">Star</span>
				<SetName/>
				<SetActions />
			</h2>
		);
	}
}