import React, { Component, PropTypes } from 'react';
import SetListItemContainer from '../SmartComponents/SetListItemContainer';

export default class SetListView extends Component {
	static propTypes = {
		assignments: PropTypes.array // section of assignments
	}

	render() {
		
		return(
			<ol className="set_list">
				{
					this.props.assignments.map((assignment, i) => {
						return <SetListItemContainer 
								pushState={this.props.pushState} 
								section={this.props.section}
								key={i} 
								set={assignment.set}
								assignment={assignment}
								updateSet={this.props.updateSet}
								deleteAssignment={this.props.deleteAssignment}
								openModal={this.props.openModal}/>
					})
				}
			</ol>
		);
	}
}