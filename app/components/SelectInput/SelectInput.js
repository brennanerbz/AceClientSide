import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
require('./SelectInput.scss');


/* SelectInput smart container holds state */
export default class SelectInput extends Component {
	static propTypes = {
	}

	state = {
		dropdown_shown: false,
		options: [],
		selected_item: null,
		isMouseOver: false
	}

	componentDidMount() {
		const { options, active_option_index } = this.props;
		this.setState({
			options: options,
			selected_item: options[active_option_index]
		})
	}

	render() {
		let { custom_style } = this.props, c_style = {};
		if(custom_style !== null) c_style = custom_style
		return(
			<div style={c_style} 
				className="select_input">
				<HiddenElement 
					options={this.state.options}
				/>
				<SelectedItem 
					handleClick={() => {
						this.setState({
							dropdown_shown: !this.state.dropdown_shown,
							isMouseOver: false
						})
					}}
					selected_item={this.state.selected_item}
					filler_number={this.props.filler_number}
					isMouseOver={this.state.isMouseOver}
					isDropdownShow={this.state.dropdown_shown}
					setMouseOver={(isOver) => this.setState({isMouseOver: isOver})}
				/>
				{
					this.state.dropdown_shown
					&&
					<OptionList 
						options={this.state.options}
						changeSelectedItem={(index) => {
							this.setState({
								selected_item: this.state.options[index],
								dropdown_shown: false
							});
							this.props.handleSelect(this.state.options[index].value, index)
						}}
						filler_number={this.props.filler_number}
					/>
				}
			</div>
		);
	}
}

class SelectedItem extends Component {
	static propTypes = {

	}

	render() {
		const { selected_item, isMouseOver, isDropdownShow } = this.props,
			db_down = require('../../assets/db_arrow_down.png'),
			blue_db_down = require('../../assets/dbArrowDownBlue.png')
		return(
			<div 
				onMouseOver={() => this.props.setMouseOver(true)} 
				onMouseLeave={() =>  this.props.setMouseOver(false)}
				className={classnames("selected_item", {'active': isDropdownShow })}
				onClick={() => {
					this.props.handleClick()
				}}>
				<div className="list_item select_option">
					{
						selected_item.img == null
						? selected_item.message
						: null
					}
					{
						selected_item.img !== null
						?
						<div>
						{ selected_item.message.split('*')[0].replace("#", this.props.filler_number) }
						{
							<span>
								<img style={{
										height: '12.5px',
										margin: '-4px 3px 0px 3px'
									}} 
									src={selected_item.img}/>
							</span> 
						}
						{ 
							this.props.filler_number > 1
							? selected_item.message.split('*')[1] 
							: selected_item.message.split('*')[1].replace('terms', 'term')
						}
						</div>
						: null
					}
				</div>
				<div className="dropdown_arrow">
					<img style={{height: '5.5px'}} src={(!isMouseOver) ? db_down : blue_db_down}/>
				</div>
			</div>
		)
	}
}


/* List actions and view */
class OptionList extends Component {
	static propTypes = {

	}

	state = {
	}

	render() {
		const { options } = this.props;
		return(
			<div className="dropdown">
				{
					options.map((content, i)=> {
						return (
							<OptionListItem 
							key={i}
							index={i}
							item={content}
							changeSelectedItem={this.props.changeSelectedItem}
							filler_number={this.props.filler_number}
							/>
						)
					})
				}
			</div>
		);
	}
}


/* List item actions and view */
class OptionListItem extends Component {
	static propTypes = {

	}

	state = {
		selected: false
	}

	render() {
		const { item, index } = this.props;
		return(
			<div 
				className={classnames(
					"list_item select_option", { 'active_item': this.state.selected }
				)}
				onClick={() => {
					this.props.changeSelectedItem(index)
				}}
				onMouseOver={() => this.setState({selected: true})}
				onMouseLeave={() => this.setState({selected: false})}>
			{
				item.img == null
				? item.message
				: null
			}
			{
				item.img !== null
				?
				<div>
				{ item.message.split('*')[0].replace("#", this.props.filler_number) }
				{
					<span>
						<img style={{
										height: '12.5px',
										margin: '-4px 3px 0px 3px'
									}}  
							src={item.img}/>
					</span> 
				}
				{ 
					this.props.filler_number > 1
					? item.message.split('*')[1] 
					: item.message.split('*')[1].replace('terms', 'term')
				}
				</div>
				: null
			}
			</div>
		)
	}
}



class HiddenElement extends Component {
	static propTypes = {

	}

	render() {
		const { options } = this.props;
		return(
			<div style={{ display: 'none'}}>
				<select>
					{
						options.map(a => {
							return(
								<option>
								</option>
							)
						})
					}
				</select>
			</div>
		)
	}
}
