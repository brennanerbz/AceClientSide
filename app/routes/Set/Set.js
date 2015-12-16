import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import { pushState } from 'redux-router';
import DocumentTitle from 'react-document-title';

require('./Set.scss')

import * as setactions from '../../actions/set';
import * as transfer from '../../actions/transfer';

import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'

/* Components */
import SetHeader from '../../components/SetView/SetHeader/SetHeader';
import SetInfo from '../../components/SetView/SetInfo/SetInfo';
import ItemList from '../../components/SetView/ItemList/ItemList';
import QuickPractice from '../../components/SetView/QuickPractice/QuickPractice';
import Tabs from '../../components/SetView/Tabs/Tabs';

@connect(state => ({
	loc: state.router.location,
	user: state.user.user,
	isFetching: state.setView.isFetchingSet,
	isFetchingSupplemental: state.setView.isFetchingSupplemental,
	set: state.setView.set,
	assignment: state.setView.assignment,
	creator_id: state.setView.set.creator_id,
	creator_username: state.setView.creator_username,
	title: state.setView.title,
	id: state.setView.id,
	purpose: state.setView.purpose,
	item_count: state.setView.item_count,
	subjects: state.setView.subjects,
	doc: state.setView.doc,
	associations: state.setView.associations,
	items: state.setView.items,
	cases: state.setView.cases,
	total_starred: state.setView.total_starred,
	isFetchingSupplemental: state.setView.isFetchingSupplemental
	}),
	dispatch => ({
		...bindActionCreators({
			...setactions,
			...transfer,
			pushState
		}, dispatch)
	})
)
export default class Set extends Component {
	static propTypes = {
		params: PropTypes.object
	}

	componentWillMount() {
		const { params, fetchSet, fetchAssociations, fetchAssignment } = this.props;
		fetchSet(params.id)
		fetchAssociations(params.id)
		fetchAssignment(params.id)
	}

	componentWillReceiveProps(nextProps) {
		if(this.props.params.id !== nextProps.params.id) {
			this.props.clearSetView()
			this.props.fetchSet(nextProps.params.id)
			this.props.fetchAssociations(nextProps.params.id)
			this.props.fetchAssignment(nextProps.params.id)
		}
	}

	componentWillUnmount() {
		const { clearSetView, transfer } = this.props;
		transfer()
		clearSetView()
	}

	render() {
		const { isFetching, isFetchingSupplemental, associations } = this.props;
		var setChildrenWithProps = React.Children.map(this.props.children, (child) => {
			return React.cloneElement(child, {
				assignment: this.props.assignment,
				associations: this.props.associations,
				cases: this.props.cases,
				total_starred: this.props.total_starred,
				isFetchingSupplemental: this.props.isFetchingSupplemental,
				updateCase: this.props.updateCase,
				creator_id: this.props.creator_id,
				creator_username: this.props.creator_username, 
				id: this.props.id,
				doc: this.props.doc,
				item_count: this.props.item_count,
				purpose: this.props.purpose,
				set: this.props.set,
				subjects: this.props.subjects,
				pushState: this.props.pushState
			})
		})
		return(
			<DocumentTitle title={this.props.set.title !== undefined ? `${this.props.set.title} | Ace` : 'Loading...'}>
				<div className="set_view main_content">
					<div className={classnames('set_page', {'rendered': !isFetching})}>
						{
							!isFetching
							?
							<div className="">
								<SetHeader 
									assignment={this.props.assignment}
									creator_id={this.props.creator_id}
									creator_username={this.props.creator_username} 
									id={this.props.id}
									item_count={this.props.item_count}
									set={this.props.set}
									title={this.props.title}
									user={this.props.user}
									
								/>		
								<Tabs 
									location={this.props.loc}
									id={this.props.id}
									pushState={this.props.pushState}
								/>

								{ setChildrenWithProps }		

							</div>
							: 
							<LoadingSpinner/>
						}
					</div>
				</div>
			</DocumentTitle>
		);
	}
}

// <QuickPractice set={set}  />


