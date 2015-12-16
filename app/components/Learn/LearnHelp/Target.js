import React, { Component, PropTypes } from 'react';

export default class Answer extends Component {
	static propTypes = {
		target: PropTypes.string,
		stem: PropTypes.array
	}

	fillInTheBlank(stem) {
		stem = stem[2]
		return (
			<div>				
				<p>{stem}</p>
			</div>
		)
	}

	copyAnswer(target) {
		return (
			<div>				
				<p className="correct_answer">{target}</p>
			</div>
		)
	}

	render() {
		const { target, stem, diff} = this.props;
		return (
			<div>
			{
				diff == 'stem'
				? ::this.fillInTheBlank(stem)
				: ::this.copyAnswer(target)
			}
			</div>
		);
	}
}
