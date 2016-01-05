import React, { Component, PropTypes } from 'react';
import classnames from 'classnames'; 

export default class ProfileSettings extends Component {
	static propTypes = {
	}

	render() {
		const { user } = this.props,
		userProfilePic = require('../../assets/message_profile_pic.png');
		return(
			<article id="edit_profile_container" className="user_settings  display_flex flex_direction_column very_large_bottom_margin">
				<div id="edit_profile_wrapper">
				<div className="profile_row display_flex flex_wrap position_relative">
					<p className="settings_col span_2_of_3">
						<label for="first_name">First name</label>
						<input className="no_bottom_margin" type="text" name="first_name" placeholder="First name" value={user.first_name}/>
					</p>
					<div id="edit_member_image" className="settings_col">
						<label for="first_name">Profile photo</label>
						<span className="member_image_wrapper">
							<span 
							style={{
								backgroundImage: `url(${userProfilePic})` 
							}} 
							className="member_image thumb_192"></span>
						</span>
					</div>
				</div>
				<div className="profile_row">
					<p className="settings_col span_2_of_3">
						<label for="last_name">Last name</label>
						<input type="text" name="last_name" placeholder="Last name" value={user.last_name}/>
					</p>
				</div>
				<div className="profile_row">
					<p className="settings_col span_2_of_3">
						<label for="username">Username</label>
						<input type="text" name="username" placeholder="Username" value={user.username}/>
						<span className="input_note">You can only change your username twice per hour. Choose wisely.</span>
					</p>
				</div>
				<div className="profile_row">
					<p className="settings_col top_margin bottom_margin span_2_of_3">
						<button className="button primary">Save changes</button>
					</p>
				</div>
				</div>
			</article>
		);
	}
}