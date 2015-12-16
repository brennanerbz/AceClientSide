import React, { Component, PropTypes } from 'react';
import ExampleItem from './ExampleItem';

export default class ExampleList extends Component {
	static propTypes = {
	}

	state = {
	}

	render() {
		const { examples, term } = this.props;
		return(
			<div className="term_container">
				<p className="example_label">Examples of {term}:</p>
				<ul className="example_list">
					{
						examples.map((x, i) => {
							return (
								<ExampleItem 
									index={i} 
									key={i} 
									example={x}
									query={this.props.query}
								/>
							);
						})
					}
				</ul>
			</div>
		)
	}
}