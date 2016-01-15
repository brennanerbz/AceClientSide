import React, { Component, PropTypes } from 'react';

export default class ShareModal extends Component {

	static propTypes = {
	}

	componentDidUpdate() {
		setTimeout(() => { $(this.refs.share_link).select() }, 300)
	}

	renderBody() {
		let { set, user_id, changeDynamicState} = this.props,
			globe = require('../../assets/globe.png'),
			lock = require('../../assets/lock.png'),
			icon,
			root_path = 'acuit.herokuapp.com';
		if(set.visibility == 'public') {
			icon = globe
		} else {
			icon = lock
		}
		return(
			<div className="modal-body share_link">
				<h2>Link to set</h2>
				<div className="copy_link_input_container"
					 onClick={() => this.refs.share_link.select()}>
					<div className="text_input inline">
						<div className="text_input_wrapper">
							<input readOnly={true} 
								   ref="share_link"
								   type="text" id="share_link" 
								   value={`${root_path}/set/${set.id}`} />
							<label style={{display: 'none'}} htmlFor="share_link"></label>
							<small className="secondary_label"></small>
						</div>
					</div>
				</div>
				{
					set.editability == 'creator' && set.creator_id == user_id
					&&
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
								<a className="change_permission_link"
								   onClick={() => {
									   changeDynamicState(true, 'settings')
								   }}>
									Change permissions
								</a>
							</div>
						</div>
					</div>
				}
			</div>
		)
	}

	render() {
		const { set } = this.props;
		return(
			<div className="modal-content">
				<div className="modal-header settings">
					<button 
					className="close"
					data-dismiss="modal"
					aria-label="close">
						<span aria-hidden="true">&times;</span>
						<span className="sr-only">Close</span>
					</button>
					<div className="modal-title">
						Share link to {set.title}
					</div>
				</div>
				{this.renderBody()}
				<div className="modal-footer">
					<button 
					data-dismiss="modal"
					className="button outline">
						Cancel
					</button>
					<button 
					data-dismiss="modal"
					className="button primary">
						Done
					</button>
				</div>
			</div>
		);
	}
}