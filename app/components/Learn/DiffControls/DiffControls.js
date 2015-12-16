import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
require('./DiffControls.scss');

export default class DiffControls extends Component {
	static propTypes = {
	}

	componentDidMount() {		
		$('[data-toggle="tooltip"]').tooltip({
			delay: { show: 1000, hide: 50},
			template: '<div class="tooltip bottom_tool" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
		})
	}

	
	shouldHideHintButton(trial_hints, slot_hints) {
		if((trial_hints && slot_hints) !== null && (trial_hints && slot_hints) !== undefined) {
			return slot_hints.length === 0 || slot_hints.slice(-1)[0].indexOf(trial_hints[0]) !== -1
		}
	}

	render() {
		const more = require('../../../assets/more_icon.png'),
			  trial_hints = this.props.trial !== undefined ? this.props.trial.augs : null,
			  slot_hints = this.props.current_slot !== undefined ? this.props.current_slot.augs : null,
			  shouldhide = ::this.shouldHideHintButton(trial_hints, slot_hints);  
		return(
			<span className="diff_controls">
				<button className={classnames("button outline", 
						 )}
					    onClick={this.props.getHint}>Hint</button>
			</span>
		);
	}
}


// <a className="toggle_btn"
//    ref="more_actions"				   
//    title="More actions"
//    data-toggle="tooltip" 
//    data-placement="bottom" >
// 	<i className="">
// 		<img className="diff_icon" src={more}/>
// 	</i>					
// </a>