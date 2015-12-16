import React, { Component, PropTypes } from 'react';
import moment from 'moment';
require('./SetInfo.scss');
import SubSetActions from '../SetHeader/SubSetActions';

export default class SetInfo extends Component {
	static propTypes = {
	}

	renderSubjects(subjects) {
		let subs = [];
		subjects.forEach(sub => {
			subs.push("#" + sub)
		})
		return (
			subs.map((sub, i) => {
				if(i === 0) return <span className="first subject">{sub.toLowerCase()}</span>
				else return (
					<span className="subject">{sub.toLowerCase()}</span>
				)
			})
		)
	}
	
 
	render() {
	const { purpose, 
			subjects,
			set, 
			doc, 
			creator_username } = this.props,
	 	    info = require('../../../assets/set_details_blue.png');
		return(
			<div className="set_info">
				<div className="set_details">
					{
						purpose !== null && purpose.length > 0
						&&
						<div className="purpose">
							<p className="info_header">Purpose</p>
							<p className="info_purpose">
								{purpose}
							</p>
						</div>
					}
					{
						subjects !== null && subjects.length > 0
						&& 
						<div className="subject_list">
							<p className="info_header">Subjects</p>
							{
								::this.renderSubjects(subjects)
							}
						</div>
						
					}
					<div className="visibility">
						<p className="info_header">Viewable by</p>
						<p className="info_purpose">
							{set.visibility}
						</p>
					</div>
					<div className="editability">
						<p className="info_header">Editable by</p>
						<p className="info_purpose">
							{set.editability}
						</p>
					</div>
					<div className="supplemental_details">
						<p className="created_details">Created by {creator_username} on {moment(doc).format("MMMM Do")}</p>
					</div>
				</div>
			</div>
		);
	}
}