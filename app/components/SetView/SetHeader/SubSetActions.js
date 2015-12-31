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
	top: '11px',
	left: '0px',
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


	toggleModal(value) {
		// $('[data-toggle="tooltip"]').tooltip('hide')
		this.setState({ 
			modal_open: true,
			modal_type: value
		});
	}

	render() {
		const { set, createset } = this.props,
			member_icon = require('../../../assets/profile_icon.png'),
			share_icon = require('../../../assets/share.png'),
			more = require('../../../assets/elipses.png'),
			blue_more = require('../../../assets/blue_elipses.png');
		return(
			<div style={secondary_actions} className="secondary_actions">
				{
					this.props.assignment !== null
					&&
					<button className={classnames('button secondary')}
						    onClick={() => ::this.toggleModal('share')}
						    style={{
						    	marginLeft: '5px'
						    }}
					   		ref="share"				   
					   		title="Share"
					  		data-placement="bottom">
						Share					
					</button>
				}

				<Modal  open={this.state.modal_open} 
						closeModal={() => this.setState({ modal_open: false })}
						type={this.state.modal_type}
						set={this.props.set}
						updateSet={this.props.updateSet}
						createSet={this.props.createSet}
						assignment={this.props.assignment}
						deleteAssignment={this.props.deleteAssignment}
						pushState={this.props.pushState}
						/>

				<button onClick={() => { 
							this.setState({more_is_open: true})
						}} 
						style={{
							marginLeft: '5px'
						}}
						className={classnames('button secondary',  {'active': this.state.more_is_open})}
						ref="more"				   
						title="More actions"
						data-placement="bottom" >
						<img style={
							{
								position: 'absolute',
								height: '3.95px',
								left: '8.5px'
							}
						} className="share_icon" src={blue_more}/>
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








