import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import moment from 'moment';

// @connect (state => state.user.sets, state.router.location)

import SideNavSetListItem from './SideNavSetListItem';

@connect(state => ({
	sets: state.sets.sets,
	assignments: state.sets.assignments,
	assignment: state.setView.assignment
	}),
	dispatch => ({
		...bindActionCreators({
			pushState
		}, dispatch)
	})
)
export default class SetList extends Component {
	static propTypes = {
		sets: PropTypes.array
	}

	componentDidMount() {
		$(this.refs['set_header']).tooltip({
			delay: { show: 400, hide: 50},
			template: '<div class="tooltip tooltip-side side_tool" role="tooltip"><div class="tooltip-arrow-left"></div><div class="tooltip-inner"></div></div>'
		});
		$(this.refs['set_action']).tooltip({
			delay: { show: 400, hide: 50},
			template: '<div class="tooltip side_tool" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
		})
	}

	render() {
		let { sets, params, assignments, pushState } = this.props,
			  add_circle_icon = require('../../assets/add_circle_icon.png');
		sets.sort((set1, set2) => {
			return (moment(set1.creation).isBefore(set2.creation)) ? -1 : 1
		})
		assignments = assignments
		.filter(ass => ass.set.finalized !== null || ass.set.finalized == false)
		.filter(a => !a.deleted)
		.sort((a1, a2) => {
			return (moment(a1.studied).isBefore(a2.studied)) ? 1 : -1
		})
		let id = params !== undefined ? params.id : ''
		return(
			<div className="sidenav_sets_wrapper">
				<span 
				ref="set_action"
				data-toggle="tooltip"
				title="Create new set"
				onClick={() => pushState(null, '/createset')} 
				className="octicon plus">
					<img style={{height: '17.5px', width: '17.5px'}} src={add_circle_icon}/>
				</span>
				<h2 ref='set_header' 
					className="sidenav_header" 
					data-toggle="tooltip" 
					title="Browse all sets">
					<span className="sidenav_header_label">
					Sets ({sets.length})
					</span>
				</h2>
				<ul className="sidenav_list">
					{
						assignments.map((assig, i) => { 
							return (
								<SideNavSetListItem {...this.props}
				 									 assig={assig}
													 index={i} 
													 key={'side' + assig.id + i} />
								)
							})
					}					
					<Link to="/createset" className="sidenav_create list_more">Create a study set...</Link>
				</ul>
			</div>
		);
	}
}

// <img src={add_circle_icon} 
// 	 ref="set_action"
// 	 className="new_set_icon"
// 	 data-toggle="tooltip" 
//   	 title="Create a study set"></img>