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
import ButtonGroup from '../../components/CreateSet/CreateSetHeader/ButtonGroup';
import TermRows from '../../components/CreateSet/TermRows/TermRows';
import CreateSetHeader from '../../components/CreateSet/CreateSetHeader/CreateSetHeader';
import SavingLabel from '../../components/CreateSet/SavingLabel/SavingLabel';
import QuestionModeToggle from '../../components/CreateSet/QuestionModeToggle/QuestionModeToggle';
import Modal from '../../components/Modal/modal';
import ImportModal from '../../components/Modal/ImportModal';


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
	assignments: state.sets.assignments,
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
	
	static propTypes = {
		
	}
	static contextTypes = {
		
	} 

	state = {
		editing: false,
		isModalOpen: false,
		modalType: '',
		fullErrorMessage: false,
		titleErrorMessage: false,
		itemErrorMessage: false,
		showAutosavePrompt: false,
		clickedToContinue: false
	}

	subPoll = {}

	subjectPoll() {
		const { updateSetSubjects, check_subjects, set } = this.props;
		if(check_subjects && set !== null) {
			updateSetSubjects(undefined, set.id)
		}
	}

	componentWillMount() {
		const { params, transfer, loadEditing, loadSetFlag, pushState, logged_in, importVisible, loc, user } = this.props;
		if(logged_in) {
			loadSetFlag()
			if(loc.pathname.split('/')[2] == 'import') return;
			if(Object.keys(params).length !== 0) { 
				this.setState({ editing: true })
				loadEditing(params.id, pushState)
				return; 
			} else {
				let refreshId = localStorage.getItem('set_id')
				if(refreshId !== null) {
					this.setState({ editing: true })
					localStorage.clear()
					loadEditing(Number(refreshId), pushState)
					pushState(null, `/createset/${refreshId}`)
					return;
				}
				if(!user.editing_last_draft) return;
				let asgns = this.props.assignments
				.filter(a => a.set.finalized == null || a.set.finalized == false)
				if(asgns == undefined || asgns.length === 0) return;
				let sorted_asgns = asgns
				.sort((a, b) => {
					return new Date(b.creation) - new Date(a.creation)
				})
				let id = sorted_asgns[0].set_id
				if(id !== undefined && id !== null) {
					this.setState({ editing: true })
					loadEditing(Number(id), pushState)
					pushState(null, `/createset/${id}`)
				}
			}
		}
	}

	componentDidMount() {
		$('body').addClass('createset')
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
		if(this.props.editing && this.props.set.finalized == null) {
			this.setState({
				showAutosavePrompt: true
			})
		}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.editing && (nextProps.set.finalized == null || nextProps.set.finalized == false) && !this.state.clickedToContinue) {
			this.setState({
				showAutosavePrompt: true
			})
		}
		if(this.props.set !== null && nextProps.set == null) {
			this.setState({
				editing: false,
				showAutosavePrompt: false,
				clickedToContinue: false
			});
		}
		if(nextProps.title.length > 0 && Object.keys(nextProps.items).length >= 2) this.setState({fullErrorMessage: false})
		if(nextProps.title.length > 0) this.setState({titleErrorMessage: false})
		if(Object.keys(nextProps.items).length >= 2) this.setState({titleErrorMessage: false})

		/* Import */
		const { params, loadEditing, pushState } = this.props;
		if(params.id == undefined && nextProps.params.id !== undefined) {
			this.setState({ editing: true })
			loadEditing(Number(nextProps.params.id), pushState)
		} 
	}

	handleSave() {
		const { createSet,
				updateSet,
				createAssignment,
				assignment,
			    title,
			    items,
			    associations,
			    updateUserDraftStatus,
			    pushState,
			    newSequence,
			    set } = this.props;
		setTimeout(() => {
			this.setState({
				fullErrorMessage: false,
				titleErrorMessage: false,
				itemErrorMessage: false
			})
		}, 3500)
		if(title.length == 0 && Object.keys(items).length < 2) {
			this.setState({ fullErrorMessage: true });
			return;
		}
		if(title.length == 0 && Object.keys(items).length >= 2) {
			this.setState({ titleErrorMessage: true })
			return;
		}
		if(title.length > 0 && Object.keys(items).length < 2) {
			this.setState({ itemErrorMessage: true })
			return;
		}
		if((set && assignment) !== null) {
			localStorage.clear()
			if(set.finalized == null || set.finalized == false) updateSet(set, {name: 'finalized', prop: true})
			newSequence(assignment.id, false)
			updateUserDraftStatus(false)
			pushState(null, `/set/${set.id}`)
		}
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
		const { isLoadingSet, rendered, editing, set, user, assignment, pushState, associations } = this.props,
		{ showAutosavePrompt } = this.state;
		return(
			<DocumentTitle title="Create | Ace">
				<div>
					{
						this.state.modalType !== 'import'
						?
						<Modal 
							open={this.state.isModalOpen}
							closeModal={() => this.setState({ 
								isModalOpen: false,
								modalType: ''
							})}
							type={this.state.modalType}
							set={this.props.set}
							loc={this.props.loc}
							updateSet={this.props.updateSet}
							createSet={this.props.createSet}
							assignment={this.props.assignment}
							deleteAssignment={this.props.deleteAssignment}
							pushState={this.props.pushState}
							import={this.state.modalType == 'import'}
						/>
						:
						<ImportModal 
							open={this.state.isModalOpen}
							closeModal={() => this.setState({
								isModalOpen: false,
								modalType: ''
							})}
							type={this.state.modalType}
						/>
					}
					<ButtonGroup
						toggleModal={(type) => {
							this.setState({
								isModalOpen: true,
								modalType: type
							})
						}}
						rendered={rendered}
						set={this.props.set}
						assignment={this.props.assignment}
						editing={this.props.editing}
						loc={this.props.loc}
						pushState={this.props.pushState}
						handleSave={::this.handleSave}
					/>
					<div className={classnames("CreateSetPage", {"rendered": rendered })}>
					{
						isLoadingSet
						? <LoadingSpinner />
						: 
						<div>
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
								importVisible={this.props.importVisible}
								fullErrorMessage={this.state.fullErrorMessage}
								itemErrorMessage={this.state.itemErrorMessage}
							/>   
							<QuestionModeToggle 
								subjects={this.props.subjects}
							/>   
							{
								showAutosavePrompt
								&&
								<div className="display_flex" id="autosave_prompt">
									<p className="autosave_message">
										This set was saved for you.
									</p>
									<button 
									onClick={() => {
										this.props.deleteAssignment(assignment.id, pushState, true)
									}}
									className="button danger">
									Discard it
									</button>
									<p className="autosave_message">
										or
									</p>
									<button 
									onClick={() => {
										this.setState({
											showAutosavePrompt: false,
											clickedToContinue: true
										})
									}}
									className="button outline">
										Continue
									</button>
								</div>  
							}
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
									<button 
									onClick={::this.handleSave}
									className="top_margin right button primary large">
										{
											editing && this.props.assignment !== null
											&&
											'Done'
										}
										{
											!editing 
											&&
											'Create study set'
										}
									</button>
								</div>
							</div>
						</div>
					}
					</div>
					<div className={classnames("notify_wrapper", {'show': this.state.itemErrorMessage || !this.state.fullErrorMessage || !this.state.titleErrorMessage})}>
						<span id="notify" 
						className={classnames({'hide': !this.state.itemErrorMessage && !this.state.fullErrorMessage && !this.state.titleErrorMessage}, "error")}>
							{
								this.state.fullErrorMessage
								&&
								<span className="notify_msg">
									To create a set, you need a title and at least two items!
								</span>
							}
							{
								this.state.titleErrorMessage
								&&
								<span className="notify_msg">
									You need a title!
								</span>
							}
							{
								this.state.itemErrorMessage
								&&
								<span className="notify_msg">
									You need to create at least two items!
								</span>
							}
							
						</span>
					</div>
				</div>
			</DocumentTitle>
		);
	}
}