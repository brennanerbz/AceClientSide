import React, { Component, PropTypes } from 'react';

import ShareModal from './ShareModal';
import SettingsModal from './SettingsModal';
import DynamicContent from './DynamicContent';

export default class DynamicModal extends Component {

	static propTypes = {
	}

	componentDidMount() {
		const { set } = this.props;
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

	render() {
		const { isDynamicContentActive, type } = this.props;
		return(
			<div ref="modal" className="modal fade">
				<div className="modal-dialog">
					{
						(!isDynamicContentActive || isDynamicContentActive) && type == 'share' 
						&&
						<ShareModal
						{...this.props}
						/>
					}
					{
						(!isDynamicContentActive || isDynamicContentActive)  && type == 'settings'
						&&
						<SettingsModal
						{...this.props}
						/>
					}
				</div>
			</div>
		);
	}
}