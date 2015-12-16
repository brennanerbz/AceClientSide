import React, { Component, PropTypes } from 'react';
import classnames from 'classnames'; 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* Child Components */
import CreateSetTitle from './CreateSetTitle';
import CreateSetPurpose from './CreateSetPurpose';
import ButtonGroup from './ButtonGroup';
import Avatar from '../../Avatar/Avatar';

export default class CreateSetHeader extends Component {
	static propTypes = {
		
	}

	constructor(props) {
		super(props);
		this.state = {
			title: '',
			purpose: '',
			subjects: null,
			show_edit: false,
			subject_editor_open: false,
			full_error_message: false,
			item_error_message: false
		}
	}
	componentWillMount() {
		const { title, subjects } = this.props;
		if(title !== undefined && title.length > 0) this.setState({title: title});
		if(subjects !== undefined && subjects.length > 0) this.setState({subjects: subjects})
	}
	componentWillReceiveProps(nextProps) {
		const { title } = this.props,
			  { subjects } = nextProps;
		if(this.refs.submit_subjects !== undefined) {
			$(this.refs.submit_subjects).tooltip({
				delay: { show: 1500, hide: 50},
				template: '<div class="tooltip bottom_tool" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
			})
		}
		/* --- Subject check -----*/
		let _subs;
		_subs = subjects
		.map((sub, i) => { 
			return sub.replace(",", "")
		})
		.join("")
		.replace(new RegExp(/#/g), " #")
		_subs = _subs.substr(1)
		if(this.state.subjects !== _subs) this.setState({subjects: _subs});
		/* ---------------------- */
		if(nextProps.title.length > 0) this.setState({ full_error_message: false });
		if(nextProps.associations !== null && nextProps.associations.length > 1) this.setState({item_error_message: false});
	}
	handleTitleChange = (title) => {
		this.setState({
			title: title
		});
	}
	handleTitleBlur = () => {
		const { createSet, 
				updateSet,
				id, // set_id
				title, 
				set,
				setTitleFlag } = this.props,
			    _title = this.state.title;
		setTitleFlag(true)
		if(id == null && _title.length > 2) {
			createSet(_title)
			return;
		}                                                                       
		if((set && title) !== null && _title !== title) {
			updateSet(set, {name: "title", prop: _title})
			return;
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
			    pushState,
			    set } = this.props;
		if(title.length === 0 && (associations == null  || Object.keys(associations).length < 1)) {
			this.setState({ full_error_message: true });
			return;
		}
		if(associations == null || Object.keys(associations).length < 1) {
			this.setState({item_error_message: true})
			return;
		}
		if(set !== null && assignment == null) {
			createAssignment(set.id, 'admin', {name: 'navigate', prop: true}, pushState)
			updateSet(set, {name: 'finalized', prop: true})
			// createSequence
			// createSlots
			return;
			
		}
		if((set && assignment) !== null) {
			if(set.finalized == null) updateSet(set, {name: 'finalized', prop: true})
			pushState(null, `/set/${set.id}`)
		}
	}

	updateSubjects() {
		const { set, updateSetSubjects } = this.props;
		let subjects = this.state.subjects;
		if(typeof subjects == 'object' || typeof subjects == 'array') {
			if(subjects == this.props.subjects) { 
				this.setState({subject_editor_open: false})
				return;
			}
			else {
				subjects = subjects.map(sub => sub = sub.replace("#", ""))
			}
		} else if (typeof subjects == 'string') {
			subjects = subjects.split("#")
			subjects = subjects.filter(sub => sub !== '').map(sub => sub.replace(" ", ""))
		}
		updateSetSubjects(subjects, set)
		this.setState({ subject_editor_open: false})
	}

	render() {
		const { saveSet, subjects } = this.props;
		let length = subjects.join("#").length + subjects.length 
		return(
			<div className="CreateSetHeader"> 
	          <div className="container CreateSetHeader-container">	
	            <div className="CreateSetHeader-wrapper"
	            	 onMouseOver={() => this.setState({ show_edit: true })}
	              	 onMouseLeave={() => this.setState({ show_edit: false })}>	  
	              {
	              	!this.props.isLoadingSet
	              	?
	              	<CreateSetTitle	              	
	              		autoFocus={true}
	              		indexForTab={1}
	              		titleSide={true}
	              		placeholder="Untitled"
	              		titleBlur={this.handleTitleBlur}
	              		titleChange={(title) => this.handleTitleChange(title)}
	              		onFocus={this.handleTitleFocus}
	              		{...this.props}/>
	              	: null
	              }            
	              	{
	              		this.state.full_error_message
	              		?
	              		<div className="error_message">
	              			<p className="danger">Please enter a title and two terms to create your set.</p>
	              		</div>
	              		: null
	              	}
		              <ul className="subject_list">
		              	{
		              		subjects !== undefined
		              		&& subjects !== null
		              		&& !this.state.subject_editor_open
		              		? subjects.map((subject, i) => {
		              			return (
		              			<li key={i} className="subject">
		              				<p>
		              					{
		              						subject 
		              					}
		              				</p>
		              			</li>
		              			)
		              		})
		              		: null
		              	}
		              	{
		              		subjects !== undefined
		              		&& subjects !== null
		              		&& subjects.length > 0
		              		&& !this.state.subject_editor_open
		              		? <span className="edit_link" 
		              				style={!this.state.show_edit ? {display: "none"} : null}
		              				onClick={() => this.setState({subject_editor_open: true})}>
		              				<a className="link">edit</a>
		              		  </span>
		              		: null
		              	}
		              </ul> 
		              {
		              	this.state.subject_editor_open
		              	?
						<div className="subject_editor">
							<label htmlFor="subject_text" 
								   className="tiny_bottom_margin mini subtle_silver">
							Edit subjects
							</label>
							<textarea id="subject_text" 
									  ref="subject_text"
									  name="subject_text" 
									  className="subject_text"
									  value={subjects !== null ? this.state.subjects : null} 
									  onFocus={() => { 
									  	// this.setState({subjects: subjects});
									  	if(this.state.subjects !== null 
									  	   && typeof this.state.subjects == 'string') length = this.state.subjects.length
									  	setTimeout(() => { this.refs.subject_text.setSelectionRange(length, length) }, 1) 
									  }}
									  onChange={(event) => this.setState({subjects: event.target.value})}
									  autoFocus={true}/>
							<div className="button_group">
								<button className="button button-outline button-small"
										onClick={() => {
											this.setState({
												subjects: subjects,
												subject_editor_open: false
											});
										}}
										>Cancel
								</button>
								<button className="button button-primary button-small"
										ref="submit_subjects"				   
										title="Max subjects: 3"
										data-toggle="tooltip" 
										data-placement="bottom"
										onClick={() => {::this.updateSubjects()}}
										>Save changes
								</button>
							</div>
						</div>
					: null
	              }
	              {
	              	this.state.item_error_message
	              	?
	              	<div className="item_error error_message">
	              		<p className="danger">Please enter at least two terms to create your set.</p>
	              	</div>
	              	: null
	              }
	            </div>

	            <ButtonGroup onSave={::this.handleSave}
	            		     {...this.props}
	            />	                        
	          </div>	              
	        </div>
		)
	}
}


