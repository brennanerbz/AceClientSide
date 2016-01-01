import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class SetTitle extends Component {
	static propTypes = {
	}

	render() {
		let { setTitle, currentSet, pushState } = this.props,
		setIcon = require('../../../../assets/set_icon_lines.png'),
		lockIcon = require('../../../../assets/lock.png'),
		icon;
		if(currentSet.privacy == 'public') icon = setIcon
		else if (currentSet.privacy == 'private') icon = lockIcon
		return(
			<span className="name"
				  onClick={() => {
				  	pushState(null, `/set/${currentSet.id}`)
				  }}>
				<span className="prefix">
					{
						false 
						&&
						<img
							style={{
								height: currentSet.privacy == 'public' ? '24px' : '17px',
								marginBottom: '5px',
								marginRight: '10px'

							}} 
							src={icon} 
							className="icon"/>
					}
				</span>
				{setTitle}
			</span>
		);
	}
}