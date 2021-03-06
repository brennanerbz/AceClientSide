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
			slotsLength = this.props.slotsLength || 0, // DATA
			completedSlots = this.props.completedSlots || 0, // DATA
			innerWidth = completedSlots / slotsLength * containerWidth;
		this.setState({
			$progressBar: $progressBar,
			$progressBarInner: $progressBarInner,
			containerWidth: containerWidth,
			slotsLength: slotsLength,
			completedSlots: completedSlots,
			innerWidth: isNaN(innerWidth) ? 0 : innerWidth
		});
	}

	componentWillReceiveProps() {
		const { completedSlots, slotsLength } = this.props
		var innerWidth = completedSlots / slotsLength * this.state.containerWidth,
			previousInnerWidth = this.state.innerWidth
		if(previousInnerWidth !== innerWidth) {
			if(!isNaN(previousInnerWidth) && !isNaN(innerWidth)) {
				this.animateProgressBar(previousInnerWidth, innerWidth)
			}
		}
		this.setState({
			completedSlots: completedSlots,
			slotsLength: slotsLength,
		});
	}

	animateProgressBar(start, end) {
		this.setState({
			renderProgress: true
		});
		$("#sequence_progress_bar > span").each(function() {
		  $(this)
		    .data("origWidth", $(this).width())
		    .width(start)
		    .animate({
		      width: end 
		    }, 1200);
		});
		setTimeout(() => {
			this.setState({
				innerWidth: end
			});
		}, 1200)
	}

	render() {
		const { completedSlots, slotsLength, innerWidth, renderProgress } = this.state,
		{ createNewSequence } = this.props,
		replayIcon = require('../../../../assets/replay.png')
		return(
			<div id="sequence_control">
				<div id="sequence_control_wrapper">
					<div id="progress_wrapper">
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
				</div>
			</div>
		);
	}
}


/* 

Start over ---

<div id="start_over"
	 onClick={createNewSequence}>
	<span className="circle" id="start_over_circle">
		<img 
			style={{
				height: '13px',
				marginTop: '1px'
			}}
			src={replayIcon} 
			className="icon" 
			id="start_over_icon"/>
	</span>
	<span id="start_over_text">
	Start Over
	</span>
</div>


*/