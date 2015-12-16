import React, { Component, PropTypes } from 'react';
require('./SeqControl.scss');
import SignPosts from './SignPosts';
import classnames from 'classnames';

export default class SeqControl extends Component {
	static propTypes = {

	}

	componentDidMount() {
		$('.seq_control').height($(window).height() - 50)
		window.addEventListener('resize', this.resizeSideNav);
	}

	resizeSideNav = () => {
		$('.seq_control').height($(window).height() - 50)
	}

	shouldComponentUpdate(nextProps) {
		return !nextProps.isShowingCompletedRound
	}

	render() {
		const { round_index } = this.props;
		return(
			<div className={classnames("seq_control", "top-to-bottom")}>
				<div className="round_divider">
					<i className="copy_only"/>
					<div className="round_divider_label">
					Round {round_index}
					</div> 
				</div>
				<div className="sign_posts">
					{
						this.props.current_round.length > 0
						&&
						<SignPosts {...this.props} />
					}
				</div>
				<span className="start_over">
					<button className="button outline"
						    type="button"
						    onClick={() => { 
						    	this.props.newSequence(null)
						    }}
						    >Start over</button>
				</span>
			</div>
		);
	}
}

// <input id="term_first" type="checkbox" className="term_first"/>
// <label className="label_term_first">See Term first</label>
