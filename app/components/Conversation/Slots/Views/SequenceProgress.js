import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';


export default class SequenceProgress extends Component {
	static propTypes = {
	}

	state = {
		$progressBar: null,
		$progressBarInner: null,
		containerWidth: null,
		innerWidth: 0,
		slotsLength: 0,
		completedSlots: 0,
		renderProgress: false
	}

	componentDidMount() {
		let $progressBar = $(this.refs.sequence_progress_bar),
			$progressBarInner = $(this.refs.progress_bar_inner),
			containerWidth = $progressBar[0].clientWidth,
			slotsLength = 24, // DATA
			completedSlots = 12, // DATA
			innerWidth = completedSlots / slotsLength * containerWidth;
		this.setState({
			$progressBar: $progressBar,
			$progressBarInner: $progressBarInner,
			containerWidth: containerWidth,
			slotsLength: slotsLength,
			completedSlots: completedSlots,
			innerWidth: innerWidth
		});
		setTimeout(() => {
			this.animateProgressBar()
		}, 1)
	}

	animateProgressBar() {
		this.setState({
			renderProgress: true
		});
		$("#sequence_progress_bar > span").each(function() {
		  $(this)
		    .data("origWidth", $(this).width())
		    .width(0)
		    .animate({
		      width: $(this).data("origWidth") 
		    }, 1200);
		});
	}

	render() {
		const { slotsLength, completedSlots, innerWidth, renderProgress } = this.state;
		return(
			<div id="sequence_control">
				<button id="start_sequence_over" className="button outline tertiary">
					Start over
				</button>
				<div id="sequence_progress_count">
					{`${completedSlots} of ${slotsLength}`}
				</div>

				<div ref="sequence_progress_bar" 
					 id="sequence_progress_bar">
					<span 
						style={{width: innerWidth, opacity: renderProgress ? '1': '0' }}
						ref="progress_bar_inner" 
						id="progress_bar_inner">
					</span>
				</div>
			</div>
		);
	}
}