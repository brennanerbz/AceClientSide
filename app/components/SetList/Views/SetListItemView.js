import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import classnames from 'classnames';
import SetListItemActionsView from './SetListItemActionsView';

export default class SetListItemView extends Component {
	static propTypes = {
		assignment: PropTypes.object
	}

	render() {
		const { assignment, 
				section,
				mouseIsOver } = this.props,
	 		  set_icon_complete = require('../../../assets/set_icon_lines.png'),
			  set_icon_blank = require('../../../assets/set_icon_90.png')
		return(
			<li className="set_item"
				onMouseOver={this.props.mouseOver}
				onMouseLeave={this.props.mouseLeft}>
				<div className="set_list_item_wrapper">
					<div className="set_list_item_icon"
						 onClick={this.props.handleClick}>
						<span className="file_icon">
							<img src={section !== 'drafts' 
								 ? set_icon_complete 
								 : set_icon_blank} 
								 className="icon_img"/>
						</span>
					</div>
					<div className="set_list_item_details"
						 onClick={this.props.handleClick}>
						<div className={classnames("heading", {
							'draft': section == 'drafts'
						})}>
							{ assignment.set.title }
							{
								section == 'drafts'
								&& <span className="draft_label">Draft</span>
							}
						</div>
						<div className="sub_heading">
							by {assignment.set.creator.username}
						</div>
					</div>
					<div className="set_list_item_actions">
						<div className="inner">
							{
								mouseIsOver 
								&& assignment.set.finalized
								&&
								<button 
									className="button outline"
									onClick={this.props.handleShare}>
									Share
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


