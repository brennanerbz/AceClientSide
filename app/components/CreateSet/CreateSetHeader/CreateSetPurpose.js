import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import AutoexpandTextarea from '../AutoexpandTextarea/AutoexpandTextarea';

export default class Home extends Component {
	static propTypes = {
		indexForTab: PropTypes.number
	}

	render() {
		const { indexForTab } = this.props;
		return(
			<div className="CreateSetHeader-section CreateSetHeader-section-purpose">
				<div className="CreateSetHeader-textarea">
					<AutoexpandTextarea
						tabIndex={indexForTab}
						{...this.props}
					/>
				</div>								
			</div>
		);
	}
}