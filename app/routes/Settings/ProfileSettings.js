import React, { Component, PropTypes } from 'react';
import classnames from 'classnames'; 
import FileInput from 'react-file-input'

export default class ProfileSettings extends Component {
	static propTypes = {
	}

	state = {
		dataURI: null
	}

	handleUploadPhoto(e) {
		var self = this,
		file = e.target.files[0],
		reader = new FileReader(),
		dataURI;
		reader.onload = (upload) => {
			dataURI = upload.target.result;
	    	self.setState({
	    		dataURI: dataURI,
	    	});
	    	this.props.uploadUserPhoto(dataURI)
	    }
	    reader.readAsDataURL(file);
	}

	render() {
		const { user, changeUser, updateUser } = this.props,
		userProfilePic = require('../../assets/message_profile_pic.png');
		return(
			<article id="edit_profile_container" className="user_settings  display_flex flex_direction_column very_large_bottom_margin">
				<div id="edit_profile_wrapper">
				<div className="profile_row display_flex flex_wrap position_relative">
					<p className="settings_col span_2_of_3">
						<label for="first_name">First name</label>
						<input 
						className="no_bottom_margin" 
						type="text" 
						name="first_name" 
						placeholder="First name"
						value={user.first_name}
						onChange={(e) => changeUser('first_name', e.target.value)}/>
					</p>
					<div id="edit_member_image" className="settings_col">
						<label for="first_name">Profile photo</label>
						<span className="member_image_wrapper">
							<FileInput 
							value=""
							name="member_image"
							accept=".png,.jpg,.jpeg"
							className="member_image_upload"
							onChange={::this.handleUploadPhoto}/>
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
						<input 
						type="text" 
						name="last_name" 
						placeholder="Last name" 
						value={user.last_name}
						onChange={(e) => changeUser('last_name', e.target.value)}/>
					</p>
				</div>
				<div className="profile_row">
					<p className="settings_col span_2_of_3">
						<label for="username">Username</label>
						<input 
						type="text" 
						name="username" 
						placeholder="Username" 
						value={user.username}
						onChange={(e) => changeUser('username', e.target.value)}/>
						<span className="input_note">You can only change your username twice per hour. Choose wisely.</span>
					</p>
				</div>
				<div className="profile_row">
					<p style={{marginTop: '-5px'}} className="settings_col span_1_of_1">
						<label for="username">School</label>
						<input 
						type="text" 
						name="username" 
						placeholder="School" 
						value={user.school}
						onChange={(e) => changeUser('username', e.target.value)}/>
						<span className="input_note">Where do you currently attend?</span>
					</p>
				</div>
				<div className="profile_row">
					<p className="settings_col top_margin bottom_margin span_2_of_3">
						<button 
						onClick={updateUser}
						className="button primary ">
						Save changes
						</button>
					</p>
				</div>
				</div>
			</article>
		);
	}
}