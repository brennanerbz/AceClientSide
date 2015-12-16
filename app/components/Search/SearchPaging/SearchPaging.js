import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
require('./SearchPaging.scss');

export default class SearchPaging extends Component {
	static propTypes = {
	}

	state = {
		back_hover: false,
		next_hover: false
	}

	prevPage(pushState, tab, query, index) {
		pushState(null, `/search/${tab}/${query}&start=${index}`)
	}

	nextPage(pushState, tab, query, index) {
		pushState(null, `/search/${tab}/${query}&start=${index}`)
	}

	render() {
		const back_active = require('../../../assets/chevron_left_active.png'),
			  next_active = require('../../../assets/chevron_right_active.png'),
			  back_disabled = require('../../../assets/chevron_left_disabled.png'),
			  next_disabled = require('../../../assets/chevron_right_disabled.png'),
			  {
			  	pushState,
			  	tab,
			  	query,
			  	result_count,
			  	item_page,
			  	item_page_prev_index,
			  	item_page_next_index,
			  	set_page,
			  	set_page_prev_index,
			  	set_page_next_index,
			  	user_page,
			  	user_page_prev_index,
			  	user_page_next_index
			  } = this.props;
		let page, page_count, prev_index, p_active, next_index, n_active = true;
		switch(tab) {
			case 'concepts':
				page = item_page
				prev_index = item_page_prev_index
				next_index = item_page_next_index
				break;
			case 'sets':
				page = set_page
				prev_index = set_page_prev_index
				next_index = set_page_next_index
				break;
			case 'users':
				page = user_page
				prev_index = set_page_prev_index
				next_index = user_page_next_index
				break;
			default:
				break;
		}
		if(prev_index === 0 && page === 1) p_active = false 
		else p_active = true
		if(result_count > 10) {
			page_count = Math.ceil((result_count + 10 - 1) / 10)
		} else {
			page_count = 1
		}
		if(page === page_count) {
			n_active = false
		} else {
			n_active = true
		}
		return(
			<div className="search_paging">
				<a className={classnames("page_backward", { "disabled": !p_active })}
				   onMouseEnter={() => this.setState({back_hover: true})}
				   onMouseLeave={() => this.setState({back_hover: false})}
				   onClick={() => ::this.prevPage(pushState, tab, query, prev_index)}>
					{
						p_active
						?
						<span className={classnames({"underline": this.state.back_hover})}>
							Previous
						</span>
						: null
					}
					<img src={p_active ? back_active : back_disabled} 
						 className={classnames("left previous", { "disabled": !p_active } )}/>
				</a>
				
				<span className="page_text">Page {page} of {page_count}</span>

				<a className={classnames("page_forward", { "disabled": !n_active })}
				   onMouseEnter={() => this.setState({next_hover: true})}
				   onMouseLeave={() => this.setState({next_hover: false})}
				   onClick={() => ::this.nextPage(pushState, tab, query, next_index)}>
					<img src={n_active ? next_active : next_disabled} 
						 className={classnames("right forward",  { "disabled": !n_active } )}/>
					{
						n_active
						? 
						<span className={classnames({"underline": this.state.next_hover})}>
							Next
						</span>
						: null
					}
				</a>
			</div>
		);
	}
}

// TODO: need results count to compute total # of pages
