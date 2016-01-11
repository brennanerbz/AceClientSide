import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class ItemContent extends Component {
	static propTypes = {
	}

	renderTarget(target) { 
		const { pushState } = this.props;
		// let new_target = target !== null ? target.charAt(0).toUpperCase() + target.slice(1) : "..."
		return (
			<a className="item_target link"
			   onClick={() => pushState(null, `/search/concepts/${target}`)}>
			   {target}
			</a>
		)
	}

	renderCue(cue) {
		// let new_cue = cue !== null ? cue.charAt(0).toUpperCase() + cue.slice(1) : '...'
		return (
			<p className="item_cue">{cue}</p>
		);
	}

	render() {
		const { item, _case, assignment } = this.props;
		return(
			<div className={classnames("text", 
				{'not_studied':  assignment.studied == null })}>
				<span className="word">
					{::this.renderTarget(item.target)}
				</span>
				<span className="definition">
					{::this.renderCue(item.cue)}
				</span>				
			</div>
		);
	} 
}