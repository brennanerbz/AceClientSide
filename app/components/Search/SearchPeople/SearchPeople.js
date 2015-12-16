import React, { Component, PropTypes } from 'react';
import SearchPersonItem from './SearchPersonItem';
import NullSearchResults from '../NullResults/NullSearchResults';

require('./SearchPeople.scss');
export default class SearchPeople extends Component {
	static propTypes = {

	}

	render() {
		const { users, query, result_count, searching } = this.props;
		return(
			<div className="search_people_container">
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
				<ul className="people_list">
					{
						users !== null && users.length > 0
						?
						users.map((x, i) => {
							return <SearchPersonItem key={i} 
												     user={x} 
												     {...this.props}/>
						})
						: null
						
					}
					{
						users !== null && users.length == 0  
						? <NullSearchResults  style={{margin: '0'}} {...this.props}/>
						: null
					}
				</ul>
			</div>
		);
	}
}