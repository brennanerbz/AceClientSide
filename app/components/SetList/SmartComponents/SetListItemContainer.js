import React, { Component, PropTypes } from 'react';
import SetListItemView from '../Views/SetListItemView';
import Modal from '../../Modal/modal';

export default class SetListItemContainer extends Component {
	static propTypes = {
		assignment: PropTypes.object
	}

	state = {
		hovering: false,
		modal_type: null,
		modal_is_open: false
	}

	render() {
		let root_route;
		const { assignment, set, user_id } = this.props;
		return(
			<SetListItemView 
				section={this.props.section}
				user_id={user_id}
				set={set}
				assignment={this.props.assignment}
				pushState={this.props.pushState}
				mouseOver={() => {
					this.setState({hovering: true})
				}}
				mouseLeft={() => {
					this.setState({hovering: false})
				}}
				mouseIsOver={this.state.hovering}
				handleClick={() => {
					if(this.props.section == 'drafts') {
						root_route = 'createset'
					} else {
						root_route = 'set'
					}
					this.props.pushState(null, 
					`/${root_route}/${this.props.assignment.set.id}`
					)}
				}
				handleShare={() => {
					this.props.openDynamicModal(assignment, set, 'share')
				}}
				handleLearn={() => {
					this.props.pushState(null, `/convo/${this.props.assignment.set.id}`)
				}}
				handleOpen={() => {
					
				}}
				handleSettings={() => {
					this.props.openDynamicModal(assignment, set, 'settings')
				}}
				handlePrivacySettings={() => {
					this.props.openDynamicModal(assignment, set, 'settings')
				}}
				handleEdit={() => {
					this.props.pushState(null, `/createset/${this.props.assignment.set.id}`)
				}}
				handleFinish={() => {
					this.props.pushState(null, `/createset/${this.props.assignment.set.id}`)
				}}
				handleDelete={() => {
					this.props.openModal(assignment, set, 'confirm')
				}}
				profileView={this.props.profileView}
			/>
		);
	}
}