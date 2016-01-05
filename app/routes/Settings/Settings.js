import React, { Component, PropTypes } from 'react';
import classnames from 'classnames'; 
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import usersettings from './'
require('./Settings.scss');


@connect(state => ({
		user: state.user.user
	}),
	dispatch => ({
		...bindActionCreators({
			// ...usersettings
		}, dispatch)
	})
)
export default class Settings extends Component {
	static propTypes = {
	} 

	state = {
		welcomeWords: ['Welcome', 'Hola', 'Greetings', 'Howdy', 'Buenos dias', 'Hi', 'Nice to have you']
	}

	render() {
		let { user } = this.props,
			  member_image = require('../../assets/message_profile_pic.png'),
			  email = require('../../assets/email.png'),
			  password = require('../../assets/password.png'),
			  settings = require('../../assets/big_settings.png'),
			  privacy = require('../../assets/privacy.png'),
			  user_icon = require('../../assets/fill_user.png'),
			  delete_icon = require('../../assets/delete.png'),
			  { welcomeWords } = this.state,
			  randomWordIndex = Math.floor(Math.random()*welcomeWords.length),
			  welcomeWord = welcomeWords[randomWordIndex]
		return(
			<div className="main_content settings_page">
				<h1 className="welcome_user">
					<img src={member_image} className="member_image thumb_32"/>
					{welcomeWord}, {user.first_name}
				</h1>
				<div className="tabs_container">
					<ul className="tabs_list">
						<li className={classnames('tab_item', {'active': true})}>	
							<a>Settings</a>
						</li>
						<li className={classnames('tab_item right_most', {'active': false})}>	
							<a>Profile</a>
						</li>
					</ul>
				</div>
				<article className="user_settings">
					<section className="setting">
						<header className="title">
							<img  src={email} />
							<h1>Change Email</h1>
						</header>
						<div className="box">
							<form className="settings">
								<h2>Email Address</h2>
								<p>Your email is currently <strong>{user.email}</strong></p>
								<label>
									<strong>New Email</strong>
									<input className="text" name="newEmail"/>
								</label>
								<label>
									<strong>Ace Password</strong>
									<input className="text" type="password" name="currentPassword"/>
								</label>
								<button className="button primary">Update Email</button>
							</form>
							<p className="reset_password">
								If you forgot your password, you can <a>reset your password</a>.
							</p>
						</div>
					</section>
					<section className="setting">
						<header className="title">
							<img  src={password} />
							<h1>Change your Password</h1>
						</header>
						<div className="box">
							<form className="settings">
								<h2>Password</h2>
								<label>
									<strong>Current Password</strong>
									<input className="text" name="currentPassword"/>
								</label>
								<label>
									<strong>New Password</strong>
									<input className="text" type="password" name="newPassword"/>
								</label>
								<label>
									<strong>Confirm New Password</strong>
									<input className="text" type="password" name="confirmPassword"/>
								</label>
								<button className="button primary">Update Password</button>
							</form>
							<p className="reset_password">
								If you forgot your password, you can <a>reset your password</a>.
							</p>
						</div>
					</section>
					<section className="setting">
						<header className="title">
							<img  src={user_icon} />
							<h1>Change your Username</h1>
						</header>
						<div className="box">
							<form className="settings">
								<h2>Username</h2>
								<p>You can only change your username <b>twice per hour.</b> Choose wisely.</p>
								<label>
									<strong>New Username</strong>
									<input className="text" name="currentPassword"/>
								</label>
								<label>
									<strong>Ace Password</strong>
									<input className="text" type="password" name="newPassword"/>
								</label>
								<button className="button primary">Update Username</button>
							</form>
							<p className="reset_password">
								If you forgot your password, you can <a>reset your password</a>.
							</p>
						</div>
					</section>
					<section className="setting">
						<header className="title">
							<img  src={delete_icon} />
							<h1>Deactivate Account</h1>
						</header>
						<div className="box">
							<form className="settings">
								<h2>Deactivate your account</h2>
								<p id="deactivate">Your material and files will be kept safe if your account is ever reactivated. </p>
								<button className="button danger">Deactivate {user.username}</button>
							</form>
						</div>
					</section>
					
				</article>
			</div>
		);
	}
}