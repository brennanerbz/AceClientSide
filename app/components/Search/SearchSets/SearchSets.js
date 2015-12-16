import React, { Component, PropTypes } from 'react';
import SearchSetItem from './SearchSetItem';

import NullSearchResults from '../NullResults/NullSearchResults';

/* SCSS Styles */
require('./SearchSets.scss');

export default class SearchSets extends Component {
	static propTypes = {
	}

	state = {
		should_render_results: true
	}

	componentWillUnmount() {
		const { clearPages } = this.props;
		clearPages()
	}

	render() {
		const { query, sets, result_count, searching } = this.props; 
		return(
			<div className="search_sets_container">
				{
					result_count > 0
					&&
					<h2 className="header">
						{
							searching 
							? "Searching"
							: `About ${result_count} results for '${query}'`
						}
					</h2>
				}
				{
				sets !== null && sets.length > 0
				?
				<ul className="sets_list">
				{
				sets.map((x, i) => {
				return <SearchSetItem key={i} set={x} key={i} {...this.props}/>
				})
				}
				</ul>
				: null
				}
				{
				(sets == null || sets.length == 0) && !searching
				? <NullSearchResults {...this.props}/>
				: null
				}
			</div>
		);
	}
}