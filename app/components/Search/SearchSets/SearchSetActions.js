import React, { Component, PropTypes } from 'react';

export default class SearchSetActions extends Component {
	static propTypes = {
		hover: PropTypes.boolean
	}

	render() {
		const more = require('../../../assets/elipses.png');
		return(
			<div className="more_actions">
				{
					!this.props.hover
					?
					<img style={{height: '6.5px'}} className="placeholder" src={more}/>
					:
					<div className="more_actions_button">
						<button
							style={{
								padding: '0 8px'
							}}
							className="button outline"
							anchor_bottom={false}
							arrow_position="top"
							autoFocus={false}
							bubbleDropDownHidden={false}
							bubbleDropDownShown={false}
							position="fixed"
							show_arrow="true"
							vertical_displacement={0}
							horizontal_displacement={0}
						>
						<img style={{height: '5.5px'}} className="" src={more}/>
						</button>
					</div>
				}				
			</div>
		);
	}
}