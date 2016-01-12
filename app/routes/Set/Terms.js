import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ItemList from '../../components/SetView/ItemList/ItemList';


export default class Terms extends Component {
	static propTypes = {
	}

	render() {
		return(
			<ItemList
				assignment={this.props.assignment}
				isFetchingAssociations={this.props.isFetchingAssociations}
				fetchAssociations={this.props.fetchAssociations}
				associations={this.props.associations}
				start={this.props.start}
				end={this.props.end}
				cases={this.props.cases}
				total_starred={this.props.total_starred}
				updateCase={this.props.updateCase}
				isFetchingSupplemental={this.props.isFetchingSupplemental}
				isFetchingInstances={this.props.isFetchingInstances}
				id={this.props.id}
				item_count={this.props.item_count}
				items={this.props.items}
				set={this.props.set} 
				pushState={this.props.pushState}
				starred={this.props.starred}
				selectStarredItems={this.props.selectStarredItems}
				
			/>	
		);
	}
}