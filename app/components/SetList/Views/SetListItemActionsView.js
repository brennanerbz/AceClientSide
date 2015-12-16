import React, { Component, PropTypes } from 'react';
import BubbleDropDown from '../../Dropdown/Dropdown';

export default class SetListItemActionsView extends Component {
	static propTypes = {
	}

	state = {
		show_dropdown: false
	}

	render() {
		const more = require('../../../assets/elipses.png');
		return(
			<div className="more_actions">
				{
					!this.props.mouseIsOver
					&&
					<img style={{height: '5.5px'}} className="placeholder" src={more}/>
				}
				{
					this.props.mouseIsOver
					&&
					<div className="more_actions_button">
						<button
							style={{
								padding: '0 8px'
							}}
							onClick={() => {
								this.setState({
									show_dropdown: !this.state.show_dropdown
								})
							}}
							ref="more"
							className="button outline"
							anchor_bottom={false}
							arrow_position="top"
							autoFocus={false}
							bubbleDropDownHidden={!this.state.show_dropdown}
							bubbleDropDownShown={this.state.show_dropdown}
							position="fixed"
							show_arrow="true"
							vertical_displacement={0}
							horizontal_displacement={0}
						>
							<img style={{height: '5.5px'}}  className="" src={more}/>
						</button>
					</div>
				}
				{
					this.state.show_dropdown 
					&&
					<BubbleDropDown 
						set_list_item={true}
						target_node={this.refs.more}
						pushState={this.props.pushState}
						hideDropdown={() => {
							this.setState({show_dropdown: false})
						}}
						{...this.props}
					/>
				}
			</div>
		);
	}
}