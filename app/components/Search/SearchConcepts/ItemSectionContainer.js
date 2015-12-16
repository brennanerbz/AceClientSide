import React, { Component, PropTypes } from 'react';

import ConceptHeader from './ConceptHeader';
import DefinitionList from './DefinitionList';
import FactList from './FactList';
import ExampleList from './ExampleList';

export default class ItemSectionContainer extends Component {
	static propTypes = {
	}

	state = {
		term: null,
		subjects: null,
		definitions: [],
		facts: [],
		examples: []
	}

	renderSection(section) {
		let item, definitions = [], facts = [], examples =[];
		for(var i = 0; i < section.length; i++) {
			let item = section[i].item;
			if(item.type == 'definition') {
				definitions.push(item)
			}
			if(item.type == 'fact') {
				facts.push(item)
			}
			if(item.type == 'example') {
				examples.push(item)
			}
		}
		this.setState({
			term: section[0].item.target,
			subjects: section[0].item.subjects,
			definitions: definitions,
			facts: facts,
			examples: examples
		})
	}

	componentDidMount() {
		this.renderSection(this.props.section)
	}

	componentWillReceiveProps(nextProps) {
		this.renderSection(nextProps.section)
	}

	render() {
		return(
			<div className="item_section_container">
				{
					this.state.term !== null
					&&
					<ConceptHeader 
						subjects={this.state.subjects}
						term={this.state.term}
					/>
				}
				{
					this.state.definitions.length > 0
					&&
					<DefinitionList 
						definitions={this.state.definitions}
						query={this.props.query}
						term={this.state.term}/>
				}
				{
					this.state.facts.length > 0
					&&
					<FactList 
						facts={this.state.facts}
						query={this.props.query}
						term={this.state.term}/>
				}
				{
					this.state.examples.length > 0
					&&
					<ExampleList 
						examples={this.state.examples}
						query={this.props.query}
						term={this.state.term}/>
				}
			</div>
		);
	}
}