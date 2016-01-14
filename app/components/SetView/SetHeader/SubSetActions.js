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
		more_is_open: false,
		mouseIsOverMoreButton: false
	}	


	toggleModal(value) {
		// $('[data-toggle="tooltip"]').tooltip('hide')
		this.setState({ 
			modal_open: true,
			modal_type: value
		});
	}

	render() {
		let { set, user, assignment, createset } = this.props,
			{mouseIsOverMoreButton} = this.state,
			member_icon = require('../../../assets/profile_icon.png'),
			share_icon = require('../../../assets/share.png'),
			more = require('../../../assets/elipses.png'),
			blue_more = require('../../../assets/blue_elipses.png'),
			/* Booleans to determine menu options */
			renderCreatorOptions = false, renderAdminOptions = false, renderUserOptions = false;
		if(set.editability == 'creator' && set.creator_id == user.id) renderCreatorOptions = true
		else renderUserOptions = true;
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
					  		data-placement="bottom">
						Share					
					</button>
				}

				<Modal  open={this.state.modal_open} 
						closeModal={() => this.setState({ modal_open: false })}
						type={this.state.modal_type}
						set={this.props.set}
						loc={this.props.loc}
						updateSet={this.props.updateSet}
						createSet={this.props.createSet}
						assignment={this.props.assignment}
						deleteAssignment={this.props.deleteAssignment}
						pushState={this.props.pushState}
						user_id={this.props.user.id}
						/>
				{
					this.props.assignment !== null
					&& this.props.set.creator_id == this.props.user.id
					&& 
					<button onClick={() => { 
								this.setState({more_is_open: true})
							}} 
							style={{
								marginLeft: '5px',
								height: '36px',
								width: '36px'
							}}
							onMouseOver={() => this.setState({
								mouseIsOverMoreButton: true
							})}
							onMouseLeave={() => this.setState({
								mouseIsOverMoreButton: false
							})}
							className={classnames('button outline',  {'active': this.state.more_is_open})}
							ref="more"				   
							title="More actions"
							data-placement="bottom" >
							<img style={
								{
									position: 'absolute',
									height: '4.05px',
									width: '16.25px',
									left: '9.5px'
								}
							} className="share_icon" src={mouseIsOverMoreButton ? blue_more : more}/>
					</button>
				}

				{
					this.state.more_is_open
					&&
					<BubbleDropdown 
						assignment={this.props.assignment}
						single_set_actions={true}
						set_header={this.props.set_header}
						target_node={this.refs.more}
						pushState={this.props.pushState}
						renderCreatorOptions={renderCreatorOptions}
						renderUserOptions={renderUserOptions}
						hideDropdown={() => {
							this.setState({
								more_is_open: false
							})
						}}
						handleEdit={() => {
							this.props.pushState(null, `/createset/${this.props.set.id}`)
						}}
						handleEditPurpose={() => {
							this.setState({
								modal_open: true,
								modal_type: 'textarea'
							});
						}}
						handleSettings={() => {
							this.setState({
								modal_open: true,
								modal_type: 'settings'
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








