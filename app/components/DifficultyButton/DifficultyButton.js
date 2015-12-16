import React, { Component, PropTypes } from 'react';
import Menu from '../Menu/Menu';

export default class DifficultyButton extends Component {
	static propTypes = {
	}

	state = {
		diff_is_open: false,
		choices:  ['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Master'],
		diff_value: 'Beginner'
	}

	findPos() {
		let node = this.refs.diff_button;
		const rect = window.getComputedStyle(node)
		return rect;
	}

	openDiffMenu() {
		if (this.state.diff_is_open) {
			this.setState({
				diff_is_open: false
			})
			return;
		}
		this.setState({
			diff_is_open: true
		})
	}

	closeDiffMenu() {
		setTimeout(() => {
			this.setState({
				diff_is_open: false
			});
		}, 100)	
	}

	render() {
		const dropdown_icon = require('../../assets/dropdown_arrow.png');
		return(
			<span className="diff_button">
				<button className="button"
						ref="diff_button"
						onClick={::this.openDiffMenu}
						onBlur={::this.closeDiffMenu}
						>
					{this.state.diff_value}
					<img className="dropdown_menu_icon icon" src={dropdown_icon}/>
				</button>
				<Menu rect={() => ::this.findPos()} 
			 		  side="right"
					  isOpen={this.state.diff_is_open}
					  ref="diff_menu"
					  choices={this.state.choices}
					  onSelect={(choice) => { this.setState({ diff_value: choice })} }
				/>
			</span>
		);
	}
}