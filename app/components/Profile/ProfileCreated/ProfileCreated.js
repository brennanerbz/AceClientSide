import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
/* Smart wrapper container for Recent Set List */
import SetListContainer from '../../SetList/SmartComponents/SetListContainer';

/*
@connect/dispatch
call /user/:id/created
*/
export default class ProfileCreated extends Component {
	static propTypes = {
	}

	render() {
		let sets = this.props.created_sets,
			length = this.props.createdset_count,
			{ profilestate, pushState } = this.props,
			username = profilestate.username;
		const null_sets = require('../../../assets/null_sets.png')
		return(
			<div>
			{
				length > 0
				&&
				<SetListContainer pushState={pushState} assignments={sets} profile={true}/>
			}
			{
				length <= 0
				&&
				<div className="no_sets">
					<img className="" src={null_sets}/>
					<h1 className="set_count"><b>{username}</b> hasn't created any sets</h1>
				</div>
			}
			</div>
		);
	}
}

// <h1 className="set_count">{username} has created {sets.length} sets</h1>