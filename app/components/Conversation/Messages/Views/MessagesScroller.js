import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import MessagesList from './MessagesList';
import EndDisplayHelp from './EndDisplayHelp';

export default class MessagesScroller extends Component {
	static propTypes = {
	}

	render() {
		const { scrollMarginLeft, viewHeight, paddingHeight } = this.props,
				scrollHiderStyle = {
					width: scrollMarginLeft, marginRight: '17px'
				},
				msgsScrollerStyle = {
					height: viewHeight, width: window.innerWidth - 220
				}
		return(
			<div style={scrollHiderStyle} 
				 id="scroll_hider">
				<div style={msgsScrollerStyle}
					 onScroll={this.props.setScrollBarPosition}
					 id="msgs_scroller" 
					 className="scroller">
					<EndDisplayHelp 
						paddingHeight={paddingHeight}
					/>
					<MessagesList 
					/>
				</div>
			</div>
		);
	}
}