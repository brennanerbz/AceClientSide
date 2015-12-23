import React, { Component, PropTypes } from 'react';
import classnames from 'classnames'
require('../Header.scss')

export default class HeaderContainer extends Component {
	static propTypes = {
	}

	render() {
		return(
			<div id="header" className="">
				<div id="set_header">
					<h2 id="active_set_header" className="overflow_ellipsis">
						<span className="star icon">Star</span>
						<span className="name">
							<span className="prefix">
								Prefix
								<img className="icon"/>
							</span>
							Set title
						</span>
						<i id="set_actions" className="">
							Actions
						</i>
					</h2>
				</div>
			</div>
		);
	}
}