import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';

export default class SideNavSetListItem extends Component {
	static propTypes = {
		set: PropTypes.object
	}

	render() {
		const { index, assignment, assignments, assig, loc } = this.props,
			set = assig.set,
			set_name = set.title.toLowerCase(),
			set_icon = require('../../assets/set_icon_lines.png'),
			set_icon_active = require('../../assets/set_icon_white.png');
		let path = loc.pathname.split('/')[2]
		return(
			<li className={classnames("sidenav_setitem", {"active": path == set.id })}>
				<Link to={`/set/${set.id}`} className="sidenav_setitem_name">
					<span className="overflow_ellipsis">
						<span className="prefix_icon">
							<img src={set_icon} className="set_icon"/>
						</span>
						{set_name}
					</span>
				</Link>
			</li>
		);
	}
}
