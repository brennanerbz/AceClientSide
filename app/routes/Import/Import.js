import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import DocumentTitle from 'react-document-title';

/* Actions */
import * as importactions from '../../actions/import';
/* Components */
import AutoexpandTextarea from '../../components/CreateSet/AutoexpandTextarea/AutoexpandTextarea';
import Modal from '../../components/Modal/modal';
require('./Import.scss');

@connect(state => ({
		logged_in: state.user.logged_in,
		upload: state.upload
	}), 
	dispatch => ({
		...bindActionCreators({
			...importactions,
			pushState
		}, dispatch)
	})
)
export default class Upload extends Component {
	static propTypes = {
	}

	state = {
		drop_box_hover: false,
		link_focused: false,
		import_prompt_modal: false,
		modal_type: 'log_in'
	}

	componentDidMount() {
		if(!this.props.logged_in) {
			this.setState({
				import_prompt_modal: true
			})
		}
	}

	render() {
		const big_upload = require('../../assets/big_upload.png'),
			  big_upload_red = require('../../assets/big_upload_red.png'),
			  transform = require('../../assets/transform.png'),
			  set = require('../../assets/set_icon_grey.png');
		return(
			<DocumentTitle title='Import | Ace'>
				<div className="upload_page">
					<Modal  open={this.state.import_prompt_modal} 
							type={this.state.modal_type}
							import={true}
							pushState={this.props.pushState}
							/>
					<div className="upload_container">
						<div id="upload_progress">
						</div>
						<div className="prompt_box">
							<h1>Instantly create</h1>
							<div className="drop_box"
								 onMouseOver={() => this.setState({drop_box_hover: true})}
								 onMouseLeave={() => this.setState({drop_box_hover: false})}>
								<img className={classnames({"over": this.state.drop_box_hover})} 
									 src={big_upload}/>
								<h2>Select a file to upload</h2>
							</div>
							<div className="day_divider">
								<hr className="separator"/>
								<i className="copy_only"/>
								<div className="day_divider_label">
									or
								</div>
							</div>
							<div className="link_container">
								<h2>Paste a link or text</h2>
								<div className={classnames("auto_expand_container", 
									{'focus': this.state.link_focused})}>
									<AutoexpandTextarea focus={() => this.setState({link_focused: true})} 
														blur={() => this.setState({link_focused: false})}
														placeholder="Link or text..."
														autoFocus={this.props.logged_in} />
								</div>
								<button className="button primary">Create</button>
							</div>
						</div>
						<div className="instructions">
							<h2>How it works</h2>
							<ul className="">
								<li className="instruction">
									<h2>Upload or Paste</h2>
									<div className="step">
										<img id="upload" src={big_upload}/>
										<p>Import your class notes, powerpoint slides, PDF, a web page or a section of text.</p>
									</div>
								</li>
								<li className="instruction">
									<h2>Transform</h2>
									<div className="step">
										<img id="transform" src={transform}/>
										<p>Your document is broken down into smaller meaningful pieces.</p>
									</div>
								</li>
								<li className="instruction">
									<h2>Final product</h2>
									<div className="step">
										<img id="set" src={set}/>
										<p>A study set is automatically created for you and whoever you want to share it with.</p>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</DocumentTitle>
		);
	}
}