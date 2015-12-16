import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';


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

	render() {
		const { _case } = this.props;
		if(_case !== null && _case !== undefined) {
			let progress_key;
			if(_case.total_correct === 0 && _case.total_incorrect === 0) {
				progress_key = 'no_answers'
			} else if (_case.total_correct < _case.total_incorrect) {
				progress_key = 'negative'
			} else if (_case.total_correct > _case.total_incorrect) {
				progress_key = 'positive'
			} else if(_case.total_correct === _case.total_incorrect) {
				progress_key = 'neutral'
			}
			return(
				<div className="progress">
					{
						progress_key == 'no_answers'
						? ::this.renderNoAnswers(_case)
						: null
					}
					{
						progress_key == 'negative'
						? ::this.renderNegative(_case)
						: null
					}
					{
						progress_key == 'neutral'
						? ::this.renderNeutral(_case)
						: null
					}	
					{
						progress_key == 'positive'
						? ::this.renderPositive(_case)
						: null
					}
				</div>
			);
		} else {
			return;
		}
	}
}