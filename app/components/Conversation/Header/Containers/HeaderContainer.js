import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';
require('../Header.scss')

import ActiveSetHeader from '../Views/ActiveSetHeader';

@connect(state => ({
		isFetchingLearn: state.conversation.isFetchingLearn,
		currentSequence: state.conversation.current_sequence,
		setTitle: state.conversation.set_name,
		assignments: state.sets.assignments
	}),
	dispatch => ({
		...bindActionCreators({
			pushState
		}, dispatch)
	})
)
export default class HeaderContainer extends Component {
	static propTypes = {
		isFetchingLearn: PropTypes.boolean,
		currentSequence: PropTypes.object,
		setTitle: PropTypes.string
	}

	state = {
		
	}

	render() {
		return(
			<div id="header" className="">
				<div id="set_header">
					<ActiveSetHeader {...this.props} />
				</div>
			</div>
		);
	}
}