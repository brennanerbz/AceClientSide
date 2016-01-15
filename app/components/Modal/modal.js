import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
require('./modal.scss')
require('../../routes/Import/Import.scss')

import SignUpForm from '../../routes/LandingPage/SignUpForm';
import ImportModal from './ImportModal';
import LaddaButton from 'react-ladda';

import SettingsModal from './SettingsModal'

export default class Modal extends Component {
	static propTypes = {
		
	}

	state = {
		purpose: null,
		type: null,
		dynamic: false
	}

	componentDidMount() {
		$(this.refs.modal).on('hidden.bs.modal', (e) => {
			this.props.closeModal()
		})
	}

	componentWillReceiveProps(nextProps) {
		if(!this.props.open && nextProps.open) {
			if(this.props.type !== 'log_in' && nextProps.type !== null) {
				this.setState({type: nextProps.type})
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
				this.setState({type: null, dynamic: false})
			})
		}
		if(this.props.open && !nextProps.open) {
			$(this.refs.modal).modal('hide')
		}
	}

	// shouldComponentUpdate(nextProps) {
	// 	return !(!nextProps.open && !this.props.open)
	// }
	
	componentDidUpdate(prevProps) {
		if((!prevProps.open && this.props.open) ) {
			if(this.props.type == 'textarea') setTimeout(() => { $(this.refs.purpose_input).focus() }, 300)
			if(this.props.type == 'share') setTimeout(() => { $(this.refs.share_link).select() }, 300)
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

	
	renderConfirmBody() {
		return (
			<div className="modal-body">
				{
					!this.props.deactivateAccount
					&&
					<p>Are you sure you want to delete this set permanently?</p>
				}
				{
					this.props.deactivateAccount
					&&
					<p>Are you sure you want to deactivate your account?</p>
				}
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
		const { assignment, pushState, deleteAssignment, set, updateSet, createSet, deactivateAccount} = this.props,
			  { type, dynamic } = this.state;
		return(
			<div ref="modal" 
				 className="modal fade" 
				 id="myModal" 
				 role="dialog" 
				 aria-labelledby="myModalLabel"
				 aria-hidden="true">
				<div className={classnames({"sign_up": type == 'log_in'}, "modal-dialog")} role="document">
					<div className={classnames("modal-content", {
						"no_shadow": false
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
									onClick={() => this.props.closeModal()}
									aria-label="Close">
							<span aria-hidden="true">&times;</span>
							<span className="sr-only">Close</span>
							</button>
							: null
						}
						{
							type == 'settings' && !dynamic
							? <button type="button"
									  className="button primary button-small float_right"
									  onClick={() => {
									  	this.props.closeModal()
									  }}
									  data-dismiss="modal" >
							  Done
							  </button>
							: null
						}
						<h3 className="modal-title" id="myModalLabel">
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
								type == 'confirm' && !deactivateAccount
								? 'Delete set'
								: null
							}
							{
								type == 'confirm' && deactivateAccount
								? 'Deactivate account'
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
						type !== null && type == 'share'
						? ::this.renderShareBody()
						: null
					}
					{
						type !== null && type == 'settings'
						? ::this.renderSettingsBody(...this.props)
						: null
					}
					{
						type == 'textarea'
						? ::this.renderTextAreaBody()
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
					 	(type == 'log_in') || (type == 'thank_you') || (type == 'settings' && !dynamic)
						? null
						:
						<div className="modal-footer">
							<button type="button" 
									className="button outline" 
									onClick={() => {
										if(dynamic) {
											this.setState({
												type: 'share',
												dynamic: false
											})
										} else if (!dynamic) {
											this.props.closeModal()
										}
									}}
									data-dismiss={!dynamic && 'modal'}>
									Cancel
							</button>
							{
								type == 'confirm'
								? null
								:
								<button type="button" 
										className="button primary" 
										data-dismiss='modal'
										onClick={() => {
											type == 'textarea' 
											? ::this.changePurpose()
											: null
											type == 'settings' && dynamic 
											? this.setState({
												type: 'share',
												dynamic: false
											})
											: null
											this.props.closeModal()
										}}>
										{
											type == 'textarea'
											? 'Update purpose'
											: null
										}
										{
											type == 'settings' && dynamic
											? 'Save settings'
											: null
										}
										{
											type == 'share'
											? 'Done'
											: null
										}
										{
											type == 'import'
											&& 'Transform text'
										}
								</button>
							}
							{
								type == 'confirm' && !deactivateAccount
								?
								<button className="button button-danger" 
										data-dismiss="modal"
										onClick={() => { 
											deleteAssignment(assignment.id, pushState)
											this.props.closeModal()
										}}>
									Delete set
								</button>
								: null
							}
							{
								type == 'confirm' && deactivateAccount
								&&
								<LaddaButton
									onClick={() => {
										this.props.handleDeactivateAccount()
									}}
									loading={this.props.deactivateLoading}
									className="button danger"
									buttonStyle="expand-right"
									spinnerSize={30}
									spinnerColor="#fff">
								Yes, deactivate account
								</LaddaButton>
							}
						</div>
					}
					</div>
				</div>
			</div>
		);
	}
}