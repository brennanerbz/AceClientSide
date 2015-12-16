import React, { Component, PropTypes } from 'react';
require('../RoundSummary/RoundSummary.scss');

export default class SequenceSummary extends Component {
	static propTypes = {
	}

	render() {
		const { slots } = this.props;
		return(
			<div className="summary">
				<h3 className="summary_header">Overall Progress</h3>
				<table className="summary_table">
					<tbody>
						<tr className="recall_row">
							<td className="recall row_label">
								Define 
							</td>
							<td className="count">
								{slots.filter(slot => slot.format == 'recall').length} / {slots.length} 
							</td>
							<td className="percent">
								{(slots.filter(slot => slot.format == 'recall').length / slots.length) / 100 * 10000} % 
							</td>
						</tr>
						<tr className="mc_row">
							<td className="mc row_label">
								Multiple Choice
							</td>
							<td className="count">
								{slots.filter(slot => slot.format == 'mc').length} / {slots.length} 
							</td>
							<td className="percent">
								{(slots.filter(slot => slot.format == 'mc').length / slots.length) / 100 * 10000} % 
							</td>
						</tr>
						<tr className="fb_row">
							<td className="fb row_label">
								 Fill in the Blank
							</td>
							<td className="count">
								{slots.filter(slot => slot.format == 'stem').length} / {slots.length} 
							</td>
							<td className="percent">
								{(slots.filter(slot => slot.format == 'stem').length / slots.length) / 100 * 10000} % 
							</td>
						</tr>
						<tr className="copy_row">
							<td className="copy row_label">
								Copy Answer
							</td>
							<td className="count">
								{slots.filter(slot => slot.format == 'copy').length} / {slots.length} 
							</td>
							<td className="percent">
								{(slots.filter(slot => slot.format == 'copy').length / slots.length) / 100 * 10000} % 
							</td>
						</tr>
					</tbody>
				</table>
				<button className="button primary"
						onClick={() => this.props.newSequence(null)}>
						Start new sequence</button>
			</div>
		);
	}
}




