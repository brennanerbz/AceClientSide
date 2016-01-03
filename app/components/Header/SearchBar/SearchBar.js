import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
require('./SearchBar.scss');

export default class SearchBar extends Component {
	static propTypes = {
	}
	
	state = {
		focused: false,
		typing: false
	}

	render() {
		const { focused, typing } = this.state,
		searchIcon = require('../assets/SearchIcon.png'),
	    whiteSearchIcon = require('../assets/whiteSearchIcon.png');
		return(
			<div id="search_bar"> 
				<form id="search_input_holder">
					<div id="text_input">
						<div className="text_input_wrapper">
							<input 
								type="text" 
								id="input" 
								className={classnames("text_input_input", {'focused': focused})}
								onFocus={() => this.setState({focused: true})}
								onBlur={() => this.setState({focused: false})}
								onChange={(e) => {
									if(e.target.value.length > 0) {
										this.setState({
											typing: true,
											searchQuery: e.target.value
										})
									} else {
										this.setState({
											typing: false
										})
									}
								}}
								onKeyDown={() => {

								}}
								/>
							{
								!typing
								&&
								<label style={{display: 'block'}} for="input">Search</label>
							}
						</div>
					</div>
					<button 
						className={classnames({'focused': focused})} 
						id="search_button">
						<img src={searchIcon} id="search_button_icon"/>
					</button>
				</form>
			</div>
		);
	}
}