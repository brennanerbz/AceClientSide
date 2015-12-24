import React, { Component, PropTypes } from 'react';
require('../Messages.scss');

export default class MessagesContainer extends Component {
	static propTypes = {
	}

	state = {
		$scrollable: null,
		$scrollbar: null,
		H: null,
		vH: null,
		sH: null,
		sbH: null,
		top: 0
	}

	componentDidMount() {
		var $scrollable = $('#msgs_scroller'), /* content */
		    $scrollbar  = $('#scroll_handler'), /* scrollbar handle */
		    $viewPort = $(window),
		    vH  = $viewPort[0].innerHeight - 152,
		    sH  = $scrollable[0].scrollHeight,
		    sbH = vH*vH/sH,
		    top = $scrollable.scrollTop()/vH*sbH
		this.setState({
			$scrollable: $scrollable,
			$scrollbar: $scrollbar,
			$viewPort: $viewPort,
			sH: sH,
			vH: vH,
			sbH: sbH,
			top: top
		}) 		 
	}

	setScrollBarPosition() {
		const { $scrollable, vH, sbH } = this.state,
		top = $scrollable.scrollTop()/ vH*sbH
		this.setState({
			top: top
		})
	}


	render() {
		const { $scrollable, H, sH, vH, sbH, top } = this.state;
		return(
			<div id="messages_container">
				<div id="scroll_wrapper_for_messages" className="scroll_wrapper">
					<div style={{
							marginLeft: '1185.5px',
							height: vH
						}} 
						className="scroll_bar">
						<div style={{
								left: '-3px',
								height: sbH,
								top: top
							}} 
							id="scroll_handler"
							className="scroll_handler">
							<div className="scroll_inner">
							</div>
						</div>
					</div>
					<div style={{
							width: '1186px',
							marginRight: '17px'
						}} 
						id="scroll_hider">
						<div style={{
								height: vH,
								width: '1198px'
							}} 
							onScroll={::this.setScrollBarPosition}
							id="msgs_scroller" 
							className="scroller">
							<div style={{}} id="end_help">
								<div id="end_display_help">
									<div style={{}} id="end_display_padder">
									</div>
									<div id="end_display_meta">
										<h1 className="small_bottom_margin set_name">
											<a>Set name</a>
										</h1>
										<p className="small_bottom_margin set_intro">
											This is the very beginning of the set_name thread. Welcome to the future.
										</p>
										<ul className="end_display_actions">
											<li>
												<img className="settings icon"/>
												<a>Change settings</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div id="msgs_div" className="msgs_holder">
								{Array.from({length: 20}).map(a => {
									return (
										<div className="message">
											<div className="action_hover_container">
											</div>
											<div className="message_gutter">
												<span className="message_star_holder">
													<img className="star" />
												</span>
											</div>
											<div className="message_content">
												<a className="message_sender">
													message_sender
												</a>
												<span className="message_star_holder">
													<img className="star" />
												</span>
												<span className="message_body">
													Message body
												</span>
												<div className="message_actions_container">
													Actions
												</div>
											</div>
										</div>
									)
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}