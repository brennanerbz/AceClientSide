import React, { Component, PropTypes } from 'react';
require('./QuickPractice.scss');
import LearnInput from '../../Learn/LearnInput/LearnInput';

class VoidInput extends Component {
	render() {
		const lock_icon = require('../../../assets/lock_icon.png');
		return (
			<div className="void_input">
				<span><img className="lock_icon" src={lock_icon}/></span>
				<span>To enable quick mode and see progress, <a className="link">start practicing</a></span>
			</div>
		);
	}
}

export default class QuickPractice extends Component {
	static propTypes = {
	}

	state = {
		hasStudied: false
	}

	parseQuickCue(set) {
		let cue = set.items[0].cue;
		cue = cue.toLowerCase().slice(0, -1) + '?';
		return (
			<p>What is {cue}</p>
		);
	}

	render() {
		const { set } = this.props;
		return(
			<div className="quick_practice">
				<div className="quick_cue">
					{::this.parseQuickCue(set)}
				</div>
				<div className="quick_input">
					{
						this.state.hasStudied
						? <LearnInput />
						: <VoidInput />
					}
				</div>
			</div>
		);
	}
}