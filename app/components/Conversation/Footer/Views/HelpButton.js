import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class HelpButton extends Component {
	static propTypes = {
	}

	state = {
		isHovering: false
	}

	render() {
		// add question mark icon and hover effects
		// add bubble menu
		const { isHovering } = this.state,
		{isFocused} = this.props;
		return(
			<a id="primary_help" 
				className={classnames({'focused': isFocused})}
				onMouseOver={() => this.setState({isHovering: true})}
				onMouseLeave={() => this.setState({isHovering: false})}>
				<span id="question_mark">
					?
				</span>
			</a>
		);
	}
}

/*
<img 
					style={{
						marginBottom: '3px',
						height: '14px',
						opacity: '1'
					}}
					src={isHovering ? whiteQuestionMark : questionMark} 
					className="question icon"/>
					*/