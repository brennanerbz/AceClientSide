import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';
import classnames from 'classnames';
import moment from 'moment';
import DocumentTitle from 'react-document-title';

require('./Conversation.scss');

/* Actions and API calls */
import * as learnactions from '../../actions/learnv2';
import * as setactions from '../../actions/usersets';

/* Minor components */
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'

/* Core Components */
import Header from '../../components/Conversation/Header/Containers/HeaderContainer';
import Messages from '../../components/Conversation/Messages/Containers/MessagesContainer';
import Footer from '../../components/Conversation/Footer/Containers/FooterContainer';
import Slots from '../../components/Conversation/Slots/Containers/SlotsContainer';
// import Settings from '../../components/Conversation/Settings/Settings';


@connect(state => ({

	}),
	dispatch => ({

	})
)
export default class Conversation extends Component {
	static propTypes = {
	}

	render() {
		return(
			<div className="main_content">
				<h1>Working</h1>
			</div>
		);
	}
}