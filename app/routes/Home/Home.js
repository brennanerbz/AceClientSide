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
			if(!poll) {
				pollAssignments(Number(document.cookie.split(';')[0].substr(6)))
			}
		}, 150)
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

	render() {	
		const { sets, isFetching } = this.props;	 
		return(
			<DocumentTitle title="Learn more, work less">
				<div className="main_content">
					<div style={{ marginBottom: '25px' }} className="page_header_wrapper">
						{ isFetching && "Loading..." }
						{ isFetching && <LoadingSpinner />}
						{ !isFetching && "Recent"}
					</div>
					{ 
						!isFetching
						&& <SetListContainer {...this.props}/> 
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
