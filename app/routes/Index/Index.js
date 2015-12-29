import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';

/* Load landing page or Home */
import LandingPage from '../LandingPage/LandingPage';
import Home from '../Home/Home';

@connect(state => ({
		router: state.router,
		logged_in: state.user.logged_in
	}),
	dispatch => ({
		...bindActionCreators({
			pushState
		}, dispatch)
	})
)
export default class Index extends Component {
	static propTypes = {
	}

	render() {
		return(
			<div>
				{
					!this.props.logged_in
					&& <LandingPage />
				}
				{
					this.props.logged_in
					&& <Home />
				}
			</div>
		);
	}
}