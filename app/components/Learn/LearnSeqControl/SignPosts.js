import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class SignPosts extends Component {
	static propTypes = {

	}

	// shouldComponentUpdate(nextProps) {
	// 	return !!nextProps.isShowingCompletedRound
	// }

	render() {
		const { current_slot, slots, slot_index, current_round, isUpdatingState } = this.props,
				count = current_round !== undefined ? current_round.length : 0,
				signs = Array.apply(null, Array(count)).map((x, i) => {
					const className = classnames('material-icons md-18 sign_circle', 
					{ 'active_sign': slot_index === i}, 
					{ 'complete_sign': current_round !== undefined
								     ? current_round[i].completed
								     : null });
					return (
						<li key={i} className='sign_post_item'>
							<i className={className}>brightness_1</i>
						</li>
					);
				});
		return (
			
			<ul className="sign_posting_list">
				{	
					signs
				}
			</ul>
		);
	}
}