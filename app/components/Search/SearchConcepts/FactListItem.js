import React, { Component, PropTypes } from 'react';

export default class FactListItem extends Component {
	static propTypes = {
		fact: PropTypes.object
	}

	renderFact(fact, term, query) {
		if(fact == null) return {__html: null}
		fact = fact
		.replace(new RegExp('(^|\\s)(' + term + ')(\\s|$)','ig'), '$1<i>$2</i>$3')
		.replace(query, `<b>${query}</b>`)  
		return {
			__html: fact
		}
	}

	render() {
		const { fact, index, query } = this.props;
		return(
			<li className="fact_item">
				<p className="fact"
				   dangerouslySetInnerHTML={
				   	::this.renderFact(
				   		fact.cue,
				   		fact.target,
				   		query
				   	)
				   }>
				</p>
			</li>
		);
	}
}