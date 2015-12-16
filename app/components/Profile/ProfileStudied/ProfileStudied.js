import React, { Component, PropTypes } from 'react';
import SetListContainer from '../../SetList/SmartComponents/SetListContainer';

/*
@connect/dispatch
call /user/:id/studied
*/
export default class ProfileStudied extends Component {
	static propTypes = {
	}

	render() {
		let sets = this.props.studied_sets,
			length = this.props.studiedset_count,
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
						<h1 className="set_count"><b>{username}</b> hasn't studied any sets</h1>
					</div>
				}
			</div>
		);
	}
}