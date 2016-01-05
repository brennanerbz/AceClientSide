import React, { Component, PropTypes } from 'react';
import classnames from 'classnames'; 

export default class AccountSettings extends Component {
	static propTypes = {
	}

	render() {
		const email = require('../../assets/email.png'),
		password = require('../../assets/password.png'),
		settings = require('../../assets/big_settings.png'),
		privacy = require('../../assets/privacy.png'),
		user_icon = require('../../assets/fill_user.png'),
		delete_icon = require('../../assets/delete.png'),
		{ user, enterPassword, changeUser, updateUser } = this.props;
		return(
			<article className="user_settings">
				<section className="setting">
					<header className="title">
						<img  src={email} />
						<h1>Change Email</h1>
					</header>
					<div className="box">
						<form className="settings">
							<h2>Email Address</h2>
							<p>Your email is <strong>{user.email}</strong></p>
							<label>
								<strong>Current Password</strong>
								<input 
								onChange={(e) => enterPassword(e.target.value)}
								className="text" 
								type="password" 
								name="currentPassword"/>
							</label>
							<label>
								<strong>New Email</strong>
								<input 
								onChange={(e) => changeUser('email', e.target.value)}
								className="text" 
								name="newEmail"/>
							</label>
							<button className="button primary">Update Email</button>
						</form>
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
								<input
								onChange={(e) => enterPassword(e.target.value)}
								className="text" 
								type="password" 
								name="currentPassword"/>
							</label>
							<label>
								<strong>New Password</strong>
								<input 
								onChange={(e) => changeUser('password', e.target.value)}
								className="text" 
								type="password" 
								name="newPassword"/>
							</label>
							<button className="button primary">Save Password</button>
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
		);
	}
}

/*
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
				<strong>Username</strong>
				<input 
				type="text"
				value={user.username}
				onChange={(e) => changeUser('username', e.target.value)}
				className="text" 
				name="newUsername"/>
			</label>
			<button className="button primary">Update Username</button>
		</form>
	</div>
</section>
*/