import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class EndDisplayHelp extends Component {
	static propTypes = {
	}

	render() {
		const { paddingHeight } = this.props;
		return(
			<div style={{}} id="end_help">
				<div id="end_display_help">
					<div style={{height: paddingHeight}} id="end_display_padder">
					</div>
					<div id="end_display_meta">
						<h1 className="small_bottom_margin set_name">
							<a>Set name</a>
						</h1>
						<p className="small_bottom_margin set_intro">
							This is the very beginning of the set_name thread. Welcome to the future.
						</p>
						<ul className="end_display_actions">
							<li>
								<img className="settings icon"/>
								<a>Change settings</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}