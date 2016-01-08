import React, { Component, PropTypes } from 'react';
require('./LoginPage.scss')
require('../LandingPage/LandingPage.scss')
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import { Link } from 'react-router';
import { pushState } from 'redux-router';

import * as useractions from '../../actions/user';

@connect(state => ({
	user: state.user.user,
	logged_in: state.user.logged_in,
	showLogInEmailError: state.user.showLogInEmailError,
	showLogInPasswordError: state.user.showLogInPasswordError,
	router: state.router
	}), 
	dispatch => ({
		...bindActionCreators({
			...useractions,
			pushState
		}, dispatch)
	})
)
export default class LogInPage extends Component {
	static propTypes = {
	}

	state = {
		email: null,
		emailError: false,
		password: null,
		passwordError: false
	}

	componentDidMount() {
		const { showLogInEmailError, showLogInPasswordError } = this.props;
		if(showLogInEmailError) {
			this.setState({
				emailError: true
			});
		}
	}

	componentWillReceiveProps(nextProps) {
		const { showLogInEmailError, showLogInPasswordError } = nextProps;
		this.setState({
			emailError: showLogInEmailError,
			passwordError: showLogInPasswordError
		});
		if(showLogInEmailError) {
			$(this.refs.email).focus() 
		}
		if(!showLogInEmailError && showLogInPasswordError) $(this.refs.password).focus()
	}

	handleLogIn() {
		const { logIn, pushState, getToken } = this.props;
		getToken(this.state.email, this.state.password, pushState, true)
		this.setState({
			email: null,
			password: null
		})
	}

	render() {
		const brand_logo = require('../../components/Header/assets/FlunkLogo.png'),
			  account = require('../../assets/empty_account_2.png'),
			  g_icon = require('../../assets/google_logo.png'),
			  f_icon = require('../../assets/facebook_logo.png'),
			  error_icon = require('../../assets/error_icon.png'),
			  { pushState, router } = this.props,
			  { emailError, passwordError } = this.state;
		return(
			<div className="sign_in_page_container">
				<div className="sign_in_page">
					<div className="sign_in_content">
						<div className="logo"
							 onClick={() => pushState(null, '/')}>
							<img src={brand_logo}/>
						</div>
						<div className="card">
							<div className="header">
								<h4>Log In</h4>
							</div>
							<form className="sign_in"
								  onSubmit={(e) => {
								  	e.preventDefault()
								  	::this.handleLogIn()
								  }}>
								{
									emailError
									&&
									<div className="error"
										 style={{
										 	position: 'absolute',
										 	left: '-25px',
										 	top: '3.5px'

										 }}>
										<img src={error_icon} 
											style={
												{
													height: '14.5px',
													marginTop: '0'
												}
											}
											/>
									</div>
								}
								<input className={classnames({'error': this.state.emailError})}
									   placeholder="Email"
									   ref="email"
									   type="text"
									   autoFocus={true}
									   value={this.state.email}
									   onChange={(e) => {
									   	this.setState({
									   		email: e.target.value,
									   		emailError: false
									   	});
									   }}
									   />
								{
									passwordError
									&&
									<div className="error"
										 style={{
										 	position: 'absolute',
										 	left: '-25px',
										 	top: '40.5px'
										 }}>
										<img src={error_icon} 
											style={
												{
													height: '14.5px',
													marginTop: '0'
												}
											}
											/>
									</div>
								}
								<input className={classnames({'error': this.state.passwordError})}
									   type="password"
									   ref="password"
									   placeholder="Password"
									   value={this.state.password}
									   onChange={(e) => {
									   	this.setState({
									   		password: e.target.value,
									   		passwordError: false
									   	});
									   }}
									   onKeyDown={(e) => {
									   	if(e.which == 13) {
									   		::this.handleLogIn()
									   	}
									   }}
									   />
								<button className="button primary"
									    onClick={() => {
									    	::this.handleLogIn()
									    }}>
									Log In 
								</button>
								<a style={{fontSize: '14.5px'}}>Forgot password?</a>
							</form>
						</div>
						<div className="backup">
							Don't have an account?  &nbsp;
							<a className="link"
							   onClick={() => pushState(null, '/signup')}>
							   Create account
							</a>
						</div>
					</div>
				</div>
				<div className="close"
					 onClick={() => pushState(null, '/')}>
					<div className="close_icon material-icons">
						clear
					</div>
				</div>
			</div>
		);
	}
}

/*
<div className="day_divider">
	<hr className="separator"/>
	<i className="copy_only"/>
	<div className="day_divider_label">
		or
	</div>
</div>

// <div className="sign_up_group">
// 	<button className="google_button button">
// 		<img className="icon" 
// 			 src={g_icon}/>
// 		Log in with Google
// 	</button>
// 	<button className="facebook_button button">
// 		<img className="icon"
// 			 src={f_icon}/>
// 		Log in with Facebook
// 	</button>
// </div>

*/