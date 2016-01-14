import React, { Component, PropTypes } from 'react';

export default class SettingsModal extends Component {
	static propTypes = {
	}

	state = {
		visibility: 'public',
		editability: 'creator'
	}

	componentDidMount() {
		const { set } = this.props;
		this.setState({
			visibility: set.visibility,
			editability: set.editability
		});
		$(this.refs.modal).on('hidden.bs.modal', (e) => {
			this.props.closeModal()
		})
	}

	componentWillReceiveProps(nextProps) {
		if(!this.props.open && nextProps.open) {
			$(this.refs.modal).modal()
		}
		if(this.props.open && !nextProps.open) {
			$(this.refs.modal).modal('hide')
		}
	}

	changeVisibilitySettings = (setting) => {
		const { set, updateSet, createSet } = this.props;
		if(set == null) {
			createSet(null, {name: 'visibility', prop: setting })
		} else if(set !== null) {
			updateSet(set, {name: 'visibility', prop: setting })
		}
		this.setState({
			visibility: setting
		});
	}

	changeEditabilitySettings = (setting) => {
		const { set, updateSet, createSet } = this.props;
		if(set == null) {
			createSet(null, {name: 'editability', prop: setting })
		} else if(set !== null) {
			updateSet(set, {name: 'editability', prop: setting })
		}
		this.setState({
			editability: setting
		});
	}

	renderBody = () => {
		const { visibility, editability } = this.state,
		{ set } = this.props;
		return(
			<div className="modal-body no_footer">
				<p className="bold no_bottom_margin">Privacy</p>
				<p className="small_bottom_margin">Who can view?</p>
				<p className="left_margin">
					<label className="radio small_bottom_margin">
						<input ref="public_privacy"
							   type="radio" 
							   defaultChecked={true}
							   checked={set !== null ? visibility == 'public' : null}
							   onChange={() => this.changeVisibilitySettings('public')} 
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
							   checked={set !== null ? visibility == 'private' : null}
							   onChange={() => this.changeVisibilitySettings('private')} 
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
							   checked={set !== null ? editability == 'group' : null}
							   onChange={() => this.changeEditabilitySettings('group')}
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
							   checked={set !== null ? editability == 'admin' : null}
							   onChange={() => this.changeEditabilitySettings('admin')} 
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
							   checked={set !== null ? editability == 'creator' : null}
							   onChange={() => this.changeEditabilitySettings('creator')} 
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

	render() {
		return(
			<div ref="modal" id="modal-settings"  className="modal fade">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header settings">
							<button 
							data-dismiss="modal"
							className="button primary right button-small">Done</button>
							<div className="modal-title">
								Settings
							</div>
						</div>
						{this.renderBody()}
						<div className="modal-footer">
							<button className="button outline">
							Cancel
							</button>
							<button className="button primary">
							Save settings
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}