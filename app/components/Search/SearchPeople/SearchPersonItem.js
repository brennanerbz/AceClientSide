import React, { Component, PropTypes } from 'react';
import moment from 'moment';

export default class SearchPersonItem extends Component {
	static propTypes = {
	}

	render() {
		const user_pic = require('../../../assets/profile_pic.png'),
			  randomBgNum = Math.floor(Math.random() * 5),
			  backgroundPatternUrl = require(`../../../assets/backgroundPattern${randomBgNum + 1}.png`),
			  { user, pushState } = this.props;
		return(
			<li className="user_list_item">
				<div className="right">
				</div>
				<a onClick={() => pushState(null, `/profile/${user.id}`)} className="member_image_wrapper">	
					<img src={backgroundPatternUrl} className="member_image thumb_48"/>
				</a>
				<div className="user_list_info">
					<a onClick={() => pushState(null, `/profile/${user.id}`)} className="user_list_username">
						{user.username}
					</a>
					{
						user.show_real_name
						&&
						<span className="user_list_fullname">{user.first_name}&nbsp;{user.last_name}</span>
					}
					<ul className="user_list_meta text_small text_muted">
						{
							user.school !== null && user.school !== undefined
							&&
							<li>
								<span>
									<span className="octicon school"></span>
									{user.school}
								</span>
							</li>
						}
						<li>
							<span>
								<span className="octicon clock"></span>
								Joined on {moment(user.creation).format('MMMM Do YYYY')}
							</span>
						</li>
					</ul>
				</div>
			</li>
		);
	}
}

/*

<li className="search_user_item">
	<div className="user_pic_container">
		<img src={user.profile_pic !== null ?  default_pic : user.profile_picture } 
			 className="user_pic"
			 />
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
*/
/*

TODO: flip the default and user pic when actual images come in

*/