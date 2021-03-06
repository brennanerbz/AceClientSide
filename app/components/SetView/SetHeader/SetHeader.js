import React, { Component, PropTypes } from 'react';
require('./SetHeader.scss');
import { Link } from 'react-router';
/* Components */
import DifficultyButton from '../../DifficultyButton/DifficultyButton';
import SubSetActions from './SubSetActions';

export default class SetHeader extends Component {
	static propTypes = {
		
	}


	/*
	STAR ICON FOR SET
	<span className="star">
		<img style={{height: '15px'}} className="star_icon" src={starIcon}/>
	</span>
	*/

	render() {
		const image = require('../../../assets/set_profile_image.png'),
		lockIcon = require('../../../assets/lockIcon.png'),
		starIcon = require('../../../assets/star.png'),
		{ title, item_count, creator_username, creator_id, id, pushState, starred, set } = this.props,
		learn_route = starred ? `/convo/${id}/starred` : `/convo/${id}`
		return(
			<span className="set_header">				
				<div className="page_header_wrapper header_info inline_info">
					<span className="title_wrapper">
						{
							set.visibility == 'private'
							&&
							<img className="set_icon lock" src={lockIcon}/>
						}
						<h1 className="page_header set_title">{title}</h1>
					</span>
					<span>
						<p className="set_author">
							{set.associations_count} terms by 
							<a className="link creator_link"
							   onClick={() => pushState(null, `/profile/${creator_id}`)}>
								{creator_username}
							</a>
						</p>
					</span>
				</div>
				<div className="main_actions">
					<Link to={learn_route}>
						<button className="button primary">
						Learn</button>
					</Link>
					<SubSetActions set_header={true}
								   ref="subactions"
								   {...this.props}/>
				</div>
			</span>
		);
	}
}

					// <DifficultyButton/>
// 