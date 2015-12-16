import React, { Component, PropTypes } from 'react';
require('./SetHeader.scss');
import { Link } from 'react-router';
/* Components */
import DifficultyButton from '../../DifficultyButton/DifficultyButton';
import SubSetActions from './SubSetActions';

export default class SetHeader extends Component {
	static propTypes = {
		
	}

	render() {
		const image = require('../../../assets/set_profile_image.png');
		const { title, item_count, creator_username, creator_id, id, pushState } = this.props;
		return(
			<span className="set_header">				
				<div className="page_header_wrapper header_info inline_info">
					<h1 className="page_header set_title">{title}</h1>
					<span>
						<p className="set_author">
							{item_count} terms by 
							<a className="link creator_link"
							   onClick={() => pushState(null, `/profile/${creator_id}`)}>
								{creator_username}
							</a>
						</p>
					</span>
				</div>
				<div className="main_actions">
					<Link to={`/learn/${id}`}>
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