import React, { Component, PropTypes } from 'react';
import moment from 'moment';

require('../Style/SetList.scss');
import Modal from '../../Modal/modal';
import SetListView from '../Views/SetListView';

export default class SetListContainer extends Component {
	static propTypes = {
		assignments: PropTypes.array,
		sets: PropTypes.array
	}

	state = {
		assignments: null,
		sets: null,
		modalType: null,
		modalIsOpen: false,
		selectedAssignment: null,
		selectedSet: null,
		selectedModalType: null
	}

	componentDidMount() {
		this.setState({
			assignments: this.props.assignments,
			sets: this.props.sets
		});
	}

	render() {
		const { selectedAssignment, 
				selectedSet, 
				modalType, 
				modalIsOpen } = this.state;
		return(
			<div id="browse_box">
				<div id="browse_box_wrapper">
				<div id="browse_flex">
				<div id="browse_container_wrapper">
				<div id="browse_container">
				<div id="scroll_wrapper">
				<div className="recent_view">
					<div style={{display: 'none'}} className="recent_header">
						<div className="recent_header_wrapper">
						<div style={{width: '100%'}} className="col">
							<div style={{paddingLeft: '25px'}} className="col_content">
								Name
							</div>
						</div>
						<div style={{position: 'relative', width: '217px'}} className="col">
							<div className="col_content">
							Creator
							</div>
						</div>
						<div style={{textOverflow: 'ellipsis', width:'160px'}} className="col">
							<div className="col_content">
							Shared with
							</div>
						</div>
						<div style={{width:'104px'}} className="col">
						</div>
						</div>
					</div>
					<SetListSections 
					openModal={(assignment, set, type) => {
						this.setState({
							selectedAssignment: assignment,
							selectedSet: set,
							modalType: type,
							modalIsOpen: true
						});
					}}
					{...this.props}/>
				</div>
				<Modal 
					assignment={selectedAssignment}
					deleteAssignment={this.props.deleteAssignment}
					updateSet={this.props.updateSet}
					open={modalIsOpen}
					closeModal={() => {this.setState({modalIsOpen: false})}}
					type={modalType}
					set={selectedSet}
				/>
				</div>
				</div>
				</div>
				</div>
				</div>
			</div>
		);
	}
}
class SetListSections extends Component {
	static propTypes = {
	}

	render() {
		const { assignments } = this.props,
				sections = this.computeSections(assignments.filter(a => !a.deleted)) // FILTER DELETED ASSIGNMENTS
		return(
			<ul className="recent_view_sections">				
				{ 
					this.renderSections(sections).map(val => {
						return val;
					})
				}
			</ul>
		);
	}

	computeSections(assignments) {
		let sections = {
			drafts: [],
			today: [],
			yesterday: [],
			this_week: [],
			last_week: [],
			two_weeks_ago: [],
			three_weeks_ago: [],
			months: []
		},
			month,
			assignment,
			study_date,
			today_date = moment().utc(),
			diff;

		for(var i = 0; i < assignments.length; i++) {
			assignment = assignments[i];
			study_date = assignment.studied !== null 
			? moment.utc(assignment.studied).format() 
			: moment.utc(assignment.creation).format()
			diff = today_date.diff(study_date, 'days')
			if(assignment.set.finalized == null || assignment.set.finalized == false) {
				sections.drafts.push(assignment)
			}
			else if(diff == 0) {
				sections.today.push(assignment)
			}
			else if(diff == 1) {
				sections.yesterday.push(assignment)
			} else if (1 < diff && diff <= 6) {
				sections.this_week.push(assignment)
			} else if (6 < diff && diff <= 13) {
				sections.last_week.push(assignment) 
			} else if (13 < diff && diff <= 20) {
				sections.two_weeks_ago.push(assignment)
			} else if (20 < diff && diff <= 26) {
				sections.three_weeks_ago.push(assignment)
			}
			
			if(!(moment(today_date).isSame(study_date), 'month')) {
				month = moment.month(study_date)
				sections.months.push({
					month: month,
					assignment: assignment
				})
			}
		}
		if(sections.months.length > 0) {
			sections.months = sections.months.reduce((months, m) => {
				months[m[0]] = months[m[0]] || []
				months[m[0]].push({
					assignment: m[1]
				})
			}, [])
		}
		for(var m in sections) {
			if(m == 'drafts') {
				sections[m].sort((a1, a2) => {
					return (moment(a1.creation).isBefore(a2.creation)) ? 1 : -1
				})
			} else {
				sections[m].sort((a1, a2) => {
					return (moment(a1.studied).isBefore(a2.studied)) ? 1 : -1
				})
			}
		}
 		return sections;
	}

	renderSections(sections) {
		let rendered_sections = [],
			section_name;
		for(var prop in sections) {
			if(sections.hasOwnProperty(prop)) {
				if(sections[prop].length > 0) {
					if(prop.indexOf('_') !== -1) {
						section_name = prop.split("_").join(" ")
					} else {
						section_name = prop;
					}
					rendered_sections.push(
						<li key={prop} className="recent_section">
							{
								!this.props.profile
								&&
								<h1 className="recent_section_title">{
									section_name.charAt(0).toUpperCase() + section_name.slice(1)
								}</h1>
							}
							<SetListView 
								pushState={this.props.pushState}
								deleteAssignment={this.props.deleteAssignment}
								updateSet={this.props.updateSet}
								section={section_name} 
								assignments={sections[prop]} 
								openModal={this.props.openModal}
								profileView={this.props.profile}/>
						</li>
					)
				}					
			}
		}
		return rendered_sections;
	}
}








