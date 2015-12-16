import React, { Component, PropTypes } from 'react';

export default class ProfileInfo extends Component {
	static propTypes = {
	}

	render() {
		const info = require('../../../assets/set_details_blue.png');
		return(
			<div className="profile_info">
				<div className="section_header set_details">
					<span className="section_icon">
						<img src={info} className="info_icon header_icon"/>
					</span>
					<span className="section_header_label">
						User Details
					</span>
				</div>
				<div className="profile_details">
					<div className="purpose">
						<p className="info_header">School</p>
						<p className="info_child">Villanova University</p>
					</div>					
					<div className="supplemental_details">
						<p className="created_details">Created 118 terms</p>
					</div>
				</div>
			</div>
		);
	}
}