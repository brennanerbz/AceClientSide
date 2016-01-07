import React, { Component, PropTypes } from 'react';
require('./LanguageSelect.scss')

import BubbleDropdown from '../../Dropdown/Dropdown';
export default class LanguageSelect extends Component {
	static propTypes = {
	}

	state = {
		languageOptionsOpen: false
	}

	render() {
		const { languageOptionsOpen } = this.state, { termSide } = this.props;
		return(
			<span className="language_select">
				<a 
				style={{
					left: termSide ? '50px' : '80px'
				}}
				ref="language_select"
				onClick={() => this.setState({languageOptionsOpen: !languageOptionsOpen})}
				className="language_select_button">
					English
					<span className="octicon caret_down">
					</span>
				</a>
				{
					languageOptionsOpen
					&&
					<BubbleDropdown 
						target_node={this.refs.language_select}
						pushState={this.props.pushState}
						languageSelect={true}
						leftAlign={true}
						hideDropdown={() => {
							this.setState({
								languageOptionsOpen: false
							})
						}}
					/>
				}
			</span>
		);
	}
}