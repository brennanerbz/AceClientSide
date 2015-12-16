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
		return(
			<div>
				<SetListItemView 
					section={this.props.section}
					assignment={this.props.assignment}
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
						this.setState({
							modal_type: 'share',
							modal_is_open: true
						})
					}}
					handleLearn={() => {
						this.props.pushState(null, `/learn/${this.props.assignment.set.id}`)
					}}
					handleOpen={() => {
						
					}}
					handleEdit={() => {
						this.props.pushState(null, `/createset/${this.props.assignment.set.id}`)
					}}
					handleFinish={() => {
						this.props.pushState(null, `/createset/${this.props.assignment.set.id}`)
					}}
					handleDelete={() => {
						this.setState({
							modal_type: 'confirm',
							modal_is_open: true
						})
					}}
				/>
				<Modal 
					assignment={this.props.assignment}
					deleteAssignment={this.props.deleteAssignment}
					open={this.state.modal_is_open}
					closeModal={() => {this.setState({modal_is_open: false})}}
					type={this.state.modal_type}
					set={this.props.assignment.set}
				/>
			</div>
		);
	}
}