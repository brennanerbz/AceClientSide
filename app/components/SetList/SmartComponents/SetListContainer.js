import React, { Component, PropTypes } from 'react';
import moment from 'moment';

require('../Style/SetList.scss');
import SetListView from '../Views/SetListView';

export default class SetListContainer extends Component {
	static propTypes = {
		assignments: PropTypes.array,
		sets: PropTypes.array
	}

	state = {
		assignments: null,
		sets: null
	}

	componentDidMount() {
		this.setState({
			assignments: this.props.assignments,
			sets: this.props.sets
		});
	}

	render() {
		return(
			<div className="recent_view">
				<SetListSections {...this.props}/>
			</div>
		);
	}
}
class SetListSections extends Component {
	static propTypes = {
	}

	render() {
		const { assignments } = this.props,
				sections = this.computeSections(assignments)
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
			study_date = moment.utc(assignment.studied)
			diff = today_date.diff(study_date, 'days')
			if(assignment.set.finalized == null) {
				sections.drafts.push(assignment)
			}
			else if(moment(today_date).isSame(study_date), 'day') {
				sections.today.push(assignment)
			}
			else if(diff === 1) {
				sections.yesterday.push(assignment)
			} else if (1 < diff <= 6) {
				sections.this_week.push(assignment)
			} else if (6 < diff <= 13) {
				sections.last_week.push(assignment) 
			} else if (13 < diff <= 20) {
				sections.two_weeks_ago.push(assignment)
			} else if (20 < diff <= 26) {
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
							<h1 className="recent_section_title">{
								section_name.charAt(0).toUpperCase() + section_name.slice(1)
							}</h1>
							<SetListView 
								pushState={this.props.pushState}
								deleteAssignment={this.props.deleteAssignment}
								section={section_name} 
								assignments={sections[prop]} />
						</li>
					)
				}					
			}
		}
		return rendered_sections;
	}
}








