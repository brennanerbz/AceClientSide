import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
require('../Messages.scss');

import MessagesList from '../Views/MessagesList';
import EndDisplayHelp from '../Views/EndDisplayHelp';
import ScrollBar from '../../ScrollBar/ScrollBar';

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
		rendered: false, // set to true once all messages have been rendered
	}

	componentDidMount() {
		this.setDOMDimensions()
		window.addEventListener('resize', ::this.setDOMDimensions); 
	}

	componentWillUnmount() {
		window.removeEventListener('resize', ::this.setDOMDimensions); 
	}

	componentDidUpdate(prevProps, prevState) {
		if(this.props.messagesLength > prevProps.messagesLength) {
			$("#msgs_scroller").scrollTop($("#msgs_scroller")[0].scrollHeight)
		}
	}

	componentWillUpdate(nextProps, nextState) {
		if(nextState.vH !== this.state.vH) {
			$("#msgs_scroller").scrollTop($("#msgs_scroller")[0].scrollHeight)
		}
	}

	setDOMDimensions() {
		var $scrollable = $('#msgs_scroller'), /* content */
		    $scrollbar  = $('#scroll_wrapper_for_messages > .scroll_handler'), /* scrollbar handle */
		    $viewPort = $(window),
			cH  = $scrollable[0].clientHeight,
		    vH  = $viewPort[0].innerHeight - 121,
		    smL = $viewPort[0].innerWidth - 238,
		    pH  = vH - cH,
		    sH = $scrollable[0].scrollHeight,
			sbH = vH*vH/sH,
			top = $scrollable.scrollTop()/vH*sbH;
		this.setState({
			$scrollable: $scrollable,
			$scrollbar: $scrollbar,
			$viewPort: $viewPort,
			cH: cH,
			vH: vH,
			smL: smL,
			pH: pH,
			sH: sH,	
			sbH: sbH,
			top: top,
			rendered: true
		});
	}

	setScrollBarPosition(e) {
		e.preventDefault()
		const { $scrollable, vH } = this.state,
		top = $scrollable.scrollTop()/ vH * (vH * vH / $scrollable[0].scrollHeight)
		this.setState({
			top: top
		})
	}

	render() {
		let { vH, top, smL, pH, $scrollable } = this.state,
			{ username, currentSlot, messages, setName, setId } = this.props, 
			scrollHiderStyle = {
				width: smL, marginRight: '17px'
			},
			msgsScrollerStyle = {
				height: vH, width: window.innerWidth - 220
			},
			scrollHeight = 0, scrollBarHeight = 0;
			if($scrollable !== null) {
				scrollHeight = $scrollable[0].scrollHeight,
				scrollBarHeight = vH * vH / scrollHeight
			}
		return(
			<div id="messages_container" 
				 className={classnames({"rendered": this.state.rendered})}>
				<div id="scroll_wrapper_for_messages" className="scroll_wrapper">
					<ScrollBar 
						scrollMarginLeft={smL}
						viewHeight={vH}
						scrollBarHeight={scrollBarHeight}
						top={top}
					/>
					<div style={scrollHiderStyle} 
						 id="scroll_hider">
						<div style={msgsScrollerStyle}
							 onScroll={::this.setScrollBarPosition}
							 id="msgs_scroller"
							 ref="msgs_scroller" 
							 className="scroller">
							<EndDisplayHelp 
								setName={setName}
								setId={setId}
								paddingHeight={pH}
							/>
							<MessagesList 
								username={username}
								currentSlot={currentSlot}
								messages={messages}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}