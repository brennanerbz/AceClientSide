import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class ConceptHeader extends Component {
	static propTypes = {
	}

	render() {
		const { term, subjects } = this.props;
		let subs = [], tag_icon = require('../../../assets/tag.png');		
		if(subjects !== null) {
			subjects.forEach((sub, i) => {
				if(i >= 3) return;
				subs.push("#" + sub.name.toLowerCase())
			})
		}
	return(
			<div className={classnames("concept_header", { "subjects": subjects.length > 0 })}>
				<h4 className="search_query">{term}</h4>
				{
					subjects !== null && subjects.length > 0
					?
					<ul className="subject_list">
						{
							subs.map((sub, i)=> {
								return (
									<li key={i} className="subject_item">{sub}</li>
								)
							})
						}
					</ul>
				: null
				}
			</div>
		);
	}
}