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
				<div className="set_name_col info_col">
					<img src={section !== 'drafts' 
						 ? set_icon_complete 
						 : set_icon_blank} 
						 className="icon_img"
						 onClick={this.props.handleClick}/>
					<div className="set_link"
						 onClick={this.props.handleClick}
						 className={classnames("heading", {'draft': section == 'drafts'})}>
							{ assignment.set.title }
							{
								section == 'drafts'
								&& <span className="draft_label">Draft</span>
							}
					</div>
				</div>
				<div className="creator info_col">
					by {assignment.set.creator.username}
				</div>
				<div className="sharing info_col">
					<div className="sharers">
						shared
					</div>
					<div className="sharing_actions">
						{
							mouseIsOver 
							&& assignment.set.finalized
							&&
							<button 
								className="button secondary"
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
			</li>
		);
	}
}

/* Old sub-heading 
{moment(assignment.set.studied).fromNow()}
*/


