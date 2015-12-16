import React, { Component, PropTypes } from 'react';
import SearchSetActions from './SearchSetActions';

export default class SearchSetItem extends Component {
	static propTypes = {
	}

	state = {
		hover: false
	}

	renderPurpose(def, query) {
		if(def == null) return { __html: null }
		let holder,
			purpose;
		holder = def.replace(/ *\([^)]*\) */g, "").split(".")[0] + '.'
		purpose = holder.replace(query, `<b>${query}</b>`)
		return {
			__html: purpose
		}
	}

	render() {
		let set_icon = require('../../../assets/set_icon_lines.png'),
			  { set, pushState, query } = this.props;
		return(
			<li className="search_set_item"
				onMouseOver={() => this.setState({
					hover: true
				})}
				onMouseLeave={() => {
					this.setState({
						hover: false
					})
				}}>
				<div className="set_icon_container" onClick={() => pushState(null, `/set/${set.id}`)}>
					<img src={set_icon} className="set_icon" />
				</div>
				<div className="set_content">
					<h4 className="set_title"
						onClick={() => pushState(null, `/set/${set.id}`)}>{set.title}</h4>
					<a className="set_creator"
					   onClick={() => pushState(null, `/profile/${set.creator_id}`)}>by {set.creator.username}</a>
					<p className="set_purpose" 
					   dangerouslySetInnerHTML={::this.renderPurpose(set.description, query)}>
					</p>
					<span className="set_stats">{set.associations_count} items</span>
				</div>
				<div className="set_list_item_actions">
					<div style={{ 
						right: '-55px',
						top: '5px'
					}} className="inner">
						{
							this.state.hover 
							&&
							<button className="button outline">Share</button>
						}
						<SearchSetActions 
						 	handleToggleSelect=""
						 	handleOpen=""
						 	handleDelete=""
						 	handleEdit=""
						 	handleCopy=""
						 	handleShare=""
						 	hover={this.state.hover}
						/>
					</div>
				</div>
			</li>
		);
	}
}