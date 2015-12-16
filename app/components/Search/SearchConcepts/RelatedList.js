import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import RelatedItem from './RelatedItem';

export default class RelatedList extends Component {
	static propTypes = {
	}

	render() {
		const { related, query } = this.props;
		let first_five = related.slice(0, 4),
			second_five = related.slice(5, 9)
		return(
			<div className="related_container">
				{
					related !== undefined && related.length > 0
					?
					<div>
						<p className="search_label">Concepts related to {query}</p>
						<div className="related_table">
							<ul className="list">
								{first_five.map((term, i) => { 
									return (
										<a className="item link" 
										   key={"first_five" + i}
										   onClick={() => {
											this.props.searchItems(term.target)
											this.props.pushState(null, `/search/concepts/${term.target}`)
										}}>
										{term.target}
										</a>
									)
								})}
							</ul>
							<ul className="list">
								{second_five.map((term, i) => { 
									return (
										<a className="item link" 
										   key={"second_five" + i}
										   onClick={() => {
											this.props.searchItems(term.target)
											this.props.pushState(null, `/search/concepts/${term.target}`)
										}}>
										{term.target}
										</a>
									)
								})}
							</ul>
						</div>
					</div>
					: null
				}
				
			</div>
		);
	}
}

// <ul className="related_list">
// 	{
// 		related.map((item, i) => {
// 			return <RelatedItem key={i} index={i} item={item} {...this.props}/>
// 		})
// 	}
// </ul>