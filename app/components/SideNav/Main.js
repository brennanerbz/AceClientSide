import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';

export default class Main extends Component {
	static propTypes = {
		
	}

	render() {
	    let recent_icon = require('../../assets/recent_light.png'),
	    	sets = require('../../assets/files_light.png'),
	    	homeIcon = require('../../assets/homeIcon.png'),
	    	profileIcon = require('../../assets/profileIcon.png'),
	    	settingsIcon = require('../../assets/settingsIcon.png'),
	    	settings = require('../../assets/settings_icon.png'),
	    	{ root_path, user_id, params } = this.props;
		return(
			<div className="sidenav_main">				
				<h2 className="sidenav_header">
					<span className="sidenav_header_label">
					Main
					</span>
				</h2>				
				<ul className="sidenav_list">
					<li className={classnames("sidenav_setitem", 
						{"active": root_path == '/'})}>
						<Link to="/" className="sidenav_setitem_name">
							<span className="overflow_ellipsis">
								<span className="prefix_icon">
									<img src={homeIcon} className="set_icon  home_icon"/>
								</span>
								Home
							</span>
						</Link>
					</li>

					<li className={classnames("sidenav_setitem", 
						{"active": root_path == 'profile' && user_id == params.id})}>
						<Link to={`/profile/${user_id}`} className="sidenav_setitem_name">
							<span className="overflow_ellipsis">
								<span className="prefix_icon">
									<img src={profileIcon} className="set_icon"/>
								</span>
								Profile
							</span>
						</Link>
					</li>
					<li className={classnames("sidenav_setitem", 
						{"active": root_path == 'settings'})}>
						<Link to="/settings" className="sidenav_setitem_name">
							<span className="overflow_ellipsis">
								<span style={{marginRight: '0.4em'}} className="prefix_icon">
									<img src={settingsIcon} className="set_icon"/>
								</span>
								Settings
							</span>
						</Link>
					</li>
				</ul>
			</div>	
		);
	}
}


// -- Include supplemental user_name 
// <div className="sidenav_profile_info">
// 	<i className="side_icon active_icon"></i>
// 	<span className="user_name">
// 	Brennan Erbeznik
// 	</span>
// </div>