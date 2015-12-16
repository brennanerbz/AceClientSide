import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import TextareaAutosize from './TextareaAutosize';

export default class AutoexpandTextarea extends Component {
	static propTypes = {
		
	}

	render(){		
		// console.log(this.props.autoFocus)
 		return(
			<div className="AutoExpandTextArea">
				<div className="AutoExpandTextArea-wrapper">
					<TextareaAutosize						
						className="AutoExpandTextArea-textarea" 
						{...this.props}>
					</TextareaAutosize>
				</div>
			</div>
		);
	}
}