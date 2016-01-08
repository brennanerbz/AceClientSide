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

	componentWillReceiveProps(nextProps) {
		const { logged_in, assignments } = nextProps;
		if(logged_in) {
			setTimeout(() => {
				this.props.hideLoadingZone()
			}, 1000)
		}
	}

	render() {
		const { rendered } = this.props;
		return(
			<div id="loading_zone" className={classnames("display_flex", {'rendered': rendered})}>
				<div id="loading_welcome">
					<h3>Loading...</h3>
					<p>You're awesome</p>
				</div>
			</div>
		);
	}
}