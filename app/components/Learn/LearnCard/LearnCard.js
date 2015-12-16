import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
require('./LearnCard.scss');
import Controls from './LearnNavControls'
import Signs from './LearnSignPosting';
import LearnHelp from '../LearnHelp/LearnHelp';
import LearnInput from '../LearnInput/LearnInput';

import LearnCue from './LearnCue';

export default class LearnCard extends Component {
	static propTypes = {
		
	}
	sendEvent(event, arg) {
		this.refs.learn_input.handleSubmit(event, arg)
	}
	render() {
		const { showCorrect, 
				showCompletedSeq, 
				slots, 
				cue,
				current_trial,
				current_slot } = this.props;
		return(
			<div>
			 	<div className="learn_card">
					<div className="">
						<div className="top_cue_container">
							
							{
								showCorrect
								? <h4 className="correct_label">
									{current_trial.feedback}
								  </h4>
								: null
							}
							{
								current_slot.association !== undefined
								&&
								<LearnCue {...this.props}/>
							}							
							{
								showCorrect
								? null
								: <a className="dont_know_btn link"
							   		 onClick={(event) => this.refs.learn_input.handleSubmit(event)}>
							  		 Hint
								 </a>
							}
						</div>
						<div className="help_divider">
							<hr className="separator"/>
							<i className="copy_only"/>
								<div className={classnames('help_divider_label')}>								
								</div> 
						</div>
						{
							!showCorrect && !showCompletedSeq
							? <LearnHelp {...this.props}/>
							: null
						}
						{
							showCorrect
							? null
							: <LearnInput ref="learn_input"
										  {...this.props}/>
						}												
					</div>
				</div>
			</div>
		);
	}
}


// <h4 className="card-title">Card title</h4>