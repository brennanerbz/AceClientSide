import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';
import classnames from 'classnames';
import moment from 'moment';
import DocumentTitle from 'react-document-title';

require('./Conversation.scss');

/* Actions and API calls */
import * as convoActions from '../../actions/conversation';
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
		isFetchingLearn: state.conversation.isFetchingLearn,
		isFetchingTrials: state.conversation.isFetchingTrials,
		isFetchingSequenceStats: state.conversation.isFetchingSequenceStats,
		isShowingCorrect: state.conversation.isShowingCorrect,

		location: state.router.location,
		user: state.user.user,
		userId: state.user.user.id,
		username: state.user.user.username,
		setName: state.conversation.set_name,
		setId: state.conversation.set_id,
		assignments: state.sets.assignments,

		currentSequence: state.conversation.current_sequence,
		slots: state.conversation.slots,
		currentSlot: state.conversation.current_slot,
		trials: state.conversation.trials,
		currentTrial: state.conversation.current_trial,

		allMessagesRendered: state.conversation.allMessagesRendered,
		messages: state.conversation.messages,
		messages_length: state.conversation.messages_length
	}),
	dispatch => ({
		...bindActionCreators({
			...convoActions,
			...setActions,
			pushState
		}, dispatch)
	})
)
export default class Conversation extends Component {
	static propTypes = {
	}

	componentWillMount() {
		const { fetchLearn } = this.props;
		let ri = this.handleNewSequence(false) /* Route info */
		fetchLearn(ri.id, ri.starred)
	}	

	componentDidMount() {
		$('body').addClass('chat')
	}

	handleNewSequence(call) {
		const { params, location, newSequence } = this.props,
			  path = location.pathname.split('/')[3],
			  starred = path !== undefined ? true : false;
		if(call) {
			let assignment = this.props.assignments.filter(a => a.set_id == params.id)[0]
			newSequence(assignment.id, starred)
		} else {
			return {
				id: params.id,
				starred: starred
			}
		}
	}

	componentWillUnmount() {
		const { clearLearn } = this.props;
		clearLearn()
		$('body').removeClass('chat')
	}

	render() {
		const { currentTrial, updateTrial, username, currentSlot, messages, messages_length, slots, setName, setId, finishedRenderingMessages, allMessagesRendered } = this.props;
		return(
			<div id="convo_ui" className="fluid_container">
				<Header />
				<Slots 
					createNewSequence={() => ::this.handleNewSequence(true)}
					slots={slots}
					currentSlotId={currentSlot.id}
				/>
				<div id="convo_ui_body">
					<Messages 
						setName={setName}
						setId={setId}
						username={username}
						currentSlot={currentSlot}
						messages={messages}
						messagesLength={messages_length}
						allMessagesRendered={allMessagesRendered}
						finishedRenderingMessages={finishedRenderingMessages}
					/>
				</div>
				<Footer 
					updateTrial={updateTrial}
					currentTrial={currentTrial}
				/>
			</div>
		);
	}
}