import React, { Component, PropTypes } from 'react';
import SearchSetActions from './SearchSetActions';
import moment from 'moment';

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
			<li className="set_list_item public_source">
				<div className="set_list_stats">
					{
						set.subjects.length > 0
						&& `#${set.subjects[0].name.toLowerCase()}`
					}
					<a className="set_list_stat_item">
						<span className="octicon star">
						</span>
						11,987
					</a>
				</div>
				<div className="set_list_icon">
					<img src={set_icon} className="set_icon"/>
				</div>
				<span className="set_list_details">
					<h3 
					className="set_list_name"
					onClick={() => pushState(null, `/set/${set.id}`)}>
						<a>{set.title}</a>
						<p className="item_count">{set.associations_count} terms</p>
					</h3>
					<h2 
					className="set_list_creator"
					onClick={() => pushState(null, `/profile/${set.creator_id}`)}>
						<a>by {set.creator.username}</a>
					</h2>
					<p className="set_list_description">
						{set.description}
					</p>
					<p className="set_list_meta">
						{
							set.modified !== null && set.modified !== 'None'
							&&
							`Last updated ${moment(set.modified).fromNow()}`
						}
					</p>
				</span>
				<div className="activity_graph">
				</div>
			</li>
		);
	}
}


/*

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
			</h4>
		<a className="set_creator"
		  >by {set.creator.username}</a>
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
*/