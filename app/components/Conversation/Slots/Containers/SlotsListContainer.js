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
		this.setDOMDimensions()
			window.addEventListener('resize', ::this.setDOMDimensions)
		}

		componentWillUnmount() {
			window.removeEventListener('resize', ::this.setDOMDimensions)
		}	

	componentDidUpdate(prevProps, prevState) {
		// $('#slots_scroller').animate({scrollTop: $('#slots_scroller')[0].scrollHeight}, 5)
	}

	setDOMDimensions() {
		var $scrollable = $('#slots_scroller'), /* content */
		    $scrollbar  = $('#scroll_wrapper_for_slots > .scroll_handler'), /* scrollbar handle */
		    $viewPort = $(window),
		    cH  = $scrollable[0].clientHeight,
		    vH  = $viewPort[0].innerHeight - 185,
		    sH  = $scrollable[0].scrollHeight,
		    sbH = vH*vH/sH,
		    smL = 206,
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
			shouldRenderScrollBar: sbH > vH,
			contentRendered: true
		})
	}

	setScrollBarPosition(e) {
		e.preventDefault()
		const { $scrollable, viewHeight, scrollBarHeight } = this.state,
		top = $scrollable.scrollTop()/ viewHeight * (viewHeight * viewHeight / $scrollable[0].scrollHeight)
		this.setState({
			top: top
		})
	}

	render() {
		let { viewHeight, scrollMarginLeft, top, shouldRenderScrollBar, contentRendered, $scrollable } = this.state,
			{ slots, currentSlotId } = this.props,
			scrollHiderStyle = {
					width: 220
			},
			slotsScrollerStyle = {
				height: viewHeight + 35,
				width: 220
			},
			scrollHeight = 0, scrollBarHeight = 0;
			if($scrollable !== null) {
				scrollHeight = $scrollable[0].scrollHeight,
				scrollBarHeight = viewHeight * viewHeight / scrollHeight + 20
			}
		return(

			<div id="slots_list">
				<div id="col_slots_list_bg" className=""></div>
				<div id="col_slots_list" className={classnames({'rendered': contentRendered})}>
					<div id="slots_overlay">
					</div>
					<div id="scroll_wrapper_for_slots" className="scroll_wrapper">
						{
							scrollHeight > viewHeight
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
									<SlotsList
										slots={slots}
										currentSlotId={currentSlotId}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<SequenceProgress 
					createNewSequence={this.props.createNewSequence}
					completedSlots={slots.filter(s => s.completed).length}
					slotsLength={slots.length}
				/>
			</div>
		);
	}
}

/*
<h2 id="slot_header">
	Slot header
</h2>
*/