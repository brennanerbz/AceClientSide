import React, { Component, PropTypes } from 'react';
// import Menu from '../../Menu/Menu';
import classnames from 'classnames';
import Modal from '../../Modal/modal';

//TODO: replace the inline-styles with scss file

var _member_styles = {
	display: 'inline-block',
	verticalAlign: 'middle',
	height: '15px',
	opacity: '0.6',
	marginRight: '5px'
}
var _member_count_style = {
	display: 'inline-block',
	verticalAlign: 'middle',
	color: '#555549',
	marginRight: '5px'
}
var secondary_actions = {
	position: 'relative',
	display: 'inline-flex',
	verticalAlign: 'middle'
}
var _icon = {
	position: 'absolute',
	display: 'inline-block',
	height: '16px',
	top: '6px',
	left: '8px',
	opacity: '0.8'
}
var _smallicon = {
	position: 'absolute',
	display: 'inline-block',
	height: '5.5px',
	top: '13px',
	left: '7px',
	opacity: '0.8'
}
var member_count_container = {
	paddingTop: '5px'
}

import BubbleDropdown from '../../Dropdown/Dropdown';

export default class SubSetActions extends Component {
	static propTypes = {
	}

	state = {
		modal_open: false,
		modal_type: null,
		more_is_open: false
	}	

	componentDidMount() {
		// $('[data-toggle="tooltip"]').tooltip({
		// 	delay: { show: 500, hide: 50},
		// 	template: '<div class="tooltip bottom_tool" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
		// })
	}

	toggleModal(value) {
		$('[data-toggle="tooltip"]').tooltip('hide')
		this.setState({ 
			modal_open: true,
			modal_type: value
		});
	}

	render() {
		const { set, createset } = this.props,
			member_icon = require('../../../assets/profile_icon.png'),
			share_icon = require('../../../assets/share.png'),
			more = require('../../../assets/elipses.png');
		return(
			<div style={secondary_actions} className="secondary_actions">
				{
					this.props.assignment !== null
					&&
					<button className={classnames('button outline')}
						    onClick={() => ::this.toggleModal('share')}
						    style={{
						    	marginLeft: '5px'
						    }}
					   		ref="share"				   
					   		title="Share"
					   		// data-toggle="tooltip" 
					  		data-placement="bottom">
						Share					
					</button>
				}

				<Modal  open={this.state.modal_open} 
						closeModal={() => this.setState({ modal_open: false })}
						type={this.state.modal_type}
						{...this.props} />

				<button onClick={() => { 
							// $('[data-toggle="tooltip"]').tooltip('hide')
							this.setState({more_is_open: true})
						}} 
						className={classnames('toggle_btn', {'active': this.state.more_is_open})}
						ref="more"				   
						title="More actions"
						// data-toggle="tooltip" 
						data-placement="bottom" >
					<i className="">
						<img style={_smallicon} className="share_icon" src={more}/>
					</i>					
				</button>

				{
					this.state.more_is_open
					&&
					<BubbleDropdown 
						single_set_actions={true}
						set_header={this.props.set_header}
						target_node={this.refs.more}
						pushState={this.props.pushState}
						hideDropdown={() => {
							// $('[data-toggle="tooltip"]').tooltip('hide')
							this.setState({
								more_is_open: false
							})
						}}
						handleEditPurpose={() => {
							this.setState({
								modal_open: true,
								modal_type: 'textarea'
							});
						}}
						handlePrivacySettings={() => {
							this.setState({
								modal_open: true,
								modal_type: 'settings'
							});
						}}
						handleDelete={() => {
							this.setState({
								modal_open: true,
								modal_type: 'confirm'
							});
						}}
					/>
				}
			</div>
		);
	}
}



// <div style={member_count_container}>
// 					<span style={_member_count_style} className="member_count">
// 						<img src={member_icon} style={_member_styles} className="member_icon"/>
// 						{set.member_count}
// 					</span>
// 				</div>








