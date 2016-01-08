import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import { Link } from 'react-router';
import { pushState, replaceState } from 'redux-router';

import * as useractions from '../../../actions/user';

@connect(state => ({
	user: state.user.user,
	logged_in: state.user.logged_in,
	router: state.router
	}), 
	dispatch => ({
		...bindActionCreators({
			...useractions,
			pushState,
			replaceState
		}, dispatch)
	})
)
export default class QuickLogIn extends Component {
	static propTypes = {

	}

	state = {
		email: null,
		password: null,
		focused: false,
		isLoggingIn: false,
		showError: false
	}

	submitLogIn() {
		this.setState({isLoggingIn: true})
		const { getToken, pushState, replaceState} = this.props;
		getToken(this.state.email, this.state.password, replaceState)
		setTimeout(() => {
			this.setState({
				isLoggingIn: false,
				focused: false,
				email: null,
				password: null
			})
		}, 250)
	}

	componentDidMount() {
		this.setState({
			focused: true,
			isLoggingIn: false
		})
		this.refs.email.focus()
	}

	componentWillUnmount() {
		this.setState({
			focused: false,
			isLoggingIn: false
		})
	}

	render() {
		const { pushState } = this.props;
		return(
			<ul className="nav_log_in">
				<li className="email">
					<label>Email</label>
					<input 
					id="sign_in_email" 
					className="" 
					ref="email"
					type="text"
					onChange={(e) => {
						this.setState({email: e.target.value})
					}}/>
					<div id="keep_wrapper">
						<input id="keep_logged_in" type="checkbox"/>
						<a>Keep me logged in</a>
					</div>
				</li>
				<li className="password">
					<label>Password</label>
					<input 
					id="sign_in_password" 
					className="" 
					type="password"
					onChange={(e) => {
						this.setState({password: e.target.value})
					}}
					onKeyDown={(e) => {
						if(e.keyCode == 13) { 
							::this.submitLogIn() 
						}
					}}/>
					<a>Forgot password?</a>
				</li>
				<li 
				style={{
					display: 'inline-flex'
				}}
				className="log_in_button_wrapper">
					<button 
					style={{
						height: '32px',
						fontSize: '14px',
						lineHeight: '1.1rem'
					}} 
					className={classnames("button primary")}
					onClick={::this.submitLogIn}>
						Log In
					</button>
				</li>
			</ul>
		);
	}
}