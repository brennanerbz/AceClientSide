import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { pushState } from 'redux-router';
import classnames from 'classnames';
/* Styles */
const styles = require('../styles/global.scss');
/* Components */
import Header from '../components/Header/Header';
import SideNav from '../components/SideNav/SideNav';

import LandingPage from './LandingPage/LandingPage';
import Home from './Home/Home';

import * as actions from '../actions/usersets';
import * as user from '../actions/user';

@connect(
	state => ({ 
		router: state.router,
		logged_in: state.user.logged_in,
		showing_error: state.error_page.show_error
	 }),
	dispatch => ({
		...bindActionCreators({
			...actions,
			...user,
			pushState
		}, dispatch)
	})
)
export default class FlunkApp extends Component {
	static propTypes = {
		children: PropTypes.any,
		dispatch: PropTypes.func,
		error: PropTypes.string
	}


	componentWillMount() {
		const { fetchAssignments, checkLoggedIn, fetchUser, pushState, router } = this.props; 
		if(checkLoggedIn().logged_in) fetchUser()
	}

	renderSideNav() {
		let route = this.props.router.location.pathname,
			count = route.match(/\//g).length,
			regex = count >= 2 ? /\/(.*?)\// : /\/(.*)/,
			root_path;
		route !== '/' ? root_path = regex.exec(route)[1] : root_path = '/'
		if     (root_path == 'createset'
			 || root_path == 'learn'
			 || this.props.showing_error
			 || root_path == 'error'
			 || !this.props.logged_in) { return; }
		else if(root_path == 'set'
			 || root_path == 'settings'
			 || root_path == 'search'
			 || root_path == 'profile'
			 || route == '/') {
			return (
				<SideNav {...this.props} root_path={root_path} />
			);
		}
		else if(route !== '/') { return }
	}

	render() {
		let route = this.props.router.location.pathname,
			count = route.match(/\//g).length,
			regex = count >= 2 ? /\/(.*?)\// : /\/(.*)/,
			root_path;
		route !== '/' ? root_path = regex.exec(route)[1] : root_path = '/'
		var childrenWithProps = React.Children.map(this.props.children, (child) => {
			return React.cloneElement(child, { root_path: root_path })
		})
		return( 
			<div>
				<Header root_path={root_path}/>
				<div className={classnames("outer_shell", {
					"void": root_path == '/' && !this.props.logged_in
				})}>
					{::this.renderSideNav()}
					{childrenWithProps}
				</div>
			</div>
		);
	}
}