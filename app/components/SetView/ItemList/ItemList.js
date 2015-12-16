import React, { Component, PropTypes } from 'react';
require('./ItemList.scss');
import Item from './Item';
import ItemListActions from './ItemListActions';

export default class ItemList extends Component {
	static propTypes = {
	}

	state = {
		filterStarred: false
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.total_starred === 0) {
			this.setState({
				filterStarred: false
			})
		}
	}


	renderEditLink(assignment, set, user) {
		if(assignment.permission == 'nonadmin') return true
		if(assignment.permission == 'admin' && set.creator_id == user.id) return true
	}

	render() {
		const { item_count, items, associations, cases, assignment, pushState, set, user, isFetchingSupplemental } = this.props;
		let sorted_asssociations = associations.sort((a, b) => {
			return a.order - b.order
		}),
		starred_instances;
		if(this.state.filterStarred && this.props.total_starred > 0) {
			starred_instances = [];
			for(var i = 0; i < cases.length; i++) {
				if(cases[i].starred) {
					starred_instances.push(cases[i].association_id)
				}
			}	
			sorted_asssociations = sorted_asssociations.filter(asc => {
				return asc.id == starred_instances[starred_instances.indexOf(asc.id)]
			})
		}
		let _case;
		return(
			<div className="item_list_container">
				{
					this.props.total_starred > 0
					&&
					<ItemListActions 
						{...this.props}
						selectAll={() => {
							this.setState({filterStarred: false})
						}}
						selectStarred={() => {
							this.setState({filterStarred: true})
						}}
					/>
				}
				<ul className="item_list">
					{sorted_asssociations.map((asc, i) => {
						_case = this.props.cases !== undefined
						? this.props.cases.filter(c => c.association_id == asc.id)[0]
						: null
						return <Item key={i} 
									 assignment={this.props.assignment}
									 association={asc}
									 item={asc.item} 
									 _case={_case}
									 updateCase={this.props.updateCase}
									 pushState={pushState}
									 isFetchingSupplemental={isFetchingSupplemental}
						/>
					})}
				</ul>
			</div>
		);
	}
} 

/*
{
	::this.renderEditLink(assignment, set, user) 
	?
	<a  className="item_actions"
	    onClick={() => pushState(null, `/createset/${set.id}`)}>
		Edit
	</a>
	: null
}
*/