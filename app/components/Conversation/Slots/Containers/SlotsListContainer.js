import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
require('../Slots.scss');

import ScrollBar from '../../ScrollBar/ScrollBar';

import SequenceProgress from '../Views/SequenceProgress';
import SlotsList from '../Views/SlotsList';


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
		const { $scrollable, viewHeight, scrollBarHeight } = this.state,
		top = $scrollable.scrollTop()/ viewHeight*scrollBarHeight
		this.setState({
			top: top
		})
	}

	render() {
		const { viewHeight, scrollBarHeight, scrollMarginLeft, top, shouldRenderScrollBar, contentRendered } = this.state,
			scrollHiderStyle = {
					width: scrollMarginLeft
			},
			slotsScrollerStyle = {
				height: viewHeight,
				width: 210
			}
		
		return(
			<div id="slots_list">
				<div id="col_slots_list_bg" className=""></div>
				<div id="col_slots_list" className={classnames({'rendered': contentRendered})}>
					<div id="slots_overlay">
					</div>
					<div id="scroll_wrapper_for_slots" className="scroll_wrapper">
						{
							shouldRenderScrollBar
							&&
							<ScrollBar 
								viewHeight={viewHeight}
								scrollMarginLeft={scrollMarginLeft}
								scrollBarHeight={scrollBarHeight}
								top={top}
							/>
						}
						<div
							style={scrollHiderStyle} 
							className={classnames("scroll_hider", "scrolling")}>
							<div id="slots_scroller"
								 style={slotsScrollerStyle}
								 onScroll={::this.setScrollBarPosition}>
								<div className="slots">
									<h2 id="slot_header">
										Slot header
									</h2>
									<SlotsList/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<SequenceProgress />
			</div>
		);
	}
}