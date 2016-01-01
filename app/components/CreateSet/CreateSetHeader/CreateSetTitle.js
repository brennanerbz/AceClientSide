import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import AutoexpandTextarea from '../AutoexpandTextarea/AutoexpandTextarea';

export default class CreateSetTitle extends Component {
	static propTypes = {
		indexForTab: PropTypes.number
	}

	componentWillReceiveProps(nextProps) {
		if(this.props.importVisible && !nextProps.importVisible) {
			$('#create_set_title').focus()
		}
	}

	render() {
		const { indexForTab } = this.props;
		return(
			<div className="CreateSetHeader-section CreateSetHeader-section-title">
				<div className="CreateSetHeader-textarea">
					<AutoexpandTextarea	
						createSetTitle={true}
						autoFocus={this.props.shouldAutoFocus}			
						tabIndex={indexForTab}
						{...this.props}
					/>
				</div>
			</div>
		);
	}
}