import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import InstructionsList from '../Views/InstructionsList';

export default class ImportInstructionsView extends Component {
	static propTypes = {
	}

	state = {
		instructions: [
			{
				heading: 'paste text',
				content: 'Paste in any piece of text from a source that you want to learn'
			},
			{
				heading: 'watch it transform',
				content: 'Your text is broken down into smaller meaningful pieces and turned into questions'
			},
			{
				heading: 'practice questions',
				content: 'Take the questions into chat mode with Acubot and practice until you\'re perfect'
			}
		]
	}


	render() {
		const { instructions } = this.state;
		return(
			<div id="import_instructions">
				<h3 className="heading">How it works</h3>
				<InstructionsList
					instructions={instructions}
				/>
			</div>
		);
	}
}