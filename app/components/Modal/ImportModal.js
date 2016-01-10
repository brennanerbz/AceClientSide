import React, { Component, PropTypes } from 'react';
import ScrollBar from '../Conversation/ScrollBar/ScrollBar';
import LaddaButton from 'react-ladda';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';

import * as importActions from '../../actions/import'

@connect(state => ({
		// importingText: state.import.importingText
	}),
	dispatch => ({
		...bindActionCreators({
			...importActions,
			pushState
		}, dispatch)
	})
)
export default class ImportModal extends Component {
	static propTypes = {
	}

	state = {
		importingText: false,
		type: '',
		text: ''
	}

	handleSnippetSubmit() {
		this.setState({
			importingText: true
		});
		const { importText, pushState } = this.props,
		{ text } = this.state;
		importText(text, pushState)
		setTimeout(() => {
			this.setState({
				importingText: false
			});
			$(this.refs.importModal).modal('hide')
		}, 5500)
	}

	componentDidMount() {
		if(this.props.open) {
			$(this.refs.importModal).modal()
		}
		$(this.refs.importModal).on('hidden.bs.modal', (e) => {
			this.props.closeModal()
		})
		$(this.refs.importModal).on('shown.bs.modal', (e) => {
			this.refs.importModalTextArea.focus()
		})
	}

	componentWillReceiveProps(nextProps) {
		if(!this.props.open && nextProps.open) {
			$(this.refs.importModal).modal()
		}
	}

	componentWillUnmount() {
		// $(this.refs.importModal).modal('hide')
		this.props.closeModal()
	}

	render() {
		return(
			<div 
			ref="importModal"
			className="modal fade"
			id="importModal" 
			role="dialog" 
			aria-labelledby="myModalLabel"
			aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
					<div className="modal-header">
						<button 
						type="button" 
						className="close"
						data-dismiss="modal"
						data-target="#importModal"
						onClick={this.props.closeModal}>
							<span aria-hidden="true">&times;</span>
							<span className="sr-only">Close</span>
						</button>
						<h3 className="modal-title" id='myModalLabel'>
						Transform text into questions
						<span 
						style={{
							fontSize: '14.5px'
						}}
						className="new_label">
							New!
						</span>
					</h3>
					</div>
					
				<div className="modal-body">
					<form className="no_bottom_margin" id="text_import_snippet">
						<p>
							<label 
							id="text_snippet_subject_select_label" 
							className="select small right no_right_padding">
								<select 
								name="subject_type"
								id="text_snippet_subject_select"
								className="small no_top_margin">
									<option value="auto">Auto Detect Subject</option>
									<option value="acc">Accounting</option>
								</select>
							</label>
							<input 
							type="text" 
							id="text_snippet_title_input"
							className="small"
							value=""
							placeholder="Title (optional)"/>
						</p>
						<p>
							<textarea 
							ref="importModalTextArea"
							autoFocus={true}
							onChange={(e) => this.setState({text: e.target.value})}
							name="content"
							wrap="virtual"
							id="text_snippet_textarea"
							className="text_snippet_textarea full_width text_snippet"
							placeholder="Copy and Paste any piece of text (from your class notes, slides, an article or website, etc...)"/>
							<span className="input_note">Your text will be automatically transformed into practice questions</span>
						</p>
					</form>
				</div>
				<div className="modal-footer">
					<button 
					className="button outline"
					data-dismiss="modal"
					data-target="#importModal"
					onClick={this.props.closeModal}>
						Cancel
					</button>
					<LaddaButton 
					onClick={::this.handleSnippetSubmit}
					loading={this.state.importingText}
					className="button primary"
					buttonStyle="expand-right"
					spinnerSize={28}
					spinnerColor="#fff">
						Transform text
					</LaddaButton>
					</div>
					</div>
				</div>
			</div>	
		);
	}
}


/* -------------TODO: add the select set feature *------------/

<div id="import_to_set_div">
	<div className="small_bottom_margin">
		<label className="small_bottom_margin">
			Add to
		</label>
		<div id="select_import_set" className="inline_block no_margin set_select">
			<div className="filter_select default_style single value">
				<div className="sis_input_container">
					<div className="sis_value">
						<div className="sis_item">
							Set name
							<span className="octicon set"></span>
						</div>
						<input type="text" className="sis_input" size="1" placeholder="Type to filter"/>
					</div>
					<div className="sis_list_container">
						<div id="scroll_wrapper_for_set_select" className="scroll_wrapper">
							<div className="scroll_hider">
								<div 
								id="sets_scroller"
								ref="sets_scroller"
								className="scroller">
									

								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<p className="no_bottom_margin">

	</p>
</div>

/*-----------------*/


/*
<ScrollBar
	scrollMarginLeft={smL}
	viewHeight={vH}
	scrollBarHeight={scrollBarHeight}
	top={top}
/>
*/
