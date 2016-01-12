import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
require('./LoadingZone.scss')

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { pushState } from 'redux-router';

import * as useractions from '../../actions/user';

@connect(state => ({
	user: state.user.user,
	logged_in: state.user.logged_in,
	assignments: state.sets.assignments
	}), 
	dispatch => ({
		...bindActionCreators({
			...useractions,
			pushState
		}, dispatch)
	})
)
export default class LoadingZone extends Component {
	static propTypes = {
	}

	state = {
		height: null,
		width: null
	}

	componentDidMount() {
		let browserWindow = $(window)[0],
		browserHeight = browserWindow.innerHeight, browserWidth = browserWindow.innerWidth;
		
	}

	componentWillReceiveProps(nextProps) {
		const { logged_in, assignments, user } = nextProps;
		if(logged_in && user.creation !== undefined) {
			setTimeout(() => {
				this.props.hideLoadingZone()
			}, 850)
		}
	}

	render() {
		let { rendered, logged_in } = this.props,
		backgroundBgLarge = require('../../assets/backgroundPatternLarge.png'),
		browserWindow = $(window)[0],
		browserHeight = browserWindow.innerHeight, browserWidth = browserWindow.innerWidth;
		return(
			<div 
			style={{
				height: browserHeight,
				width: browserWidth,
				position: 'fixed'
			}}
			id="loading_zone" 
			className={classnames("display_flex", {'rendered': rendered}, {'loggedIn': logged_in})}>
				<div id="loading_welcome">
					<h3>Loading...</h3>
					<p>You're awesome</p>
				</div>
			</div>
		);
	}
}