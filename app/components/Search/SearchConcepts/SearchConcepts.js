import React, { Component, PropTypes } from 'react';

/* SCSS styles */
require('./SearchConcepts.scss');
import ItemSectionContainer from './ItemSectionContainer';
import NullSearchResults from '../NullResults/NullSearchResults';
import RelatedList from './RelatedList';

export default class SearchConcepts extends Component {
	static propTypes = {

	}

	renderItemSections(sections) {
		let s = []
		for(var prop in sections) {
			if(sections.hasOwnProperty(prop)) {
				s.push(
					<ItemSectionContainer 
						key={prop}
						section_name={prop}
						query={this.props.query}
						result_count={this.props.result_count}
						sections={sections}
						section={sections[prop]} />
				)
			}
		}
		return s;
	}

	render() {
		const { 
			item_sections 
		} = this.props,
			length = Object.keys(item_sections).length
		return(
			<div className="search_concept_container">
				{
					length === 0
					&&
					<NullSearchResults style={{margin: '0'}} {...this.props} />
 				}
				{
					length > 0
					&& 
					::this.renderItemSections(item_sections).map(section => {
						return section
					})
				}
				{
					this.props.related !== null && this.props.related.length > 0
					? <RelatedList {...this.props}/>
					: null
				}
			</div>
		);
	}
}