import React, { Component, PropTypes } from 'react';

export default class SearchPersonItem extends Component {
	static propTypes = {
	}

	render() {
		const user_pic = require('../../../assets/profile_pic.png'),
			  default_pic = require('../../../assets/empty_account_3.png'),
			  { user, pushState } = this.props;
		return(
			<li className="search_user_item">
				<div className="user_pic_container">
					<img src={user.profile_pic !== null ?  default_pic : user.profile_picture } 
						 className="user_pic"
						 onClick={() => pushState(null, `/profile/${user.id}`)}/>
				</div>
				<div className="user_content">
					<h4 className="username"
						onClick={() => pushState(null, `/profile/${user.id}`)}>
						{user.username}
					</h4>
					<span className="fullname">{user.first_name} {user.last_name}</span>					
					<div className="user_stats">Created {user.sets_created_count} sets</div>
				</div>
			</li>
		);
	}
}

/*

TODO: flip the default and user pic when actual images come in

*/