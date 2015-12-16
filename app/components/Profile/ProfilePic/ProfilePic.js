import React, { Component, PropTypes } from 'react';

export default class ProfilePic extends Component {
	static propTypes = {

	}

	render() {
		const profile_pic = require('../../../assets/profile_pic.png');
		return(
			<span className="profile_pic_container">
				<img src={profile_pic} className="profile_pic_image"/> 
			</span>
		);
	}
}