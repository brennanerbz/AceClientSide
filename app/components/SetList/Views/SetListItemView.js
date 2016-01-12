import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import classnames from 'classnames';
import SetListItemActionsView from './SetListItemActionsView';

export default class SetListItemView extends Component {
	static propTypes = {
		assignment: PropTypes.object
	}

	render() {
		let { assignment, 
				section,
				mouseIsOver,
				pushState, user_id, set } = this.props,
	 		  set_icon_complete = require('../../../assets/set_icon_lines.png'),
			  set_icon_blank = require('../../../assets/set_icon_90.png'),
			  defatultUserPic = require('../../../assets/backgroundPattern1.png'),
			  defatultOtherPic = require('../../../assets/backgroundPattern6.png'),
			  playfulSetIcon = require('../../../assets/setIconGreen.png'),
			  profilePic = require('../../../assets/message_profile_pic.png'),
			  avatar;
		if(set.creator_id == user_id) avatar = defatultUserPic
		else avatar = defatultOtherPic
		return(
			<li className="set_item_row"
				onMouseOver={this.props.mouseOver}
				onMouseLeave={this.props.mouseLeft}>
				<div className="set_item_row_wrapper">
				<div style={{width: '100%'}} className={classnames("col",{'isHovering': mouseIsOver})}>
					<div className="col_content">
					<div className="col_content_flex">
					<img src={section !== 'drafts' 
						 ? set_icon_complete 
						 : set_icon_blank} 
						 className={classnames("icon_img", {'profile': this.props.profileView})}
						 onClick={this.props.handleClick}/>
					<div onClick={this.props.handleClick}
						 className={classnames("heading", {'draft': section == 'drafts'})}>
							{ assignment.set.title }
							{
								section == 'drafts'
								&& <span className="draft_label">Draft</span>
							}
					</div>
					</div>
					</div>
				</div>
				<div style={{position: 'relative', width: '210px'}} className={classnames("col",{'isHovering': mouseIsOver})}>
					<div className="col_content">
						{
							!this.props.profileView
							&&
							<div className="col_content_flex creator">
							<img src={avatar} className="creator_pic" />
								by &nbsp; {assignment.set.creator.username}
							</div>
						}
					</div>
				</div>
				<div style={{textOverflow: 'ellipsis', width:'156px'}} className={classnames("col",{'isHovering': mouseIsOver})}>
					<div className="col_content">
					<div className="sharers">
						--
					</div>
					</div>
				</div>
				<div 
				style={{
					width: this.props.profileView ? '120px' : '160px',
					position: 'relative'
				}}  
				className={classnames("col",{'isHovering': true})}>
					<div className="sharing_actions">
						{
							mouseIsOver 
							&& assignment.set.finalized
							&&
							<button 
								className="button outline share"
								onClick={this.props.handleShare}>
								Share
							</button>
						}
						{
							mouseIsOver 
							&& !assignment.set.finalized
							&&
							<button 
								className="button outline share"
								onClick={() => pushState(null, `/createset/${assignment.set.id}`)}>
								Finish
							</button>
						}
						<SetListItemActionsView 
							mouseIsOver={mouseIsOver}
							assignment={assignment}
						 	{...this.props}
						/>
					</div>
				</div>
				</div>
			</li>
		);
	}
}

/* Old sub-heading 
{moment(assignment.set.studied).fromNow()}
*/


