import React, { Component, PropTypes } from 'react';
require('./Hint.scss');

export default class Hint extends Component {
	static propTypes = {
		hints: PropTypes.array
	}

	render() {
		const { hints } = this.props,
			  hint = hints !== null ? hints[0] : null;
		return (
			hint !== null
			? <div className="hint_container">	
				<p className="hint">{hint}</p>
				<p className="hint_source">Source</p>
			  </div>
			: null
		);
	}
}


// <p className="hint_label">Hint:</p>