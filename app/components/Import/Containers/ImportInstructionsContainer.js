import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import InstructionsList from '../Views/InstructionsList';

export default class ImportInstructionsView extends Component {
	static propTypes = {
	}

	state = {
		instructions: [
			{
				heading: 'paste',
				content: 'Paste in any piece of text that you want to learn'
			},
			{
				heading: 'transform',
				content: 'Your text is automatically turned into questions'
			},
			{
				heading: 'practice',
				content: 'Practice the questions in Learn mode with Acubot'
			}
		]
	}


	render() {
		const { instructions } = this.state;
		return(
			<div id="import_instructions">
				
				<InstructionsList
					instructions={instructions}
				/>
			</div>
		);
	}
}