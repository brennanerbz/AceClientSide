import React, { Component, PropTypes } from 'react';
import DefinitionItem from './DefinitionItem';

export default class DefinitionList extends Component {
	static propTypes = {
	}

	render() {
		const { definitions } = this.props;
		console.log(definitions)
		return( 
			<div className="definition_list_container term_container">
				<ul className="definition_list">
					{
						definitions.map((def, i) => {
							return (
								<DefinitionItem 
									key={i}
									definition={def}
									query={this.props.query}
								/>
							)
						})
					}
				</ul>
			</div>
		);
	}
}

