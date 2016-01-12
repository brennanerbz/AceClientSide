import React, { Component, PropTypes } from 'react';
import BubbleDropDown from '../../Dropdown/Dropdown';

export default class SetListItemActionsView extends Component {
	static propTypes = {
	}

	state = {
		show_dropdown: false,
		isMouseOverMore: false
	}

	render() {
		let more = require('../../../assets/elipses.png'),
			 blue_more = require('../../../assets/blue_elipses.png'),
			 { isMouseOverMore } = this.state,
			 { set, user_id } = this.props,
		 	 renderCreatorOptions = false, renderAdminOptions = false, renderUserOptions = false;
			 if(set.editability == 'creator' && set.creator_id == user_id) renderCreatorOptions = true
			 else renderUserOptions = true;
		return(
			<div className="more_actions">
				{
					!this.props.mouseIsOver
					&&
					<img style={
						{
							height: '3.75px',
							opacity: '0.5',
							marginLeft: '90px'
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
						onMouseOver={() => this.setState({isMouseOverMore: true})}
						onMouseLeave={() => this.setState({isMouseOverMore: false})}
						ref={`${this.props.assignment.id}`}
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
						<img style={{height: '3.75px'}}  className="" src={isMouseOverMore ? blue_more : more}/>
					</button>
				}
				{
					this.state.show_dropdown 
					&&
					<BubbleDropDown 
						set_list_item={true}
						target_node={this.refs[`${this.props.assignment.id}`]}
						pushState={this.props.pushState}
						renderCreatorOptions={renderCreatorOptions}
						renderUserOptions={renderUserOptions}
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