import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';
import DocumentTitle from 'react-document-title';
import moment from 'moment';

import * as profileactions from '../../actions/profile';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'


/* Child Components */
import ProfilePic from '../../components/Profile/ProfilePic/ProfilePic';
import ProfileName from '../../components/Profile/ProfileName/ProfileName';
import ProfileTabs from '../../components/Profile/ProfileTabs/ProfileTabs';
import ProfileInfo from '../../components/Profile/ProfileInfo/ProfileInfo';

/* SCSS */
require('./Profile.scss');

/*
@connect.....
which route (created/studied) we're on, pass down the profile id to the child routes
the user object with picture, name, username, school, etc.
any stats related to the user
*/
/*
@dispatch
fetchUser(concurrent)
*/
@connect( state => ({
	isFetchingProfile: state.profile.isFetchingProfile,
	sets: state.sets.sets,
	profilestate: state.profile,
	loggedInUser: state.user.user,
	userOnPage: state.profile.user,
	username: state.profile.username,
	full_name: state.profile.full_name,
	school: state.profile.school,
	studied_sets: state.profile.studied_sets,
	created_sets: state.profile.created_sets,
	studiedset_count: state.profile.studiedset_count,
	createdset_count: state.profile.createdset_count
	}),
	dispatch => ({
		...bindActionCreators({
			...profileactions,
			pushState
		}, dispatch)
	})
)
export default class Profile extends Component {
	static propTypes = {
	}

	state = {
		current_tab: '',
		studiedSets: [],
		createdSets: []
	}

	componentWillMount() {
		let {
			fetchProfilePage,
			params
		} = this.props;
		fetchProfilePage(params.id)
	}

	componentDidMount() {
		const { studied_sets, created_sets  } = this.props;
		this.setState({
			studiedSets: studied_sets,
			createdSets: created_sets
		});
	}

	componentWillReceiveProps(nextProps) {
		const { params, fetchProfilePage } = this.props,
		{ studied_sets, created_sets } = nextProps;
		if(params.id !== nextProps.params.id) {
			fetchProfilePage(nextProps.params.id)
		}
		this.setState({
			studiedSets: studied_sets,
			createdSets: created_sets
		});
	}

	componentWillUnmount() {
		let { clearProfile } = this.props;
		clearProfile()
	}

	filterSets(e) {
		let { current_tab } = this.state, { studied_sets, created_sets } = this.props, input = e.target.value,
		matchedSets
		if(input.length == 0) { 
			this.setState({
				studiedSets: studied_sets,
				createdSets: created_sets
			})
			return;
		}
		if(current_tab == 'studied') matchedSets = studied_sets
		else matchedSets = created_sets
		matchedSets = matchedSets
		.map(set => {
			var m = set.set.title.toLowerCase().match(input)
			if(m !== null && m[0].length > 0) return set;
			else return null;
		})
		.filter(set => set !== null)
		if(current_tab == 'studied') {
			this.setState({
				studiedSets: matchedSets
			})
		} else {
			this.setState({
				createdSets: matchedSets
			})
		}
	}

	render() {
		const { school, pushState, loggedInUser, params, userOnPage, isFetchingProfile } = this.props,
		{ studiedSets, createdSets } = this.state;
		var profileChildrenWithProps = React.Children.map(this.props.children, (child) => {
			return React.cloneElement(child, {
				studiedSets: studiedSets,
				createdSets: createdSets,
				...this.props
			})
		}),
		userProfilePic = require('../../assets/message_profile_pic.png'),
		searchIcon = require('../../components/Header/assets/SearchIcon.png'),
		// randomBgNum = Math.floor(Math.random() * 5),
		backgroundPatternUrl = require(`../../assets/backgroundPattern${0 + 1}.png`);
		return(
			<DocumentTitle title={`${this.props.username} | Ace`}>
				<div className="main_content profile_view">
					{
						isFetchingProfile
						?
						<LoadingSpinner/>
						:
						<div className="columns profilecols">
							<div style={{width: '22%'}} className="column span_1_of_4">
								<span 
								onClick={() => {
									if(loggedInUser.id == params.id) pushState(null, '/settings/profile')
								}} 
								style={{cursor: loggedInUser.id == params.id ? 'pointer' : 'default' }}
								className="member_image_wrapper">
									<img src={backgroundPatternUrl} className="member_image thumb_215"/>
								</span>
								<h1 className="member_card_names">
									<span className="member_card_username">{userOnPage.username}</span>
									{
										userOnPage.show_real_name
										&&
										<span className="member_card_fullname">{userOnPage.first_name}&nbsp;{userOnPage.last_name}</span>
									}
								</h1>
								<ul className="member_card_details">
									{
										userOnPage.school !== null && userOnPage.school !== undefined
										&&
										<li className="member_card_detail">	
											<span className="octicon organization">
											</span>
											{userOnPage.school}
										</li>
									}
									{
										userOnPage.location !== null && userOnPage.location !== undefined
										&&
										<li className="member_card_detail">	
											<span className="octicon location">
											</span>
											{userOnPage.location}
										</li>
									}
									<li className="member_card_detail">	
										<span className="octicon joined"></span>
										<span className="join_label">
											Joined on {moment(userOnPage.creation).format('MMMM Do YYYY')}
										</span>
									</li>
								</ul>
							</div>
							<div className="column span_3_of_4">
								{
									loggedInUser.id == params.id 
									&&
									<div className="new_user_tip">
										<button onClick={() => pushState(null, '/settings/profile')} className="button primary">Edit profile</button>
										<p><strong>Pro tip:</strong>&nbsp;updating your profile with your name, school and a profile picture helps other Ace users get to know you.</p>
									</div>
								}
								<nav className="profile_tabs">
								<ProfileTabs tab={this.state.current_tab}
										     changeTabs={(tab) => { 
										     	this.setState({current_tab: tab})
										     	pushState(null, `/profile/${params.id}/${tab}`)
										     }}/>
								</nav>
								<article className="profile_setlist_container">
									<div className="set_filter_container">
										<span className="filter">
										<img className="search_icon" src={searchIcon} />
										<input onChange={::this.filterSets} className="set_filter" type="text" placeholder="Search sets"/>
										</span>
									</div>
									<span className="new_set">
										<button onClick={() => pushState(null, '/createset')} className="button primary">New</button>
										<button style={{marginLeft: '5px'}} onClick={() => pushState(null, '/createset/import')} className="button outline">Import</button>
									</span>
									{ profileChildrenWithProps }
								</article> 
							</div>
						</div>
					}
				</div>
			</DocumentTitle>
		);
	}
}

/* USER MEMBER STATISTICS
<div className="member_card_stats">
	<a className="member_card_stat">
		<strong>72</strong>
		<span className="text_muted">Terms</span>
	</a>
	<a className="member_card_stat">
		<strong>12</strong>
		<span className="text_muted">Sets</span>
	</a>
	<a className="member_card_stat">
		<strong>2</strong>
		<span className="text_muted">Starred</span>
	</a>
</div>
*/

// {
// 	school !== undefined
// 	? <div className="col-md-4">
// 	  	<ProfileInfo className=""/>
// 	  </div>
// 	: null
// }