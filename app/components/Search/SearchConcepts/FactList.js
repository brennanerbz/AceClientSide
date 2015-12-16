import React, { Component, PropTypes } from 'react';
import FactListItem from './FactListItem';

export default class FactList extends Component {
	static propTypes = {
		facts: PropTypes.array
	}

	render() {
		const { facts, term} = this.props;
		return(
			<div className="concept_result_container term_container">
				<h2>Facts about {term}:</h2>
				<ul className="fact_list">
					{
						facts.map((fact, i) => {
							return <FactListItem key={i} fact={fact} query={this.props.query} />
						})
					}
				</ul>
			</div>
		);
	}
}