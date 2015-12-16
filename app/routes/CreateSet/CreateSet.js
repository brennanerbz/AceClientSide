import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames'; 
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import DocumentTitle from 'react-document-title';

const styles = require('./CreateSet.scss');

import * as createactions from '../../actions/createset';
import * as transfer from '../../actions/transfer';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

/* Components */
import TermRows from '../../components/CreateSet/TermRows/TermRows';
import CreateSetHeader from '../../components/CreateSet/CreateSetHeader/CreateSetHeader';
import SavingLabel from '../../components/CreateSet/SavingLabel/SavingLabel';
import Modal from '../../components/Modal/modal';

@connect(state => ({
	/* Router state */
	router: state.router,
	loc: state.router.location,
	logged_in: state.user.logged_in,
	/* Transfer state */
	transfer: state.transfer,
	/* Flags */
	editing: state.createset.editing,
	deleted: state.createset.deleted,
	isLoadingSet: state.createset.isLoadingSet,
	isCreatingSet: state.createset.isCreatingSet,
	isUpdatingSet: state.createset.isUpdatingSet,
	isCreatingItem: state.createset.isCreatingItem,
	check_subjects: state.createset.check_subjects,
	/* User */
	user: state.user.user,
	/* Normal state */
	state: state.createset,
	set: state.createset.set,
	assignment: state.createset.assignment,
	title: state.createset.title,
	id: state.createset.id,
	purpose: state.createset.purpose,
	subjects: state.createset.subjects,
	creator_id: state.createset.creator_id,
	creator_username: state.createset.creator_username,
	associations: state.createset.associations,
	associations_order: state.createset.associations_order,
	associations_length: state.createset.associations_length,
	items: state.createset.items,
	current_item: state.createset.current_item,
	current_association: state.createset.current_association,
	current_order_index: state.createset.current_order_index,
	term_choices: state.createset.term_choices,
	def_choices: state.createset.def_choices,
	flag: state.createset.flag,
	title_flag: state.createset.title_flag,
	resizing: state.createset.resizing,
	/* New state */
	rendered: state.createset.rendered,
	able_to_spark: state.createset.able_to_spark
	}),
	dispatch => ({
		...bindActionCreators({
			...createactions,
			...transfer,
			pushState
		}, dispatch)
	})
)
export default class CreateSetPage extends Component {
	constructor(props, context) {
		super(props, context)
	}
	static propTypes = {
		
	}
	static contextTypes = {
		
	} 

	state = {
		editing: false,
		login_prompt_modal: false,
		modal_type: 'log_in'
	}

	subPoll = {}

	subjectPoll() {
		const { updateSetSubjects, check_subjects, set } = this.props;
		if(check_subjects && set !== null) {
			updateSetSubjects(undefined, set.id)
		}
	}

	componentWillMount() {
		const { params, transfer, loadEditing, loadSetFlag, pushState, logged_in } = this.props;
		if(logged_in) {
			loadSetFlag()
			if(Object.keys(params).length !== 0) { 
				this.setState({ editing: true })
				loadEditing(params.id, pushState) 
			}
		}
	}

	componentDidMount() {
		if(!this.props.logged_in) {
			this.setState({
				login_prompt_modal: true
			})
			this.props.loadedView()
			return;
		}
		if(!this.state.editing) this.props.loadedView()
		this.subPoll = setInterval(() => {
			::this.subjectPoll()
		}, 2500)
	}

	stayOnPage() {
		const { set, loadEditing, pushState } = this.props;
		pushState(null, `/createset`)
		setTimeout(() => {
			loadEditing(set.id, pushState)
		}, 50)
	}

	componentWillUnmount() {
		const { set, 
				isCreatingSet,
				updateSet, 
				clearSet, 
				assignment, 
				createAssignment,
				associations,
				items,
				reorder, 
				clearTransferState,
				unMountingCreate,
				deleted,
				pushState
				} = this.props;
				
		unMountingCreate()

		clearTransferState()

		if(set == null && isCreatingSet && !deleted) {
			var message = "You have unsaved changes!\n\n Are you sure you want to leave?";
			if(confirm(message)) {
				clearSet()
				clearInterval(this.subPoll)
				return true;
			} else {
				this.stayOnPage()
				return;
			}
		}

		if(set !== null) {
            if(associations !== null && Object.keys(associations).length > 1) reorder()
            if(assignment == null && !deleted) {
            	updateSet(set, {name: 'finalized', prop: null})
            	createAssignment(set.id)
            }
		}
		setTimeout(() => {
			clearSet()
		}, 50)
		clearInterval(this.subPoll)
	}	

	render() {
		const { isLoadingSet, rendered } = this.props;
		return(
			<DocumentTitle title="Create | Ace">
				<div>
					<Modal  open={this.state.login_prompt_modal} 
							type={this.state.modal_type}
							pushState={this.props.pushState}
							/>
					<div className={classnames("CreateSetPage", {"rendered": rendered })}>
					{
						isLoadingSet
						? <LoadingSpinner />
						: 
						<div>
							<SavingLabel 
								assignment={this.props.assignment}
								set={this.props.set}
								isLoadingSet={this.props.isLoadingSet}
								isCreatingSet={this.props.isCreatingSet}
								isUpdatingSet={this.props.isUpdatingSet}
								isCreatingItem={this.props.isCreatingItem}
							/>
							<CreateSetHeader 
								assignment={this.props.assignment}
								associations={this.props.associations}
								check_subjects={this.props.check_subjects}
								deleted={this.props.deleted}
								editing={this.props.editing}
								isLoadingSet={this.props.isLoadingSet}
								isUpdatingSet={this.props.isUpdatingSet}
								items={this.props.items}
								loadSetFlag={this.props.loadSetFlag}
								purpose={this.props.purpose}
								set={this.props.set}
								id={this.props.id}
								setTitleFlag={this.props.setTitleFlag}
								subjects={this.props.subjects}
								title={this.props.title}
								title_flag={this.props.title_flag}
								createAssignment={this.props.createAssignment}
								updateAssignment={this.props.updateAssignment}
								deleteAssignment={this.props.deleteAssignment}
								createSet={this.props.createSet}
								updateSet={this.props.updateSet}
								updateSetSubjects={this.props.updateSetSubjects}
								user={this.props.user}
								pushState={this.props.pushState}
								shouldAutoFocus={!this.state.login_prompt_modal}
							/>                 
							<div className="container">
								<div className="CreateSetPage-list">
									<TermRows
										addRow={this.props.addRow}
										assignment={this.props.assignment}
										associations={this.props.associations}
										check_subjects={this.props.check_subjects}
										createAssociation={this.props.createAssociation}
										updateAssociation={this.props.updateAssociation}
										createItem={this.props.createItem}
										updateItem={this.props.updateItem}
										deleteRow={this.props.deleteRow}
										flag={this.props.flag}
										items={this.props.items}
										resize={this.props.resize}
										resizing={this.props.resizing}
										associations_order={this.props.associations_order}
										associations_length={this.props.associations_length}
										editing={this.props.editing}
										able_to_spark={this.props.able_to_spark}
										rendered={rendered}
										finishedRendering={this.props.finishedRendering}
									/>
								</div>
							</div>
						</div>
					}
					</div>
				</div>
			</DocumentTitle>
		);
	}
}