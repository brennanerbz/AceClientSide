import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import moment from 'moment';
import { Link } from 'react-router';

export default class SetListItem extends Component {
	static propTypes = {
	}


	componentDidMount = () => {
		$("[data-toggle='tooltip']").tooltip({
			delay: { show: 400, hide: 50}
		})
	}

	handleMouseOver = () => {
		const { set, setActiveRow  } = this.props;
		setActiveRow(set.id)
	}
	handleMouseLeave = () => {
		const { setActiveRow  } = this.props;
		setActiveRow(0)
	}

	render() {
		const set_icon = require('../../assets/set_icon.png'),
			  share_icon = require('../../assets/share_icon.png'),
			  more_icon = require('../../assets/more_icon.png'),
			  { set, draft, pushState } = this.props;
		const last_studied = moment(set.last_studied).fromNow();
		return(
			
	      	<div className="row set_row"
	      	     onMouseOver={this.handleMouseOver}
	      	     onMouseLeave={this.handleMouseLeave}>	
		        <div className="col-sm-1 col-md-1 set_col row_icon">
		        	<img className="home_set_icon active" src={set_icon}/>
		        </div>
		        <div className="col-sm-6 col-md-6 col-lg-7 set_col set_name"
		        	 onClick={() => pushState(null, draft ? `/createset/${set.id}` : `/set/${set.id}`)}>
		        	<span className="overflow_ellipsis">
		        		<a className={classnames("link", {'draft': draft })}>
		        			  {set.title}
		        		</a>
		        		{
		        			draft
		        			?
		        			<span className="draft_label">Draft</span>
		        			: null
		        		}
		        	</span>
		        </div>
		        <div className="col-sm-5 col-md-5 col-lg-3 set_col set_author"
		        	 onClick={() => pushState(null, `/profile/${set.creator_id}`)}>
		        	<span className="overflow_ellipsis">		        		
		        		by <span className="link_name">{set.creator.username}</span>
		        	</span>
		        </div>		        
		        <div className={classnames('actions', {'active': set.id === this.props.activeRow})}>
		        	<button data-toggle="tooltip" title="Share" className="btn_icon btn_outline btn_square">
		        		<img className="share_icon icon" src={share_icon}/>
		        	</button>
		        	<button data-toggle="tooltip" title="More" className="btn_icon btn_outline btn_square">
		        		<img className="icon icon_awksize" src={more_icon}/>
		        	</button>
		        </div>
		    </div>
		);
	}
}

// -- AuthorPic 
// <a>
// <img src="https://cdn-images-1.medium.com/fit/c/72/72/0*Un7eHMAQh62QX1LO.jpg" 
// 	 className={classnames('author_pic')}/>
// </a>

// // -- DateTime 
// <div className="col-sm-2 col-md-2 set_col date_last_studied">
// 	<span className="overflow_ellipsis">{last_studied}</span>
// </div>