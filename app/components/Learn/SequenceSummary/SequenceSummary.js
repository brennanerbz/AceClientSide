import React, { Component, PropTypes } from 'react';
require('../RoundSummary/RoundSummary.scss');

export default class SequenceSummary extends Component {
	static propTypes = {
	}

	render() {
		const { sequence_stats } = this.props;
		let ss = sequence_stats, slots_count = ss !== null ? ss.slots_count : null;
		return(
			<div className="summary">
				<h3 className="summary_header">Overall Progress</h3>
				<table className="summary_table">
					{
						ss == null
						? <td>Loading</td>
						: 
						<tbody>
							<tr className="recall_row">
								<td className="recall row_label">
									Define 
								</td>
								<td className="count">
									{ss.recall_correct_count} / {slots_count} 
								</td>
								<td className="percent">
									{((ss.recall_correct_count / slots_count) / 100 * 10000).toFixed(0)} % 
								</td>
							</tr>
							<tr className="mc_row">
								<td className="mc row_label">
									Multiple Choice
								</td>
								<td className="count">
									{ss.mc_correct_count} / {slots_count} 
								</td>
								<td className="percent">
									{((ss.mc_correct_count / slots_count) / 100 * 10000).toFixed(0)} % 
								</td>
							</tr>
							<tr className="fb_row">
								<td className="fb row_label">
									 Fill in the Blank
								</td>
								<td className="count">
									{ss.stem_correct_count} / {slots_count} 
								</td>
								<td className="percent">
									{((ss.stem_correct_count / slots_count) / 100 * 10000).toFixed(0)} % 
								</td>
							</tr>
							<tr className="copy_row">
								<td className="copy row_label">
									Copy Answer
								</td>
								<td className="count">
									{ss.copy_correct_count} / {slots_count} 
								</td>
								<td className="percent">
									{((ss.copy_correct_count / slots_count) / 100 * 10000).toFixed(0)} % 
								</td>
							</tr>
						</tbody>
					}
				</table>
				<button className="button primary"
						onClick={() => this.props.handleNewSequence(true)}>
						Start new sequence</button>
			</div>
		);
	}
}




