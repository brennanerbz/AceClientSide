import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ItemList from '../../components/SetView/ItemList/ItemList';


export default class Terms extends Component {
	static propTypes = {
	}

	render() {
		return(
			<div>
				<ItemList
					assignment={this.props.assignment}
					associations={this.props.associations}
					cases={this.props.cases}
					total_starred={this.props.total_starred}
					updateCase={this.props.updateCase}
					isFetchingSupplemental={this.props.isFetchingSupplemental}
					id={this.props.id}
					item_count={this.props.item_count}
					items={this.props.items}
					set={this.props.set} 
					pushState={this.props.pushState}
				/>	
			</div>
		);
	}
}