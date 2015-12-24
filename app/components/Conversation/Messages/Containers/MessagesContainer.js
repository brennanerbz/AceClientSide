import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
require('../Messages.scss');

import MessagesList from '../Views/MessagesList';
import EndDisplayHelp from '../Views/EndDisplayHelp';
import ScrollBar from '../Views/ScrollBar';

export default class MessagesContainer extends Component {
	static propTypes = {
	}

	state = {
		$scrollable: null,
		$scrollbar: null,
		vH: null, // viewHeight
		sH: null, // scrollHeight
		sbH: null, // scrollBarHeight
		smL: null, // scrollMarginLeft
		pH: null, // paddingHeight
		top: 0, // top position for scrollBar
		rendered: false // set to true once all messages have been rendered
	}

	componentDidMount() {
		var $scrollable = $('#msgs_scroller'), /* content */
		    $scrollbar  = $('#scroll_handler'), /* scrollbar handle */
		    $viewPort = $(window),
		    cH  = $scrollable[0].clientHeight,
		    vH  = $viewPort[0].innerHeight - 152,
		    sH  = $scrollable[0].scrollHeight,
		    sbH = vH*vH/sH,
		    top = $scrollable.scrollTop()/vH*sbH,
		    smL = $('#scroll_wrapper_for_messages')[0].clientWidth - 37.5,
		    pH  = vH - cH
		this.setState({
			$scrollable: $scrollable,
			$scrollbar: $scrollbar,
			$viewPort: $viewPort,
			sH: sH,
			vH: vH, 
			sbH: sbH,
			top: top,
			smL: smL,
			pH: pH
		})
		setTimeout(() => {
			$("#msgs_scroller").scrollTop($("#msgs_scroller")[0].scrollHeight);
			this.setState({
				rendered: true
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
		const { sH, vH, sbH, top, smL, pH } = this.state,
		scrollHiderStyle = {
			width: smL, marginRight: '17px'
		},
		msgsScrollerStyle = {
			height: vH, width: window.innerWidth - 220
		}
		return(
			<div id="messages_container" 
				 className={classnames({"rendered": this.state.rendered})}>
				<div id="scroll_wrapper_for_messages" className="scroll_wrapper">
					<ScrollBar 
						scrollMarginLeft={smL}
						viewHeight={vH}
						scrollBarHeight={sbH}
						top={top}
					/>
					<div style={scrollHiderStyle} 
						 id="scroll_hider">
						<div style={msgsScrollerStyle}
							 onScroll={::this.setScrollBarPosition}
							 id="msgs_scroller" 
							 className="scroller">
							<EndDisplayHelp 
								paddingHeight={pH}
							/>
							<MessagesList 
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}