import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import InstructionItem from './InstructionItem';
export default class InstructionsList extends Component {
	static propTypes = {
	}


	render() {
		const { instructions } = this.props;
		return(
			<ol id="instructions_list">
				{
					instructions.map((instruction, i) => {
						return (
							<InstructionItem
								key={i}
								index={i}
								instruction={instruction}
							/>
						)
					})
				}
			</ol>
		);
	}
}