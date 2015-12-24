import React, { Component, PropTypes } from 'react';
require('../Messages.scss');

export default class MessagesContainer extends Component {
	static propTypes = {
	}

	state = {
		msg_scroller_height: 0,
		scroll_height: 0,
		handle_height: 0
	}

	componentDidMount() {
		window.addEventListener('resize', ::this.computeHeight)
		this.computeHeight()
	}

	componentWillUnmount() {
		window.removeEventListener('resize', ::this.computeHeight)
	}

	computeHeight() {
		let viewport_height = window.innerHeight, 
			scroll_bar_height = viewport_height - 180,
			h = viewport_height / (parseInt($(this.refs.msgs_div).prop('scrollHeight'), 10) + 270),
			handle_height = scroll_bar_height * h
		this.setState({
			msg_scroller_height: viewport_height - 150,
			scroll_height: scroll_bar_height,
			handle_height: handle_height
		})
	}

	render() {
		let { msg_scroller_height, scroll_height, handle_height } = this.state;
		return(
			<div id="messages_container">
				<div id="scroll_wrapper_for_messages" className="scroll_wrapper">
					<div style={{
							marginLeft: '1185.5px',
							height: scroll_height
						}} 
						className="scroll_bar">
						<div style={{
								left: '-3px',
								height: handle_height,
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
								height:  msg_scroller_height,
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
							<div ref="msgs_div" id="msgs_div" className="msgs_holder">
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