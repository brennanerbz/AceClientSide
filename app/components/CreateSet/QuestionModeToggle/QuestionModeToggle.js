import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
require('./QuestionToggle.scss');

export default class QuestionSwitch extends Component {
	static propTypes = {
	}

	state = {
		questionMode: false
	}

	render() {
		const { questionMode } = this.state;
		return(
			<div id="question_toggle bottom_margin">
				<label className="checkbox hidden">
					<input id="question_toggle"/>
				</label>
				<div className={classnames("toggle", {'checked': questionMode}, {'orange': !questionMode})}>
					<div onClick={() => this.setState({questionMode: !questionMode})} className="toggle_button">
						<div className="toggle_off_text">Off</div>
						<div className="toggle_on_text">On</div>
						<span className="toggle_handle"></span>
					</div>
					<div className="toggle_secondary_label">
						<div className="toggle_off_label">Manually enter material</div>
						<div className="toggle_on_label">Automatically turns material into questions</div>
					</div>
				</div>
				<p className="question_mode input_note bottom_margin ">
					Question mode allows you to enter material in any format, and have it instantly turned into questions for practice
				</p>
			</div>
		);
	}
}