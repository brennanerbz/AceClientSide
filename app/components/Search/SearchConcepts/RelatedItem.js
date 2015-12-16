import React, { Component, PropTypes } from 'react';

export default class RelatedItem extends Component {
	static propTypes = {

	}

	render() {
		const { item } = this.props;
		return(
			<li className="related_item">
				<a className="link">{item.target.charAt(0).toUpperCase() + item.target.slice(1)}</a>
				<p className="cue">{item.cue}</p>
			</li>
		);
	}
}