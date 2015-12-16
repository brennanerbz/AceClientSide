import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
// require('../../SetView/Tabs/Tabs.scss');

export default class ProfileTabs extends Component {
	static propTypes = {
	}

	render() {
		return(
			<div style={{
				marginTop: '-1px',
				borderBottom: '1px solid #bdc4c9'
			}} className="tabs_container">
				<ul style={{
					marginBottom: '-1px'

				}} className="tabs_list">
					<li className={classnames("tab_item", 
											 {"active":this.props.tab.length == 0})}
						onClick={() => { 
							this.props.changeTabs('')
						}}>
						<a>Created</a>
					</li>
					<li className={classnames("tab_item concepts_tab right_most", 
								   			 {"active":this.props.tab == 'studied'})}
						onClick={() => { 
							this.props.changeTabs('studied')
						}}>
						<a>Studied</a>
					</li>
				</ul>
			</div>
		);
	}
}