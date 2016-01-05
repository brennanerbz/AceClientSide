import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import { circleProgress } from 'jquery-circle-progress';

export default class ItemProgress extends Component {
	static propTypes = {
	}

	renderNoAnswers(_case) {
		return (
			<span className="no_answers_yet">
				No answers yet
			</span>
		)
	}

	renderNegative(_case) {
		return (
			<span className="score negative">
				-
				{ 
					_case.total_incorrect - _case.total_correct
				}
			</span>
		)
	}

	renderNeutral(_case) {
		return (
			<span className="score neutral">
				{0}
			</span>
		)
	}

	renderPositive(_case) {
		return (
			<span className="score positive">
				+
				{
					_case.total_correct - _case.total_incorrect
				}
			</span>
		)
	}

	componentDidMount() {
		let { item } = this.props,
		value = Math.random().toFixed(2), color;
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
		       value: value,
		       size: 36,
		       lineCap: 'round',
		       fill: {
		       		color: color
		       }
	    }).on('circle-animation-progress', function(event, progress, stepValue) {
			$(this).find('strong').text(String(100 * stepValue).slice(0, 2).replace(".", ""))
			if(value < 0.10) $(this).find('strong').css({left: '21px'})
	    })
	}	 

	render() {
		const { _case, item } = this.props;
		if(_case !== undefined) {
			let progress_key;
			if(_case == null || (_case.total_correct === 0 && _case.total_incorrect === 0)) {
				progress_key = 'no_answers'
			} else if (_case.total_correct < _case.total_incorrect) {
				progress_key = 'negative'
			} else if (_case.total_correct > _case.total_incorrect) {
				progress_key = 'positive'
			} else if(_case.total_correct === _case.total_incorrect) {
				progress_key = 'neutral'
			}
			return(
				<div className={classnames("circle", String(item.id))}>
					<strong></strong>
				</div>
			);
		} else {
			return;
		}
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