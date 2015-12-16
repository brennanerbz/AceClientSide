import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';
const styles = require('./Header.scss');

import Notifications from './Notifications/Notifications';
import SearchBox from './SearchBox/SearchBox';
import Avatar from '../Avatar/Avatar';
import Menu from '../Menu/Menu';
import QuickLogIn from '../QuickLogIn/QuickLogIn';

import * as useractions from '../../actions/user';

@connect(state => ({
	loc: state.router.location,
	sets: state.sets.sets,
	user: state.user.user,
	logged_in: state.user.logged_in,
	current_sequence: state.learn.current_sequence,
	learn_set: state.learn.current_sequence.set,
	set_id: state.learn.current_sequence.set_id,
	isFetching: state.sets.isFetchingAssignments,
	fetchingLearn: state.learn.isFetchingLearn,
	current_sequence: state.learn.current_sequence
	}),
	dispatch => ({
		...bindActionCreators({
			...useractions,
			pushState
		}, dispatch)
	})
)
export default class Header extends Component {
	static propTypes = {
		loc: PropTypes.object
	}

	state = {
		isSetMenuOpen: false,
		choices: ['Go to set', 'Edit', 'Privacy settings', 'Mode'],
		popover: false
	}

	openSetMenu() {
		let open = this.state.isSetMenuOpen;
		if(open) {
			this.setState({
				isSetMenuOpen: false
			});
			return;
		}
		this.setState({
			isSetMenuOpen: true
		});
	}

	closeSetMenu() {
		this.setState({
			isSetMenuOpen: false
		});
	}

	handleSelect(choice) {
		// console.log(choice)
	}

	render() {
		const logo = require('./assets/FlunkLogo.png'),
			  mini_logo = require('../../assets/color_hash.png'),
			  create_icon = require('../../assets/compose_dark.png'),
			  import_icon = require('../../assets/import_dark.png'),
			  arrow_left = require('../../assets/arrow_left.png'),
			  { loc, 
			  	sets, 
			  	isFetching, 
			  	current_sequence, 
			  	fetchingLearn,
			  	learn_set,
			  	set_id,
			  	pushState,
			  	logged_in,
			  	root_path
			  } = this.props;
		let id = loc.pathname.replace(/\D/g,''),
			set = sets[id];
		return(
			<div>
			{
				root_path == 'login' || root_path == 'signup'
				? null
				:
				<div className={classnames("header_positioner beta", 
					{'no_border': (root_path == 'createset' 
					|| root_path == 'import'
					|| root_path == '/' && !logged_in)  })}>
					<div className={classnames("header_container", {"landing": root_path == '/' && !logged_in}, {'beta': true})}>				
						<div className='header'>
							{ 
								isFetching || fetchingLearn
								? null
								// ? <span className="loading_line"></span>
								: null
							}
							<div className="header_logo">
								<Link className="site-logo" to="/">						
										<img className={classnames("site_icon")} 
											 src={logo} />
								</Link>
							</div>
							<div className="header_content">
								{
									root_path == '/' && !logged_in 
									&& <LandingLinks 
										pushState={pushState}
										popout={() => this.setState({popover: true})}
									/>
								}
								{
									root_path == 'createset' 
									|| root_path == 'import' 
									|| root_path == 'learn' 
									|| (root_path == '/' && !logged_in)
									? null
									: <SearchBox {...this.props}/>
								}
								{
									root_path == 'createset' 
									|| root_path == 'import' 
									|| root_path == 'learn'
									|| (root_path == '/' && !logged_in )
									? null
									: <button className="create_set_btn_group"
											  onClick={() => { 
											  	pushState(null, '/createset') 
											  }}>
											<img className="create_icon" src={create_icon}/>
											<Link className="button create-set-button button-outline" to="">
															Create study set					
											</Link>	
									  </button>
								}
								{
									root_path == 'createset' 
									|| root_path == 'import' 
									|| root_path == 'learn'
									|| (root_path == '/' && !logged_in )
									? null
									: <button className="create_set_btn_group import"
											  onClick={() => { 
											  	pushState(null, '/import') 
											  }}>
											<img className="create_icon import" src={import_icon}/>
											<Link className="button import create-set-button button-outline" to="">
															Import					
											</Link>	
									  </button>
								}
								{ !fetchingLearn && root_path == 'learn' ? 
								<span className="open_set_container set_name_wrapper"
								      ref="set_name_wrapper">
										<Link to={`/set/${set_id}`} className="open_set_btn"
											    ref="open_set_btn">
											    <span>
											    	<img style={{
											    		height: '10.5px',
											    		marginRight: '7.5px'
											    	}}
											    	 src={arrow_left}/>
											    </span>
											    <h1 className="set_hash"
											    	style={{
											    		paddingTop: '6px',
											    		fontSize: '14.5px'
											    	}}
											    >Back to {learn_set.title}</h1>
												<h1 className="set_name"
													style={{
														display: 'none'
													}}
													ref="set_name">{learn_set.title}</h1>
										</Link>
								</span>						
								: null }
							</div>
							<div className="header_user">
								{
									root_path !== 'createset' || (root_path == '/' && !logged_in )
									&&
									<div className="button-group" style={{display: 'inline-block'}}>
										{
											!logged_in
											&&
											<button className="button sign_in_button primary"
											 		onClick={() => this.setState({ popover: true })}>
											 		Log in
											</button>
										}	
									</div>
								}
								{
									logged_in
									&&
									<Avatar {...this.props}/>
								}
							</div>
						</div>
						{
							this.state.popover
							&&
							<div className="popout log_in">
								<QuickLogIn closePopout={() => this.setState({ popover: false })} />
								<span className="popover_blackout">
								</span>
							</div>
						}
					</div>
				</div>
			}
			</div>
		);
	}
}


class LandingLinks extends Component {
	static propTypes = {

	}

	/*
	<li onClick={() => pushState(null, '/createset')}>
		<a>Create study set</a>
	</li>
	<li onClick={() => pushState(null, '/import')}>
		<a>Import</a>
	</li>
	*/

	render() {
		const { pushState } = this.props;
		return(
			<div className="wrapper sign_in_wrapper">
				<div className="sign_in">
					<button className="button sign_in" onClick={this.props.popout}>
						<a>Sign in</a>
					</button>
				</div>
			</div>
		);
	}
}


// {  
// 	loc.pathname.indexOf('/learn') !== -1 || loc.pathname == '/createset'
// 	? null 									
// 	: 
// 	<span>										
// 		<Notifications {...this.props}/>	
// 	</span>						
// }

// <Menu learn={true}
// 	  bounding={true}
// 	  isOpen={this.state.isSetMenuOpen}
// 	  side='left'
// 	  rect={::this.findSetMenuPos}
// 	  choices={this.state.choices}
// 	  onSelect={(choice) => ::this.handleSelect(choice)} />