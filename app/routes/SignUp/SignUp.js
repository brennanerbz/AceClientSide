import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import { Link } from 'react-router';
import { pushState } from 'redux-router';

require('../LoginPage/LoginPage.scss')
require('../LandingPage/LandingPage.scss')
import SignUpForm from '../LandingPage/SignUpForm';


@connect(state => ({
	user: state.user.user,
	logged_in: state.user.logged_in,
	router: state.router
	}), 
	dispatch => ({
		...bindActionCreators({
			pushState
		}, dispatch)
	})
)
export default class SignUp extends Component {
	static propTypes = {
	}

	render() {
		const brand_logo = require('../../components/Header/assets/FlunkLogo.png'),
			 { pushState } = this.props;
		return(
			<div className="sign_in_page_container">
				<div className="sign_in_page">
					<div className="sign_in_content">
						<div className="logo"
							 onClick={() => pushState(null, '/')}>
							<img src={brand_logo}/>
						</div>
						<SignUpForm shouldAutoFocus={true} />
						<div className="backup">
							Already have an account? &nbsp;
							<a className="link"
							   onClick={() => pushState(null, '/login')}>
							   Log In
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