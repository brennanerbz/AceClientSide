import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class ExampleItem extends Component {
	static propTypes = {
	}

	state = {
	}

	renderExample(ex, term, query) {
		if(ex == null) return {__html: null}
		ex = ex
		.replace(new RegExp('(^|\\s)(' + term + ')(\\s|$)','ig'), '$1<i>$2</i>$3')
		.replace(query, `<b>${query}</b>`) 
		return {
			__html: ex
		}
	}

	render() {
		const { example, index, query } = this.props,
			wiki = require('../../../assets/wiki.png')
		return(
			<li className="example_item">
				<p className="example"
				   dangerouslySetInnerHTML={
				   	::this.renderExample(
				   		example.cue,
				   		example.target,
				   		query
				   	)
				   }></p>
				<div className="source">
					<div className="info">
						
						<span className="heading">
						{example.creator.username}
						</span>
						
					</div>
				</div>
			</li>
		);
	}
}
/*
<p className="sub_heading">
</p>
// <span>Source: </span>
// <img className="source_icon" src={wiki} />
*/