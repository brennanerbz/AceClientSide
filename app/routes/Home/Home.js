import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import { Link } from 'react-router';
import { pushState } from 'redux-router';
import DocumentTitle from 'react-document-title';
require('./Home.scss');

import * as actionCreators from '../../actions/usersets';
import * as transferActions from '../../actions/transfer';
import * as setActions from '../../actions/createset';

import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import SetList from '../../components/SetList/SetList';

/* Smart wrapper container for Recent Set List */
import SetListContainer from '../../components/SetList/SmartComponents/SetListContainer';

@connect(state => ({
	assignments: state.sets.assignments,
	sets: state.sets.sets,
	isFetching: state.sets.isFetchingAssignments,
	user_id: state.user.user.id
	}), 
	dispatch => ({
		...bindActionCreators({
			...actionCreators,
			...transferActions,
			...setActions,
			pushState,
		}, dispatch)
	})
)
export default class Home extends Component {
	static propTypes = {
		
	}

	state = {
		assignments: []
	}

	componentWillMount() {
		const { user_id, clearTransferState, assignments, fetchAssignments, pollAssignments} = this.props;
		clearTransferState()
		let poll = this.checkChangedAssignments(this.state.assignments, assignments)
		setTimeout(() => {
			pollAssignments(user_id)
		}, 500)
	}	

	checkChangedAssignments(arr1, arr2) {
		if(arr1.length !== arr2.length)
			return false;
		for(var i = arr1.length; i--;) {
			if(arr1[i] !== arr2[i])
				return false;
		}
		return true;
	}

	componentDidMount() {
		const { user_id, pollAssignments, assignments } = this.props;
		this.setState({
			assignments: assignments
		})
	}

	componentWillUnmount() {
		const { clearAll } = this.props;
		// clearAll()
	}

	render() {	
		const { assignments, isFetching, pushState, openImportModal } = this.props,
		emptySets = require('../../assets/null_sets.png');
		return(
			<DocumentTitle title="Learn more, work less">
				<div className="main_content">
					{ 
						!isFetching && (assignments.filter(a => !a.deleted)).length > 0
						&& <SetListContainer {...this.props}/> 
					}
					{
						(assignments.filter(a => !a.deleted)).length == 0
						&&
						<div id="welcome_zone" className="display_flex">
							<div id="welcome_prompt">
								<img 
								style={{
									width: '150px'
								}}
								src={emptySets}/>
								<h3 style={{
									margin: '30px auto',
									width: '55%',
									textAlign: 'center',
								}}>
									You haven't created anything. To get started, create a study set or let us automatically do the work!
								</h3>
								<button 
								onClick={() => pushState(null, '/createset')}
								style={{marginRight: '5px'}} 
								className="primary button">
									Create
								</button>
								<button 
								onClick={() => this.props.openImportModal()}
								className="outline button">
									Import
								</button>
							</div>
						</div>
					}
				</div>
			</DocumentTitle>
		);
	}
}






/*
<div className="row">
	<div className="col-sm-12 col-md-10">	
		{
			sets !== undefined 
			&& sets.length !== 0
			&& <SetList {...this.props} />
		}
	</div>					
</div>

/*
import ActivityList from '../../components/ActivityList/ActivityList';
import OnlineUserList from '../../components/OnlineUserList/OnlineUserList';
-- Supplemental activity feed 
<div className="supplemental col-md-4 col-lg-3 remove_small">
	<ActivityList />
	<OnlineUserList />
</div>	
*/
