import React, { Component, PropTypes } from 'react';
import BubbleDropDown from '../../Dropdown/Dropdown';

export default class SetListItemActionsView extends Component {
	static propTypes = {
	}

	state = {
		show_dropdown: false
	}

	render() {
		const more = require('../../../assets/elipses.png'),
			 blue_more = require('../../../assets/blue_elipses.png')
		return(
			<div className="more_actions">
				{
					!this.props.mouseIsOver
					&&
					false
					&&
					<img style={
						{
							height: '3.75px',
							opacity: '0.5'
						}
					} className="placeholder" src={more}/>
				}
				{
					this.props.mouseIsOver
					// true
					&&
					<button
						onClick={() => {
							this.setState({
								show_dropdown: !this.state.show_dropdown
							})
						}}
						style={{
							padding: '7px 9px 8px'
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
						<img style={{height: '3.75px'}}  className="" src={more}/>
					</button>
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