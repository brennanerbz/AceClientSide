import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Main from './Main';
import SideNavSetList from './SideNavSetList';
require('./SideNav.scss');

@connect(state =>({
	loc: state.router.location,
	user_id: state.user.user.id
}))
export default class SideNav extends Component {
	static propTypes = {
		
	}

	componentDidMount = () => {
		$('.sidenav').height($(window).height() - 50)
		window.addEventListener('resize', this.resizeSideNav);
	}

	resizeSideNav = () => {
		$('.sidenav').height($(window).height() - 50)
	}

	render() {
		return(
			<div className="sidenav">
					<Main {...this.props}/>	
					<SideNavSetList {...this.props}/>
					<div className="clear_both"></div>
					<div className="page_footer">
						<ul className="footer_list">
							<li className="footer_link">
								<a>Help</a>
							</li>
							<li className="footer_link">
								<a>Privacy</a>
							</li>
						</ul>
					</div>
			</div>
		);
	}
}