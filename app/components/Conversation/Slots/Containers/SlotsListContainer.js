import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
require('../Slots.scss');

import ScrollBar from '../../ScrollBar/ScrollBar';

export default class SlotsListContainer extends Component {
	static propTypes = {
	}

	state = {
		$scrollable: null,
		$scrollbar: null,
		$viewPort: null,
		viewHeight: null,
		containerHeight: null,
		scrollHeight: null,
		scrollBarHeight: null,
		top: 0,
		shouldRenderScrollBar: false,
		contentRendered: false
	}

	componentDidMount() {
		var $scrollable = $('#slots_scroller'), /* content */
		    $scrollbar  = $('#scroll_wrapper_for_slots > #scroll_handler'), /* scrollbar handle */
		    $viewPort = $(window),
		    cH  = $scrollable[0].clientHeight,
		    vH  = $viewPort[0].innerHeight - 152,
		    sH  = $scrollable[0].scrollHeight,
		    sbH = vH*vH/sH,
		    smL = 200,
		    top = $scrollable.scrollTop()/vH*sbH;
		this.setState({
			$scrollable: $scrollable,
			$scrollbar: $scrollbar,
			$viewPort: $viewPort,
			viewHeight: vH,
			containerHeight: cH,
			scrollHeight: sH,
			scrollBarHeight: sbH,
			scrollMarginLeft: smL,
			top: top,
			shouldRenderScrollBar: sH > vH ? true : false
		})
		setTimeout(() => {
			$("#slots_scroller").scrollTop($("#slots_scroller")[0].scrollHeight);
			this.setState({
				contentRendered: true
			})
		}, 1) 
	}

	setScrollBarPosition(e) {
		e.preventDefault()
		const { $scrollable, vH, sbH } = this.state,
		top = $scrollable.scrollTop()/ vH*sbH
		this.setState({
			top: top
		})
	}

	render() {
		const { viewHeight, scrollBarHeight, scrollMarginLeft, top, shouldRenderScrollBar, contentRendered } = this.state;
		return(
			<div id="slots_list">
				<div id="col_slots_list_bg" className=""></div>
				<div id="col_slots_list" className={classnames({'rendered': contentRendered})}>
					<div id="slots_overlay">
					</div>
					<div id="scroll_wrapper_for_slots" className="scroll_wrapper">
						{
							!shouldRenderScrollBar
							&&
							<ScrollBar 
								viewHeight={viewHeight}
								scrollMarginLeft={scrollMarginLeft}
								scrollBarHeight={scrollBarHeight}
								top={top}
							/>
						}
						<div className={classnames("scroll_hider", "scrolling")}>
							<div id="slots_scroller"
								 onScroll={::this.setScrollBarPosition}>
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