import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class ItemContent extends Component {
	static propTypes = {
	}

	renderTarget(target) { 
		const { pushState } = this.props;
		let new_target = target !== null ? target.charAt(0).toUpperCase() + target.slice(1) : "..."
		return (
			<a className="item_target link"
			   onClick={() => pushState(null, `/search/concepts/${new_target}`)}>
			   {new_target}
			</a>
		)
	}

	renderCue(cue) {
		let new_cue = cue !== null ? cue.charAt(0).toUpperCase() + cue.slice(1) : '...'
		return (
			<p className="item_cue">{new_cue}</p>
		);
	}

	render() {
		const { item, _case, assignment } = this.props;
		return(
			<div className={classnames("text", 
				{'not_studied':  assignment.studied == null })}>
				{::this.renderTarget(item.target)}
				{::this.renderCue(item.cue)}
			</div>
		);
	}
}