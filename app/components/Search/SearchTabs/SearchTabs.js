import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class SearchTabs extends Component {
	static propTypes = {
	}

	render() {
		const { loc, query, pushState, changeTab } = this.props,
			    pathname = loc.pathname;
		return(
			<div className="tabs_container">
				<ul className="tabs_list">
					<li className={classnames("tab_item", 
											 {"active": pathname.indexOf('sets') !== -1})}
						onClick={() => { 
							pushState(null, `/search/sets/${query}`)
							changeTab('sets') 
						}}>
						<a>Sets</a>
					</li>
					<li className={classnames("tab_item", 
											 {"active": pathname.indexOf('users') !== -1})}
						onClick={() => { 
							pushState(null, `/search/users/${query}`)
							changeTab('users') 
						}}>
						<a>People</a>
					</li>
					<li className={classnames("tab_item concepts_tab right_most", 
								   			 {"active": pathname.indexOf('concepts') !== -1})}
						onClick={() => { 
							pushState(null, `/search/concepts/${query}`) 
							changeTab('concepts') 
						}}>
						<a>Terms</a>
					</li>
				</ul>
			</div>
		);
	}
}
