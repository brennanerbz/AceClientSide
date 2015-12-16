import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

/* Child components */
import Related from './Related';
import MultipleChoice from './MultipleChoice';
import Target from './Target';

export default class Help extends Component {
	static propTypes = {
	}

	renderHelp() {
		const { current_trial } = this.props;
		
		// recall | pic | related | augN | nonemc | mc | stem | peek | copy
		switch(current_trial.format) {
			case 'recall':
				return;
			case 'related':
				return;
			case 'nonemc':
			case 'mc':
			 	return (
			 		<MultipleChoice choices={current_trial.mc_choices !== undefined ? current_trial.mc_choices : null}/>
			 	) 
			case 'stem':
			case 'peek':
			case 'copy':
				return (
					<Target diff={current_trial.format} stem={current_trial.stem} target={current_trial.target}/>
				)
			case 'aug':
			default:
				break;
		}
	}

	render() {
		const { current_trial, current_slot } = this.props;
		return(
			<li className="bot">
				<div className="message help">
					<div className="">
						<p className={classnames("diff_label", 
							{'mc_label': current_trial.format == 'mc' || current_trial.format == 'nonemc'  })}>
						{ 
							(current_trial.format == 'mc' || current_trial.format == 'nonemc')
							&& "Multiple Choice:"
						}
						{
							current_trial.format == 'stem'
							&& "Fill in the blank:"
						}
						{
							(current_trial.format == 'copy' || current_trial.format == 'peek')
							&& 'Correct answer:'
						}
						</p>
					</div>
					{
						::this.renderHelp()
					}
				</div>
			</li>
		);
	}
}