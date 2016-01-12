import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
const styles = require('./Avatar.scss');

import ViewerAvatar from './ViewerAvatar';
import BubbleDropdown from '../Dropdown/Dropdown';

export default class Avatar extends Component {
	static propTypes = {
		
	}

	state = {
		dropdown_active: false
	}
	
	render() {
		const { is_create_set, user, pushState } = this.props,
			defaultAvatar = require('../../assets/backgroundPattern1.png');
		return(
			<span id="avatar">
				<button ref="target" 
					 	className="button button-borderless button-outline"
					 	onClick={() => {
					 		this.setState({dropdown_active: !this.state.dropdown_active})
					 	}}>
						<ViewerAvatar 
							defaultAvatar={defaultAvatar} 
							dimension={31} 
							photoUrl="" />
						 <span className="name">
						 	<a>{user.username}</a>
						 </span>
				</button>
				{
					this.state.dropdown_active
					&&
					<BubbleDropdown 
						hideDropdown={() => {
							this.setState({dropdown_active: false})
						}}
						target_node={this.refs.target}
						header_menu={true}
						user={this.props.user}
						pushState={this.props.pushState}
						logOut={this.props.logOut}
					/>
				}
			</span>
		);
	}
}