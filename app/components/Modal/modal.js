import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
require('./modal.scss')

import SignUpForm from '../../routes/LandingPage/SignUpForm';

export default class Modal extends Component {
	static propTypes = {
		
	}

	state = {
		purpose: null
	}

	componentWillReceiveProps(nextProps) {
		if(!this.props.open && nextProps.open) {
			if(this.props.type !== 'log_in') {
				$(this.refs.modal).modal()
			} else {
				$(this.refs.modal).modal({
					backdrop: 'static',
				    keyboard: false
				})
			}
		}
		if(this.props.type !== 'log_in') {
			$(this.refs.modal).on('hidden.bs.modal', (e) => {
			  	this.props.closeModal()
			})
		}
	}
	
	componentDidUpdate(prevProps) {
		if((!prevProps.open && this.props.open) ) {
			if(this.props.type == 'textarea') setTimeout(() => { $(this.refs.purpose_input).focus() }, 300)
			if(this.props.type == 'share') setTimeout(() => { $(this.refs.share_link).select() }, 300)
		}
	}

	changeVisibilitySettings(val) {
		const { set, updateSet, createSet } = this.props;
		if(set == null) {
			createSet(null, {name: 'visibility', prop: val })
			return;
		}
		if(set !== null) {
			updateSet(set, {name: 'visibility', prop: val })
		}
	}
	changeEditabilitySettings(val) {
		const { set, updateSet, createSet } = this.props;
		if(set == null) {
			createSet(null, {name: 'editability', prop: val })
			return;
		} 
		if(set !== null) {
			updateSet(set, {name: 'editability', prop: val })
		}
	}

	changePurpose() {
		const { set, updateSet, createSet } = this.props;
		let purpose = this.state.purpose;
		if(purpose !== null && purpose.length > 0) {
			if(set == null) createSet(null, { name: 'description', prop: purpose })
			else if (set !== null) updateSet(set, { name: 'description', prop: purpose })
		}
	}

	renderShareBody() {
		let { set } = this.props,
			globe = require('../../assets/globe.png'),
			lock = require('../../assets/lock.png'),
			icon;
		if(set.visibility == 'public') {
			icon = globe
		} else {
			icon = lock
		}
		return (
			<div className="modal-body share_link">
				<a id="shared_link" className="remove_link">Remove link</a>
				<h2>Link to set</h2>
				<div className="copy_link_input_container"
					 onClick={() => this.refs.share_link.select()}>
					<div className="text_input inline">
						<div className="text_input_wrapper">
							<input readOnly={true} 
								   ref="share_link"
								   type="text" id="share_link" 
								   value={`http://127.0.0.1:8080/set/${set.id}`} />
							<label style={{display: 'none'}} htmlFor="share_link"></label>
							<small className="secondary_label"></small>
						</div>
					</div>
				</div>
				<div className="permissions_policy">
					<img className="sprite" src={icon}/>
					<div className="permissions_text">
						<div className="policy_text">
							{
								set.visibility == 'public'
								&&" Anyone with the link can see it "
							}
							{
								set.visibility == 'private'
								&& "Only you can see it "
							}
							<a className="change_permission_link">
								Change permissions
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	}

	renderSettingsBody() {
		const { set } = this.props;
		return (
			<div className="modal-body no_footer">
				<p className="bold no_bottom_margin">Privacy</p>
				<p className="small_bottom_margin">Who can view?</p>
				<p className="left_margin">
					<label className="radio small_bottom_margin">
						<input ref="public_privacy"
							   type="radio" 
							   defaultChecked={true}
							   checked={set !== null ? set.visibility == 'public' : null}
							   onChange={() => ::this.changeVisibilitySettings('public')} 
							   className="small_right_margin" 
							   value="public"/>
						<span className="small_left_margin">Everyone: &nbsp;</span>
						<span className="normal">
						All users can view this set
						</span>
					</label>
					<label className="radio small_bottom_margin">
						<input ref="private_privacy"
							   type="radio" 
							   defaultChecked={false}
							   checked={set !== null ? set.visibility == 'private' : null}
							   onChange={() => ::this.changeVisibilitySettings('private')} 
							   className="small_right_margin" 
							   value="private"/>
						<span className="small_left_margin">Just me: &nbsp;</span>
						<span className="normal">
						Only you can view this set
						</span>
					</label>
				</p>
				<p className="bold no_bottom_margin">Editing</p>
				<p className="small_bottom_margin">Who can edit?</p>
				<p className="left_margin">
					<label className="radio small_bottom_margin">
						<input ref="group_editing"
							   type="radio" 
							   defaultChecked={false}
							   checked={set !== null ? set.editability == 'group' : null}
							   onChange={() => ::this.changeEditabilitySettings('group')}
							   className="small_right_margin"
							   value="group"/>
						<span className="small_left_margin">Group: &nbsp;</span>
						<span className="normal">
						Only members of selected groups can edit
						</span>
					</label>
					<label className="radio small_bottom_margin">
						<input ref="admin_editing"
							   type="radio" 
							   defaultChecked={false}
							   checked={set !== null ? set.editability == 'admin' : null}
							   onChange={() => ::this.changeEditabilitySettings('admin')} 
							   className="small_right_margin" 
							   value="admin"/>
						<span className="small_left_margin">Admins: &nbsp;</span>
						<span className="normal">
						Only admins can edit this set
						</span>
					</label>
					<label className="radio small_bottom_margin">
						<input ref="creator_editing"
							   type="radio" 
							   defaultChecked={true}
							   checked={set !== null ? set.editability == 'creator' : null}
							   onChange={() => ::this.changeEditabilitySettings('creator')} 
							   type="radio" 
							   className="small_right_margin" 
							   value="creator"/>
						<span className="small_left_margin">Just me: &nbsp;</span>
						<span className="normal">
						Only you can edit this set
						</span>
					</label>
				</p>
			</div>
		)
	}

	renderConfirmBody() {
		return (
			<div className="modal-body">
				<p>Are you sure you want to delete this set permanently?</p>
			</div>
		)
	}

	renderTextAreaBody() {
		const { set } = this.props
		return (
			<div className="modal-body">
			<p>
				<label className="inline_block purpose_label" htmlFor="purpose_input">
					Purpose
					<br />
					<span className="normal">(optional)</span>
				</label>
				<textarea id="purpose_input" 
						  ref="purpose_input"
						  onChange={(event) => this.setState({ purpose: event.target.value })}
						  name="purpose_input"
						  className="textarea"
						  type="text"
						  defaultValue={set !== null && set.description !== null ? set.description : null}
						  />
				<span className="modal_input_note">Give your set a purpose that describes what it will be used for</span>
			</p>
			</div>
		)
	}

	renderLogIn() {
		const g_icon = require('../../assets/google_logo.png'),
			  f_icon = require('../../assets/facebook_logo.png'),
			  { pushState } = this.props;
		return (
			<div className="modal-body sign_up">
				<SignUpForm modal={true} shouldAutoFocus={true}/>
				<p className="log_in_link">Already have an account? 
					<a onClick={() => pushState(null, '/login')}> Log In</a>
				</p>
			</div>
		)
	}

	renderThankYou() {
		const { email } = this.props;
 		return (
			<div style={{
					padding: '2rem'
				}} 
				className="modal-body">
				<p className="greetings">
				You're more important than you'll ever know. 
				You've been added to the Ace waitlist using your<b>{email}</b> email.
				</p>
			</div>
		)
	}

	componentWillUnmount() {
		$(this.refs.modal).modal('hide')
	}

	render() {
		const { type, assignment, pushState, deleteAssignment, set } = this.props;
		return(
			<div ref="modal" 
				 className="modal fade" 
				 id="myModal" 
				 role="dialog" 
				 aria-labelledby="myModalLabel"
				 aria-hidden="true">
				<div className={classnames({"sign_up": type == 'log_in'}, "modal-dialog")} role="document">
					<div className={classnames("modal-content", {
						"no_shadow": true
					})}>
					<div className={classnames("modal-header", 
						{ "settings": type == 'settings' },
						{ "sign_up": type == 'log_in'}
						) }>
						{
							type !== 'settings' && type !== 'log_in'
							? 
							<button type="button" 
									className="close" 
									data-dismiss="modal"
									aria-label="Close">
							<span aria-hidden="true">&times;</span>
							<span className="sr-only">Close</span>
							</button>
							: null
						}
						{
							type == 'settings'
							? <button type="button"
									  className="button primary button-small float_right"
									  data-dismiss="modal" >
							  Done
							  </button>
							: null
						}
						<h3 className={classnames("modal-title")} id="myModalLabel">
							{
								type == 'share'
								? `Share link to '${set.title}'`
								: null
							}
							{
								type == 'settings'
								? `Settings` 
								: null
							}
							{
								type == 'textarea'
								? 'Edit purpose'
								: null
							}
							{
								type == 'confirm'
								? 'Delete set'
								: null
							}
							{
								type == 'log_in' && !this.props.import
								&& 'Sign up for free to create study sets'
							}
							{
								type == 'log_in' && this.props.import
								&& 'Sign up for free to transform documents'
							}
							{
								type == 'thank_you'
								&& 'Thank you for signing up!'
							}
						</h3>
					</div>
					{
						type == 'share'
						? ::this.renderShareBody()
						: null
					}
					{
						type == 'settings'
						? ::this.renderSettingsBody(...this.props)
						: null
					}
					{
						type == 'textarea'
						? ::this.renderTextAreaBody(...this.props)
						: null
					}
					{
						type == 'confirm'
						&& ::this.renderConfirmBody()
					}
					{
						type == 'log_in'
						&& ::this.renderLogIn()
					}
					{
						type == 'thank_you'
						&& ::this.renderThankYou()
					}
					{
						type !== 'settings' && type !== 'log_in' && type !== 'thank_you'
						?
						<div className="modal-footer">
							<button type="button" 
									className="button outline" 
									data-dismiss="modal">
									Cancel
							</button>
							{
								type !== 'confirm'
								? 
								<button type="button" 
										className="button primary" 
										data-dismiss='modal'
										onClick={type == 'textarea' ? ::this.changePurpose : null}>
										{
											type == 'textarea'
											? 'Update purpose'
											: 'Done'
										}
								</button>
								: null
							}
							{
								type == 'confirm'
								?
								<button className="button button-danger" 
										data-dismiss="modal"
										onClick={() => deleteAssignment(assignment.id, pushState)}>
									Delete set
								</button>
								: null
							}
						</div>
						: null
					}
					</div>
				</div>
			</div>
		);
	}
}