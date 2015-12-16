import React, { Component, PropTypes } from 'react';

export default class ProfileName extends Component {
	static propTypes = {
		username: PropTypes.string,
		full_name: PropTypes.string
	}

	render() {
		const { username, full_name } = this.props;
		return(
			<div className="profile_name_container">
				<h4 className="profile_username">{username}</h4>
				<span className="profile_fullname">{full_name}</span>
			</div>
		);
	}
}