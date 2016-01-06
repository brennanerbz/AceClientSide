import React, { Component, PropTypes } from 'react';
import classnames from 'classnames'; 
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';

import * as userActions from '../../actions/user'
require('./Settings.scss');

import AccountSettings from './AccountSettings';

@connect(state => ({
		user: state.user.user
	}),
	dispatch => ({
		...bindActionCreators({
			...userActions,
			pushState
		}, dispatch)
	})
)
export default class Settings extends Component {
	static propTypes = {
	} 

	state = {
		user: {},
		password: '',
		welcomeWords: ['Welcome', 'Hola', 'Greetings', 'Howdy', 'Buenos dias', 'Hi', 'Nice to have you', 'Hello there'],
		welcomeWord: '',
		activeTab: 'settings'
	}

	componentDidMount() {
		let { user, updateUser } = this.props,
		{ welcomeWords } = this.state,
		randomWordIndex = Math.floor(Math.random()*welcomeWords.length),
		welcomeWord = welcomeWords[randomWordIndex]
		console.log(updateUser)
		this.setState({
			user: user,
			welcomeWord: welcomeWord
		})
	}

	componentWillReceiveProps(nextProps) {
		const { user } = nextProps;
		this.setState({
			user: user
		})
	}

	changeUser(key, value) {
		const { user } = this.props;
		user[key] = value
		this.setState({
			user: user
		});
	}

	updateUser() {
		const { user, password } = this.state,
		{ updateUser } = this.props;
		updateUser(user, password)
		this.setState({
			password: ''
		})
	}


	render() {
		let { user, pushState } = this.props,
			  member_image = require('../../assets/message_profile_pic.png'),
			  { welcomeWord, activeTab } = this.state,
			  settingsChildrenWithProps = React.Children.map(this.props.children, (child) => {
			  	return React.cloneElement(child, {
			  		user: user,
			  		enterPassword: (password) => this.setState({password: password}),
			  		changeUser: (key, value) => ::this.changeUser(key, value),
			  		updateUser: () => ::this.updateUser(),
			  		uploadUserPhoto: (file) => this.props.uploadUserPhoto(file)
			  	})
			  })
		return(
			<div className="main_content settings_page">
				<h1 className="welcome_user">
					<img src={member_image} className="member_image thumb_32"/>
					{welcomeWord}, {user.first_name}
				</h1>
				<div className="tabs_container">
					<ul className="tabs_list">
						<li 
						className={classnames('tab_item', {'active': activeTab == 'settings'})}
						onClick={() => {
							pushState(null, '/settings')
							this.setState({
								activeTab: 'settings'
							})
						}}>	
							<a>Settings</a>
						</li>
						<li 
						className={classnames('tab_item right_most', {'active':  activeTab == 'profile'})}
						onClick={() => {
							pushState(null, '/settings/profile')
							this.setState({
								activeTab: 'profile'
							})
						}}>	
							<a>Profile</a>
						</li>
					</ul>
				</div>
				{ settingsChildrenWithProps }
			</div>
		);
	}
}