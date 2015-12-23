import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';
require('./Conversation.scss');

import Header from '../../components/Conversation/Header/Containers/HeaderContainer';
import Messages from '../../components/Conversation/Messages/Containers/MessagesContainer';
import Footer from '../../components/Conversation/Footer/Containers/Footer';
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
			<div>
			</div>
		);
	}
}