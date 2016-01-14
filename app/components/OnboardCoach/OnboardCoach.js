import React, { Component, PropTypes } from 'react';
require('./OnboardCoach.scss');

export default class OnboardCoach extends Component {
	static propTypes = {
	}

	renderSetsCoach = () => {
		return(
			<div id="coach_sets_div" className="coach_div">
				<div className="coach_message">
					<h2>These are your study sets</h2>
					<p>Sets are a way to organize and practice the concepts you're studying. Sets can be public or private.</p>
				</div>
			</div>
		)
	}

	/*
	renderImportCoach() {
		return(
		)
	}

	renderSearchCoach() {
		return(
		)
	}

	renderFilesCoach() {
		return(
		)
	}

	*/

	render() {
		const coachSetsStyle = {
			opacity: '1',
		    height: 'auto',
		    width: 'auto',
		    top: '167px',
		    left: '185px'
		},
		coachLeftArrowStyle = {
			top: '26px',
		    left: '-10px'
		}
		return(
			<div 
			style={coachSetsStyle} 
			id="onboard_coach" 
			className="sets_onboard_div">
				<div style={coachLeftArrowStyle} id="coach_arrow"></div>
				<div id="coach_content">
					{
						true
						&&
						this.renderSetsCoach()
					}
					<div id="coach_footer">
						<a className="button coach_got_it right">Got it</a>
					</div>
				</div>
			</div>
		);
	}
}




