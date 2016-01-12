import React, { Component, PropTypes } from 'react';
import classnames from 'classnames'; 
import LaddaButton from 'react-ladda';
import Modal from '../../components/Modal/modal';


export default class AccountSettings extends Component {
	static propTypes = {
	}

	state = {
		emailLoading: false,
		passwordLoading: false,
		deactivateModalOpen: false,
		deactivateLoading: false,
		email: '',
		oldPassword: '',
		newPassword: ''
	}

	handleEmailChange() {
		this.setState({
			emailLoading: true
		});
		const { updateUser } = this.props;
		updateUser()
		setTimeout(() => {
			this.setState({
				emailLoading: false,
				email: ''
			});
		}, 1000)
	}

	handlePasswordChange() {
		this.setState({
			passwordLoading: true
		});
		const { updateUser } = this.props;
		updateUser()
		setTimeout(() => {
			this.setState({
				passwordLoading: false,
				oldPassword: '',
				newPassword: ''
			});
		}, 1000)
	}

	handleDeactivateAccount() {
		this.setState({
			deactivateLoading: true
		});
		// const { updateUser } = this.props,
		// deactivatedUser = { deactivated: true }
		// updateUser(deactivatedUser)
		setTimeout(() => {
			this.setState({
				deactivateLoading: false,
				deactivateModalOpen: false
			});
		}, 1000)
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
				<Modal 
					open={this.state.deactivateModalOpen}
					closeModal={() => this.setState({deactivateModalOpen: false})}
					deactivateAccount={true}
					handleDeactivateAccount={::this.handleDeactivateAccount}
					deactivateLoading={this.state.deactivateLoading}
					type="confirm"
				/>
				<section className="setting">
					<header className="title">
						<img  src={email} />
						<h1>Change Email</h1>
					</header>
					<div className="box">
						<form 
						onSubmit={(e) => e.preventDefault()}
						className="settings">
							<h2>Email Address</h2>
							<p>Your email is <strong>{user.email}</strong></p>
							<label>
								<strong>New Email</strong>
								<input 
								onChange={(e) => {
									changeUser('email', e.target.value)
									this.setState({
										email: e.target.value
									});
								}}
								value={this.state.email}
								className="text" 
								name="newEmail"/>
							</label>
							<LaddaButton 
							onClick={::this.handleEmailChange}
							loading={this.state.emailLoading}
							className="button primary"
							buttonStyle="expand-right"
							spinnerSize={28}
							spinnerColor="#fff">
								Update Email
							</LaddaButton>

						</form>
					</div>
				</section>
				<section className="setting">
					<header className="title">
						<img  src={password} />
						<h1>Change your Password</h1>
					</header>
					<div className="box">
						<form 
						onSubmit={(e) => e.preventDefault()}
						className="settings">
							<h2>Password</h2>
							<label>
								<strong>Current Password</strong>
								<input
								onChange={(e) => {
									enterPassword(e.target.value)
									this.setState({
										oldPassword: e.target.value
									})
								}}
								value={this.state.oldPassword} 
								className="text" 
								type="password" 
								name="currentPassword"/>
							</label>
							<label>
								<strong>New Password</strong>
								<input 
								onChange={(e) => {
									changeUser('password', e.target.value)
									this.setState({
										newPassword: e.target.value
									})
								}}
								className="text"
								value={this.state.newPassword} 
								type="password" 
								name="newPassword"/>
							</label>
							<LaddaButton 
							onClick={::this.handlePasswordChange}
							loading={this.state.passwordLoading}
							className="button primary"
							buttonStyle="expand-right"
							spinnerSize={28}
							spinnerColor="#fff">
								Save Password
							</LaddaButton>
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
						<form 
						onSubmit={(e) => e.preventDefault()}
						className="settings">
							<h2>Deactivate your account</h2>
							<p id="deactivate">Your material and files will be kept safe if your account is ever reactivated. </p>
							<button 
							onClick={() => this.setState({deactivateModalOpen: true})}
							className="button danger">
								Deactivate account
							</button>
						</form>
					</div>
				</section>
				
			</article>
		);
	}
}

/* CURRENT PASSWORD REQUIREMENT 
<label>
	<strong>Current Password</strong>
	<input 
	onChange={(e) => enterPassword(e.target.value)}
	className="text" 
	type="password" 
	name="currentPassword"/>
</label>

*/


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