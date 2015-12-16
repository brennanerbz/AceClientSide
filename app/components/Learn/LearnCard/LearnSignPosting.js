import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class Signs extends Component {
	static propTypes = {

	}

	render() {
		const { slot, slots } = this.props;
		const count = slots.length;
		const signs = Array.apply(null, Array(count + 1).join('0').split('')).map((x, i) => {

			const className = classnames('material-icons md-18 Sign-circle', 

			{ 'Active-sign': slot.order - 1 === i}, {'Complete-sign': slots[i].completion !== 'None' }

			);
			return (

				<li key={i} className='Sign-post-item'>
					<i className={className}>brightness_1</i>
				</li>
			);
		});
		return (
			
			<ul className="Sign-posting-list">
				{signs}
			</ul>
		);
	}
}