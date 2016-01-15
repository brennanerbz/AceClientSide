import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { pushState } from 'redux-router';
import classnames from 'classnames';
/* Styles */
const styles = require('../styles/global.scss');
require('./App.scss')
/* Components */
import Header from '../components/Header/Header';
import SideNav from '../components/SideNav/SideNav';
import LandingPage from './LandingPage/LandingPage';
import Home from './Home/Home';
import LoadingZone from '../components/LoadingZone/LoadingZone';
import ImportModal from '../components/Modal/ImportModal';
import OnboardCoach from '../components/OnboardCoach/OnboardCoach';
/* Actions */
import * as actions from '../actions/usersets';
import * as user from '../actions/user';
/* Velocity package */
// require('velocity-animate');
// require('velocity-animate/velocity.ui');
require('ladda/dist/ladda-themeless.min.css');
require('ladda/dist/ladda.min.js');
require('ladda/dist/spin.min.js');

@connect(
	state => ({ 
		router: state.router,
		logged_in: state.user.logged_in,
		showing_error: state.error_page.show_error,
		showLoadingZone: state.user.showLoadingZone
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

	state = {
		show_notification: false,
		error_msg: false,
		error_type: 0,
		success_msg: false,
		openImportModal: false,
		showOnboard: true
	}

	onlinePoll = {}

	pollConnection() {
		let online = window.navigator.onLine
		if(!online) {
			this.setState({
				show_notification: true,
				error_msg: true
			})
		} else if (online) {
			this.setState({
				show_notification: false,
				error_msg: false
			})
		}
	}

	componentWillMount() {
		const { fetchAssignments, checkLoggedIn, fetchUser, pushState, router } = this.props; 
		if(checkLoggedIn().logged_in) fetchUser()
		this.onlinePoll = setInterval(() => {
			::this.pollConnection()
		}, 2500)
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

	componentWillUnmount() {
		clearInterval(this.onlinePoll)
	}

	componentDidMount() {
		this.setState({
			showOnboard: true
		});
	}

	render() {
		let route = this.props.router.location.pathname,
			count = route.match(/\//g).length,
			regex = count >= 2 ? /\/(.*?)\// : /\/(.*)/,
			root_path,
			{ showLoadingZone } = this.props,
			{ showOnboard } = this.state;
		route !== '/' ? root_path = regex.exec(route)[1] : root_path = '/'
		var childrenWithProps = React.Children.map(this.props.children, (child) => {
			return React.cloneElement(child, { 
				root_path: root_path,
				openImportModal: () => this.setState({openImportModal: true})
			})
		})
		return( 
			<div>
				<LoadingZone
					rendered={showLoadingZone}
				/>
				<div className={classnames('main_app', {'rendered': !showLoadingZone})}>
					<Header 
					root_path={root_path}
					openImportModal={() => this.setState({openImportModal: true})}/>
					<div className={classnames("outer_shell", {
						"void": root_path == '/' && !this.props.logged_in || (root_path == 'convo')
					})}>
						{
							this.state.showOnboard
							&&
							<OnboardCoach
								closeOnboard={() => this.setState({showOnboard: false})}
							/>
						}
						
						<ImportModal
						open={this.state.openImportModal}
						closeModal={() => this.setState({openImportModal: false})}
						type="import"
						/>
						{::this.renderSideNav()}
						{childrenWithProps}
					</div>
					<div className="notify_wrapper">
						<span id="notify" 
							  className={classnames(
							  	{
							  		'hide': !this.state.show_notification
							  	},
							  	{
							  		'success': this.state.success_msg
							  	},
							  	{
							  		'error': this.state.error_msg
							  	}
							  	)}>
							<span className="notify_msg">
								{
									this.state.error_msg 
									&& 'Apologies, trouble connecting to Acuit. Hang on tight.'
								}
							</span>
						</span>
					</div>
				</div>
			</div>
		);
	}
}