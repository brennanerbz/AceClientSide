import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';


export default class InstructionItem extends Component {
	static propTypes = {
	}

	render() {
		const { instruction, index } = this.props, { heading, content } = instruction;
		return(
			<div className="instruction_item">
				<h4 className="heading">
					{ heading.toUpperCase() }
				</h4>
				<div className="content">
					<span className="instruction_item_index_circle">
						<div className="instruction_item_index">
							{ index }
						</div>
					</span>
					<span className="instruction_item_content">
						{ content }
					</span>
				</div>
			</div>
		);
	}
}