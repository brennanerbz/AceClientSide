import React, { Component, PropTypes } from 'react';
require('../Messages.scss');

export default class MessagesContainer extends Component {
	static propTypes = {
	}

	state = {
		height: window.innerHeight - 150
	}

	componentDidMount() {
		window.addEventListener('resize', ::this.computeHeight)
	}

	componentWillUnmount() {
		window.removeEventListener('resize', ::this.computeHeight)
	}

	computeHeight() {
		this.setState({
			height: window.innerHeight - 150
		})
	}

	render() {
		let height = this.state.height;
		return(
			<div id="messages_container">
				<div id="scroll_wrapper_for_messages" className="scroll_wrapper">
					<div style={{
							marginLeft: '1185.5px',
							height: height - 6
						}} 
						className="scroll_bar">
						<div style={{
								left: '-3px',
								height:  height - 9,
								top: '3px'
							}} 
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
								height:  height,
								width: '1198px'
							}} 
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
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}