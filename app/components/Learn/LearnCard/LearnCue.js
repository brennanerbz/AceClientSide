import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class LearnCue extends Component {
	static propTypes = {
		cue: PropTypes.string
	}

	shouldComponentUpdate(nextProps) {
		return this.props.cue == nextProps.cue
	}

	renderCue(cue, target, correct) {
		if(cue == null) return { __html: null }
		let index = cue.toLowerCase().indexOf(target.toLowerCase())
		if(index !== -1) {
			if(correct) {
				console.log(index)
				var re = new RegExp('(^|\\s)(' + target + ')(\\s|$)','ig')
				if(index > 1) {
					target = target.toLowerCase()
				} else {
					target = target.charAt(0).toUpperCase() + target.slice(1)
				}
				cue = cue.replace(re, `$1<b>${target}</b>$3`)
			} else {
				cue = cue.replace(new RegExp(target + ',', "gi"), target);
				cue = cue.replace(new RegExp('(^|\\s)(' + target + ')(\\s|$)','ig'), '$1<b class="blurry_text">&nbsp;$2&nbsp;</b>$3')
			}
		}
		return {
			__html: cue
		}
	}

	render() {
		const { cue, current_slot, showCorrect } = this.props;
		let target = current_slot.association.item.target;
		return(
			<div>
				{
					cue !== (undefined || null)
					? <p key={current_slot.id} className="cue" dangerouslySetInnerHTML={::this.renderCue(cue, target, showCorrect)}></p>
					: null
				}
			</div>
		);
	}
}