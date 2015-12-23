import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';
import classnames from 'classnames';
import moment from 'moment';
import DocumentTitle from 'react-document-title';

require('./Conversation.scss');

/* Actions and API calls */
import * as learnActions from '../../actions/learnv2';
import * as setActions from '../../actions/usersets';

/* Minor components */
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'

/* Core Components */
import Header from '../../components/Conversation/Header/Containers/HeaderContainer';
import Messages from '../../components/Conversation/Messages/Containers/MessagesContainer';
import Footer from '../../components/Conversation/Footer/Containers/FooterContainer';
import Slots from '../../components/Conversation/Slots/Containers/SlotsListContainer';
// import Settings from '../../components/Conversation/Settings/Settings';


@connect(state => ({

	}),
	dispatch => ({
		...bindActionCreators({
			...learnActions,
			...setActions,
			pushState
		}, dispatch)
	})
)
export default class Conversation extends Component {
	static propTypes = {
	}

	render() {
		return(
			<div id="convo_ui" className="fluid_container">
				<Header />
				<Slots />
				<div id="convo_ui_body">
					<Messages />
				</div>
				<Footer />
			</div>
		);
	}
}