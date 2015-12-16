import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class OnlineUserItem extends Component {
	static propTypes = {
	}

	state = {
		active: false
	}

	setActive = () => {
		this.setState({
			active: true
		});
	}
	deActive = () => {
		this.setState({
			active: false
		});
	}

	render() {
		return(
			<li className="online_item"
			    onMouseOver={this.setActive}
			    onMouseLeave={this.deActive}>
				<span className="activity_item">
					<div className="activity_action">
						<a><img src={this.props.user.picurl} 
							    className={classnames('online_user_pic', {'active': this.state.active})}/></a>
					</div>
					<div className="activity_message">
						<div className="message_content activity_user">
						{this.props.user.name}
						<i className="online_icon"></i>
						</div>
					</div>
				</span>
			</li>
		);
	}
}