import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
require('../Slots.scss');

export default class SlotsListContainer extends Component {
	static propTypes = {
	}

	render() {
		return(
			<div id="slots_list">
				<div id="col_slots_list_bg" className=""></div>
				<div id="col_slots_list">
					<div id="slots_overlay">
					</div>
					<div id="scroll_wrapper_for_slots" className="scroll_wrapper">
						<div style={{
								marginLeft: '207.5px',
								height: '82px'
							}} 
							className="scroll_bar">	
							<div style={{
									left: '-3px',
								    height: '70px',
								    top: '0.0165746px'
								}} 
								className="scroll_handler">
								<div className="scroll_inner"></div>
							</div>
						</div>
						<div className={classnames("scroll_hider", "scrolling")}>
							<div id="slots_scroller">
								<div className="slots">
									<h2 id="slot_header">
										Slot header
									</h2>
									<ul id="slots_list">
										<div id="slot_wrapper">
											<li className={classnames(`slot`)}>
												<span className="overflow_ellipsis">
													<span id="slot_progress">
														0
													</span>
													<span id="slot_preview">
														This is a preview of the slot, it should be the cue data
													</span>
												</span>
											</li>
										</div>
										<div id="slot_wrapper">
											<li className={classnames(`slot`)}>
												<span className="overflow_ellipsis">
													<span id="slot_progress">
														0
													</span>
													<span id="slot_preview">
														This is a preview of the slot, it should be the cue data
													</span>
												</span>
											</li>
										</div>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div id="sequence_control">
					<button id="start_sequence_over" className="button outline tertiary">
						Start over
					</button>
					<div id="sequence_progress_count">
						8 of 24
					</div>
					<div id="sequence_progress_bar">
						Progress bar
					</div>
				</div>
			</div>
		);
	}
}