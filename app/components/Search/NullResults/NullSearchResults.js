import React, { Component, PropTypes } from 'react';
require('./NullResults.scss');

export default class NullSearchResults extends Component {
	static propTypes = {
	}

	render() {
		const { query, loc } = this.props;
		let pathname = loc.pathname,
			path;
		if(pathname.indexOf('concepts') !== -1) path = 'concepts'
		if(pathname.indexOf('sets') !== -1) path = 'sets'
		if(pathname.indexOf('users') !== -1) path = 'people'
		return(
			<div style={{margin: '0'}} className="null_results_container">
				<p>Your search - <b>"{query}"</b> did not match any {path}</p>
				<p>Suggestions:</p>
				<ul className="null_list">
					<li>Make sure all words are spelled correctly.</li>
					<li>Try different keywords.</li>
					<li>Try more general keywords.</li>
				</ul>
			</div>
		);
	}
}