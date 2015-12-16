import React, { Component, PropTypes} from 'react';
import classnames from 'classnames';

class RelatedItem extends Component {
	render(){
		const { term } = this.props;
		return(
			<span className="label label-default">{term}</span>
		);
	}
}

export default class Related extends Component {
	static propTypes = {
		related: PropTypes.string
	}
	render() {
		const { related } = this.props;
		let p_related;
		if (related !== null) { p_related = related.split('|')}
		return (
			<div>
				{	p_related !== null
					? p_related.map((term, i) => <RelatedItem key={i} term={term}/>)
					: null
				}
			</div>
		);
	}
}
