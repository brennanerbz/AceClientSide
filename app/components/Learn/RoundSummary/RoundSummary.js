import React, { Component, PropTypes } from 'react';
require('./RoundSummary.scss');


export default class RoundSummary extends Component {
	static propTypes = {
	}

	shouldComponentUpdate(nextProps) {
		if(this.props.isShowingCompletedRound) {
			return this.props.current_round == nextProps.current_round
		}
	}

	renderSlotItems(slot, format, i) {
		if(format !== slot.format) {
			return ( 
				<td key={i} className="slot_item">
					&nbsp;
				</td>
			)
		}
		return (
			<td key={i} className="slot_item">
				{slot.item.target}
			</td>
		)
	}

	render() {
		let { current_round, round_index} = this.props,
			  slots = current_round;
		return(
			<div className="summary">
				<h3 className="summary_header">Round {round_index}</h3>
				<table className="summary_table">
					<tbody>
						<tr className="recall_row">
							<td className="recall row_label">
								Define 
							</td>
								{
									slots.map((slot, i)=> {
										return (::this.renderSlotItems(slot, "recall", i))
									})
								}
							<td className="count">
								{(slots.filter(slot => slot.format == 'recall').length / 5) / 100 * 10000} % 
							</td>
						</tr>
						<tr className="mc_row">
							<td className="mc row_label">
								Multiple Choice
							</td>
							{
								slots.map((slot, i)=> {
									return (::this.renderSlotItems(slot, "mc", i))
								})
							}
							<td className="count">
								{(slots.filter(slot => slot.format == 'mc').length / 5) / 100 * 10000}  %
							</td>
						</tr>
						<tr className="fb_row">
							<td className="fb row_label">
								 Fill in the Blank
							</td>
							{
								slots.map((slot, i)=> {
									return (::this.renderSlotItems(slot, "stem", i))
								})
							}
							<td className="count">
								{(slots.filter(slot => slot.format == 'stem').length / 5) / 100 * 10000 } % 
							</td>
						</tr>
						<tr className="copy_row">
							<td className="copy row_label">
								Copy Answer
							</td>
							{
								slots.map((slot, i)=> {
									return (::this.renderSlotItems(slot, "copy", i))
								})
							}
							<td className="count">
								{(slots.filter(slot => slot.format == 'copy').length / 5) / 100 * 10000 } %  
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

