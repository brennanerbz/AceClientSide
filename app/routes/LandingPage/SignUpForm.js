import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushState } from 'react-redux';

import * as useractions from '../../actions/user';
require('./SignUpForm.scss');

// import validator from 'validator';
import Validation from 'react-validation';

@connect(state => ({
		user: state.user.user
	}),
	dispatch => ({
		...bindActionCreators({
			...useractions,
			pushState
		}, dispatch)
	})
)
export default class SignUpForm extends Component {
	static propTypes = {
	}

	state = {
		modal_version: false,
		first_name: null,
		last_name: null,
		password: null,
		email: null,
		email_error: false,
		username: null // temp
	}

	componentDidMount() {
		if(this.props.modal) {
			this.setState({
				modal_version: true
			})
		}
		setTimeout(() => {
			if(!this.props.last_call) {
				$(this.refs.first_name).focus()
			}
		}, 300)
	}

	handleSubmit() {
		const { signUp, pushState } = this.props;
		let user_info = {}
		for(var prop in this.state) {
			if(prop !== 'modal_version') {
				user_info[prop] = this.state[prop]
			}
		}
		signUp(user_info, pushState)
		this.setState({
			first_name: null,
			last_name: null,
			username: null,
			email: null,
			password: null
		})
	}


	renderRegularForm() {
		return(
			<form 
				className="sign_up_form"
				onSubmit={(e) => {
				  	e.preventDefault()
				  	::this.handleSubmit()
				}}>
				<input 
					ref="first_name" 
					placeholder="First name" 
					type="text"
					autoFocus={this.props.shouldAutoFocus}
					value={this.state.first_name}
					onChange={(e) => {
						this.setState({first_name: e.target.value})
					}}/>
				<input 
					placeholder="Last name"
					type="text"
					value={this.state.last_name}
					onChange={(e) => {
						this.setState({last_name: e.target.value})
					}}/>
				<input 
					placeholder="Email"
					type="text"
					value={this.state.email}
					onChange={(e) => {
						this.setState({email: e.target.value})
					}}/>
				<input 
					placeholder="Username"
					value={this.state.username}
					onChange={(e) => {
						this.setState({username: e.target.value})
					}}/>
				<input 
					type="password" 
					placeholder="Password"
					value={this.state.password}
					onChange={(e) => {
						this.setState({password: e.target.value})
					}}
					onInput={(e) => {
						if(e.which == 13) {
							::this.handleSubmit()
						}
					}}
					/>
				<p className="">
					By clicking Sign Up, you agree to our 
					<a>Terms of Service</a> and <a>Data Policy</a>
				</p>
				<button style={{
					fontSize: '16px',
					fontWeight: '600',
					background: '#1C93F4',
					borderColor: '#007BE8',
					height: '36px'
				}}className="button primary"
					    onClick={::this.handleSubmit}>
					   	Sign up for Beta
				</button>
			</form>
		)
	}

	validateEmail(email) {
	    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email);
	}

	handleBetaSubmit(e) {
		e.preventDefault()
		const { signUpWaitList, pushState } = this.props;
		let user_info = {}
		for(var prop in this.state) {
			if(prop == 'email') {
				user_info[prop] = this.state[prop]
			}
		}
		if(user_info.email == null || user_info.email.length === 0) return;
		if(this.props.onWaitlist) return;
		let validated = this.validateEmail(user_info.email)
		if(validated) {
			signUpWaitList(user_info, pushState)
			this.props.notify(user_info.email)
			this.setState({
				email: null,
				email_error: false
			})
		} else {
			this.setState({
				email_error: true
			});
		}
		
	}

	renderBetaForm() {
		const error_icon = require('../../assets/error_icon.png')
		return(
			<form
				className="sign_up_form"
				onSubmit={::this.handleBetaSubmit}>
				{
					this.state.email_error
					&&
					<div className="error"
						 style={{
						 	position: 'absolute',
						 	left: '-30px',
						 	top: '6.5px'

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
				<input
					readOnly={this.props.onWaitlist}
					className={classnames({'error': this.state.email_error}, {'disabled': this.props.onWaitlist})}
					name="email"
					placeholder={this.props.onWaitlist ? 'Thank you!' : 'Email address'}
					autoFocus={this.props.shouldAutoFocus}
					type="text"
					style={{
						height: '42px'
					}}
					id="beta_email"
					value={this.state.email}
					onChange={(e) => {
						this.setState({
							email: e.target.value,
							email_error: false
						})
					}}/>
				<button
					style={{
						fontSize: '17px',
						fontWeight: '600',
						background: '#1C93F4',
						borderColor: '#007BE8',
						height: '42px',
						marginTop: '5px'
					}}
					className={classnames("button primary", {"disabled": this.props.onWaitlist})}
				    onClick={::this.handleBetaSubmit}>
				    {
				    	this.props.onWaitlist
				    	? "On waitlist"
				    	: "Join Waitlist"
				    }
				</button>
			</form>
		)
	}

	render() {
		const g_icon = require('../../assets/google_logo.png'),
			  f_icon = require('../../assets/facebook_logo.png');
		return(
			<div className={classnames("sign_up_container", {'beta': this.props.beta})}>
				<div className={classnames({'beta': this.props.beta}, {'last_call': this.props.last_call}, 'card')}>
					{
						!this.state.modal_version && !this.props.beta
						&&
						<div className="message">
							{
								!this.props.last_call
								?
								<div>
									<h4>Sign Up</h4>
									<p>It's free.</p>
								</div>
								:
								<div>
									<h4 className="start_now">Ready to give it a try?</h4>
								</div>
							}
						</div>
					}
					{
						this.props.beta 
						&&
						<div className="message">
							{
								this.props.last_call
								&&
								<div>
									<h4 className="start_now">Ready to give it a try?</h4>
									<p className="access">Ace is currently in private beta. Sign up below and we'll send you an email when access is available.</p>
								</div>
							}
						</div>
					}
					{
						this.props.beta && ::this.renderBetaForm()
					}
					{
						!this.props.beta && ::this.renderRegularForm()
					}
					{
						this.props.beta && !this.props.last_call
						&&	<div>
								<p style={{
									paddingTop: '5px',
									fontSize: '14.5px',
									color: '#777777'
								}}>
								{
									!this.props.onWaitlist
									? 'We\'ll let you know when an early version is ready for you.'
									: 'You\'re on the waitlist! We\'ll contact you shortly.'
								}</p>
							</div>
					}
					{
						this.state.email_error
						&&
						<div className="error">
							<p className="err_msg">Oops! That looks like an invalid email address!</p>
						</div>
					}
				</div>
			</div>
		);
	}
}

















/* Facebook and Google */
// <div className="sign_up_group">
// 	<button className="google_button button">
// 		<img className="icon" 
// 			 src={g_icon}/>
// 		Sign up with Google
// 	</button>
// 	<button className="facebook_button button">
// 		<img className="icon"
// 			 src={f_icon}/>
// 		Sign up with Facebook
// 	</button>
// 	<div className="day_divider">
// 		<hr className="separator"/>
// 		<i className="copy_only"/>
// 		<div className="day_divider_label">
// 			or
// 		</div>
// 	</div>
// </div>