import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
require('./Tabs.scss')

export default class Tabs extends Component {
	static propTypes = {
	}

	state = {
		tab: 'terms'
	}

	componentDidMount() {
		let path = this.props.location.pathname,
			end_route = path.substr(path.lastIndexOf('/') + 1)
		if(end_route == 'info') this.setState({tab: 'info'})
		else this.setState({tab: 'terms'})
	}

	render() {
		return(
			<div 
				className="tabs_container"
				style={{
					marginTop: '15px'
				}}>
				<ul className="tabs_list">
					<li className={classnames("tab_item", 
											 {"active": this.state.tab == 'terms'})}
						onClick={() => { 
							this.setState({tab: 'terms'})
					   		this.props.pushState(null, `/set/${this.props.id}`)
						}}>
						<a>Terms</a>
					</li>
					<li className={classnames("tab_item concepts_tab right_most", 
								   			 {"active": this.state.tab == 'info'})}
						onClick={() => { 
							this.setState({tab: 'info'})
							this.props.pushState(null, `/set/${this.props.id}/info`)
						}}>
						<a>Info</a>
					</li>
				</ul>
			</div>
		);
	}
}

