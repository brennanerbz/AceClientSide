import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class ItemListActions extends Component {
	static propTypes = {
	}

	render() {
		const star = require('../../../assets/star.png'),
			  { total_starred } = this.props;
		return(
			<div className="item_list_actions">
				<ul className="select_actions">
					<li 
						className="select active"
						onClick={this.props.selectAll}>
							<a className="">
							Study all {this.props.item_count} terms
							</a>
					</li>
					<li 
						className="select"
						onClick={this.props.selectStarred}>
							<a className="">
								Study &nbsp;
								{total_starred} &nbsp;
								<span>
									<img src={star}/>
								</span>
								&nbsp; terms only
							</a>
					</li>
				</ul>
			</div>
		);
	}
}