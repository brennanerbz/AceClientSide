import React, { Component, PropTypes } from 'react';
require('./ItemList.scss');
import Item from './Item';
import ItemListActions from './ItemListActions';

import SelectInput from '../../SelectInput/SelectInput';
import LaddaButton from 'react-ladda';


export default class ItemList extends Component {
	static propTypes = {
	}

	state = {
		filterStarred: false,
		options: [
			{
				message: 'Study all terms',
				img: null,
				value: false
			},
			{
				message: `Study # * terms only`,
				img: require('../../../assets/star.png'),
				value: true
			} 
		],
		active_option_index: 0
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
		const { item_count, items, associations, cases, assignment, pushState, set, user, isFetchingSupplemental} = this.props;
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
		return(
			<div className="item_list_container">
				{
					this.props.total_starred > 0
					&&
					<SelectInput 
						custom_style={{
								position: 'absolute',
								right: '5%',
							    top: '-47.5px'	
						}}
						filler_number={this.props.total_starred}
						options={this.state.options}
						active_option_index={this.state.active_option_index}
						handleSelect={(stars, index) => {
							this.setState({
								filterStarred: stars,
								active_option_index: index
							})
							this.props.selectStarredItems(stars)
						}}
					/>
				}
				<ul className="item_list">
					{sorted_asssociations.map((asc, i) => {
						let _case = this.props.cases !== undefined
						? this.props.cases.filter(c => c.association_id == asc.id)[0]
						: null
						return <Item key={i} 
									 set={this.props.set}
									 createAssignment={this.props.createAssignment}
									 filteredStarredItems={this.state.filterStarred}
									 assignment={this.props.assignment}
									 association={asc}
									 item={asc.item} 
									 _case={_case}
									 studied={this.props.assignment.studied !== null ? true : false}
									 updateCase={this.props.updateCase}
									 pushState={pushState}
									 isFetchingSupplemental={isFetchingSupplemental}
									 isFetchingInstances={this.props.isFetchingInstances}
						/>
					})}
				</ul>
				{
					this.props.associations.length < this.props.set.associations_count
					&&
					<LaddaButton 
					onClick={() => {
						this.props.fetchAssociations(this.props.set.id, this.props.start, this.props.end)
					}}
					loading={this.props.isFetchingAssociations}
					buttonStyle='expand-right'
					className="button primary large">
						See all terms
					</LaddaButton>
				}
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