import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

require('rc-progress/assets/index.css');
var Line = require('rc-progress').Line;
var Circle = require('rc-progress').Circle;

import { circleProgress } from 'jquery-circle-progress';

export default class ItemProgress extends Component {
	static propTypes = {
	}

	state = {
		renderedProgressCircle: false
	}

	renderProgressCircle(_case, item) {
		let value = _case.hypothesis.forecast !== false ? _case.hypothesis.forecast[0][1] : 0,
		start_value = value !== 0 ? _case.hypothesis.storage_strength : 0,
		color;
		if(value <= 0.50) {
			color = '#FF3C41'
		}
		if (value <= 0.70 && value > 0.50) {
			color = '#FEB917'
		}
		if (value < 0.90 && value > 0.70) {
			color = '#46BCEF'
		} 
		if(value >= 0.90) {
			color = '#31B770'
		}
		$('.' + String(item.id)).circleProgress({
			   animationStartValue: start_value > 0 ? start_value : 0,
		       value: value,
		       size: 38,
		       lineCap: 'round',
		       animation: {duration: 2500},
		       fill: {
		       		color: color
		       }
	    }).on('circle-animation-progress', function(event, progress, stepValue) {
	    	if(stepValue !== 1.0) {
	    		$(this).find('strong').text(String(100 * stepValue).slice(0, 2).replace(".", ""))
	    	} else {
	    		$(this).find('strong').text(String(100 * stepValue).slice(0, 3).replace(".", ""))
	    	}
			if(stepValue < 0.10) $(this).find('strong').css({left: '24.5px'})
	    })
	    this.setState({ 
	    	renderedProgressCircle: true
	    });
	}

	componentDidMount() {
		let { _case, item } = this.props;
		if(_case !== null) {
			this.renderProgressCircle(_case, item)
		}
	}	

	componentWillReceiveProps(nextProps) {
		let { _case, item, filteredStarredItems } = nextProps
		if(_case !== null && !this.state.renderedProgressCircle) {
			this.renderProgressCircle(_case, item)
		}
	} 

	render() {
		const { _case, item } = this.props;
		return(
			<div className={classnames("circle", String(item.id))}>
				<strong></strong>
			</div>
		);
	}
}

// {
// 	progress_key == 'no_answers'
// 	? ::this.renderNoAnswers(_case)
// 	: null
// }
// {
// 	progress_key == 'negative'
// 	? ::this.renderNegative(_case)
// 	: null
// }
// {
// 	progress_key == 'neutral'
// 	? ::this.renderNeutral(_case)
// 	: null
// }	
// {
// 	progress_key == 'positive'
// 	? ::this.renderPositive(_case)
// 	: null
// }