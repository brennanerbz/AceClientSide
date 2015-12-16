import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as searchactions from '../../../actions/search'
import { pushState } from 'redux-router';
import classnames from 'classnames';

@connect(state => ({
	loc: state.router.location,
	searching: state.search.searching,
	term_name: state.search.term_name,
	query: state.search.query
	}),
	dispatch => ({
		...bindActionCreators({
			...searchactions,
			pushState
		}, dispatch)
	})
)
export default class SearchBox extends Component {
	static propTypes = {
	}

	state = {
		value: '',
		focused: false,
		hover: false
	}

	componentDidMount() {
		let { loc } = this.props,
				lastSlash = loc.pathname.lastIndexOf("/"),
				bq = loc.pathname.slice(lastSlash, loc.length).replace("/", ""),
				page = bq.indexOf('&'),
				query;
		if(page !== -1) query = bq.slice(0, page)
		else query = bq
		if(loc.pathname.indexOf('search') !== -1) this.setState({value: query});
	}

	componentWillReceiveProps(nextProps) {
		if(this.props.loc.pathname.indexOf('search') !== -1 
			&& nextProps.loc.pathname.indexOf('search') == -1) { this.setState({value: ''}); return; }
		let { loc } = this.props,
			lastSlash = loc.pathname.lastIndexOf("/"),
			bq = loc.pathname.slice(lastSlash, loc.length)
			.replace("/", "")
			.split("%20")
			.map(word => word.replace("%20", ""))
			.join(" "),
			page = bq.indexOf('&'),
			query;
		if(page !== -1) query = bq.slice(0, page)
		else query = bq
		if(loc.pathname.indexOf('search') !== -1) this.setState({value: query});
	}

	handleSearchInput(e) {
		const { searchItems, pushState } = this.props;
		this.setState({
			value: e.target.value
		});
	}

	handleSearchSubmit() {
		const { searchItems, searchSets, searchUsers, pushState, loc, requestSearch, term_name } = this.props,
			    value = this.state.value,
			    lastSlash = loc.pathname.lastIndexOf("/"),
			    query = loc.pathname.slice(lastSlash, loc.length).replace("/", ""),
			    pathname = loc.pathname;
		if(value.length === 0) return;
		if(query == value == term_name) return;
		if(pathname.indexOf('sets') !== -1 || pathname.indexOf('search') == -1) pushState(null, `/search/sets/${value}`)
		if(pathname.indexOf('concepts') !== -1) pushState(null, `/search/concepts/${value}`)
		if(pathname.indexOf('users') !== -1) pushState(null, `/search/users/${value}`)
	}

	render() {
		const { loc, searching } = this.props;
		const searchIcon = require('../assets/SearchIcon.png'),
			  whiteSearchIcon = require('../assets/whiteSearchIcon.png');
		return(
			<div className="header_search">
				<button className={classnames("search_btn_component", {
					"focused": this.state.focused
				})}>	
					<span className="search_btn_content">
					{
						searching
						?
						<div className="sk-fading-circle">
						  <div className="sk-circle1 sk-circle"></div>
						  <div className="sk-circle2 sk-circle"></div>
						  <div className="sk-circle3 sk-circle"></div>
						  <div className="sk-circle4 sk-circle"></div>
						  <div className="sk-circle5 sk-circle"></div>
						  <div className="sk-circle6 sk-circle"></div>
						  <div className="sk-circle7 sk-circle"></div>
						  <div className="sk-circle8 sk-circle"></div>
						  <div className="sk-circle9 sk-circle"></div>
						  <div className="sk-circle10 sk-circle"></div>
						  <div className="sk-circle11 sk-circle"></div>
						  <div className="sk-circle12 sk-circle"></div>
						</div>
						: null
					}
					{
						!searching
						?
						<img className="search-icon svg-icon" 
							 src={this.state.focused ? whiteSearchIcon : searchIcon}></img>
						: null
					}
					</span>
				</button>	
				
				<div className={classnames("input_container", 
					{'focused': this.state.focused}, {"hover": this.state.hover})}>
					<input className="search_input" 
						    placeholder="Search"
						    onMouseOver={() => this.setState({hover: true})}
						    onMouseLeave={() => this.setState({hover: false})}
							value={this.state.value}
							onChange={::this.handleSearchInput}
							onFocus={() => this.setState({
								focused: true
							})}
							onBlur={() => this.setState({
								focused: false
							})}
							onKeyDown={(e) => { if(e.which === 13) { ::this.handleSearchSubmit() } } }/>
				</div>
			</div>	
		);
	}
}


